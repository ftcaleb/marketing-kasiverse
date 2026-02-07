const dotenv = require("dotenv");
dotenv.config();


const express = require("express");
const cors = require("cors");
const supabase = require("./supabase");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

/**
 * REGISTER
 */
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role: "user", // Default role
      },
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: "User registered", user: data.user });
});

/**
 * LOGIN
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } =
    await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.json({
    message: "Successfully Logged In",
    user: data.user,
    token: data.session.access_token,
  });
});

/**
 * AUTH MIDDLEWARE (Supabase)
 */
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token" });

  const { data, error } = await supabase.auth.getUser(token);

  if (error) return res.status(401).json({ error: "Invalid token" });

  req.user = data.user;
  next();
};

/**
 * ADMIN MIDDLEWARE
 * Checks if the authenticated user has the 'ADMIN' role.
 */
const adminMiddleware = async (req, res, next) => {
  const role = req.user.user_metadata?.role || req.user.app_metadata?.role;
  
  if (role && role.toUpperCase() === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ error: "Unauthorized: Admins only" });
  }
};

/**
 * NOTES CRUD ENDPOINTS
 */

/**
 * GET /notes - Fetch all notes for the authenticated user
 */
app.get("/notes", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    // const userRole = req.user.user_metadata?.role; // Not needed for GET anymore

    // Return ALL notes for everyone
    let query = supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("GET /notes error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /notes - Create a new note
 */
app.post("/notes", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, location, price, category } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        title,
        description,
        location,
        price: price || null,
        category: category || null,
      })
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("POST /notes error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /notes/:id - Fetch a single note by ID
 */
app.get("/notes/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    // const userRole = req.user.user_metadata?.role;
    const noteId = req.params.id;

    // Return ALL notes for everyone
    let query = supabase
      .from("notes")
      .select("*")
      .eq("id", noteId);

    const { data, error } = await query.single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Note not found" });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("GET /notes/:id error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PUT /notes/:id - Update a note (ADMIN ONLY)
 */
app.put("/notes/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    // const userRole = req.user.user_metadata?.role; // Handled by middleware
    const noteId = req.params.id;
    const { title, description, location, price, category } = req.body;

    // Verify note exists
    let fetchQuery = supabase
      .from("notes")
      .select("id")
      .eq("id", noteId);
    
    // Strict Admin check handled by middleware

    const { data: note, error: fetchError } = await fetchQuery.single();

    if (fetchError || !note) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    const { data, error } = await supabase
      .from("notes")
      .update({
        title: title || undefined,
        description: description || undefined,
        location: location || undefined,
        price: price !== undefined ? price : undefined,
        category: category !== undefined ? category : undefined,
      })
      .eq("id", noteId)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data[0]);
  } catch (err) {
    console.error("PUT /notes/:id error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * DELETE /notes/:id - Delete a note (ADMIN ONLY)
 */
app.delete("/notes/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // const userId = req.user.id; 
    // const userRole = req.user.user_metadata?.role; // Handled by middleware
    const noteId = req.params.id;

    // Verify note exists
    let fetchQuery = supabase
      .from("notes")
      .select("id")
      .eq("id", noteId);

    // Strict Admin check handled by middleware

    const { data: note, error: fetchError } = await fetchQuery.single();

    if (fetchError || !note) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("DELETE /notes/:id error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 3001");
});