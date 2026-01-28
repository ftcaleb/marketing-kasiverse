const express = require("express");
const cors = require("cors");
const supabase = require("./supabase");

const app = express();
app.use(express.json());
app.use(cors());

/**
 * REGISTER
 */
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
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

app.listen(PORT, () => {
  console.log("Server running on port 3001");
});