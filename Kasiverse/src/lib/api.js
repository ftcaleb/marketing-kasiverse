/**
 * API utility layer for backend communication
 * Handles authentication, headers, and all CRUD operations
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

/**
 * Get the auth token from localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem("token");
};

/**
 * Create headers with authorization token
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Handle API errors
 */
const handleError = (error, context = "") => {
  console.error(`API Error (${context}):`, error);

  // Handle 401 - Unauthorized
  if (error.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }

  // Handle network errors
  if (!error.status) {
    throw new Error("Network error. Please check your connection.");
  }

  // Handle other HTTP errors
  throw new Error(error.message || `API error: ${error.status}`);
};

/**
 * Generic fetch wrapper
 */
const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
      ...options,
    });

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const error = new Error(data?.error || data?.message || "API error");
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    handleError(error, endpoint);
  }
};

// ============================================
// NOTES CRUD OPERATIONS
// ============================================

/**
 * Fetch all notes for the authenticated user
 */
export const getNotes = async () => {
  return apiFetch("/notes", {
    method: "GET",
  });
};

/**
 * Create a new note
 */
export const createNote = async (noteData) => {
  return apiFetch("/notes", {
    method: "POST",
    body: JSON.stringify(noteData),
  });
};

/**
 * Update an existing note
 */
export const updateNote = async (id, noteData) => {
  return apiFetch(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(noteData),
  });
};

/**
 * Delete a note
 */
export const deleteNote = async (id) => {
  return apiFetch(`/notes/${id}`, {
    method: "DELETE",
  });
};

/**
 * Get a single note by ID
 */
export const getNoteById = async (id) => {
  return apiFetch(`/notes/${id}`, {
    method: "GET",
  });
};
