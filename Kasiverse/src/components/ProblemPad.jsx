import React, { useState } from "react";
import { createNote } from "../lib/api";

// ProblemPad is the modal form used to add a new problem
function ProblemPad({ closeModal, onProblemAdded }) {

  // State to store the problem title
  const [title, setTitle] = useState("");
  // State to store the problem description
  const [description, setDescription] = useState("");
  // State to store the problem location
  const [location, setLocation] = useState("");
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh

    // Validation
    if (!title.trim() || !description.trim() || !location.trim()) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create note via API
      const newProblem = await createNote({
        title,
        description,
        location,
        category: "Problem",
      });

      // Notify parent component
      if (onProblemAdded) {
        onProblemAdded(newProblem);
      }

      // Close the modal after adding the problem
      closeModal();
    } catch (err) {
      setError(err.message || "Failed to add problem. Please try again.");
      console.error("Create problem error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Full-screen overlay
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      {/* Modal container */}
      <div className="bg-white text-black p-8 rounded-xl w-full max-w-md">
        {/* Modal title */}
        <h2 className="text-xl font-bold mb-6">
          Add a Community Problem
        </h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Form wrapper */}
        <form onSubmit={handleSubmit}>
          {/* Title label */}
          <label className="block text-sm font-medium mb-1">
            Problem Title
          </label>
          {/* Title input */}
          <input
            className="border p-2 w-full mb-4"
            value={title}
            placeholder="e.g., No waste collection service"
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />

          {/* Description label */}
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          {/* Description textarea */}
          <textarea
            className="border p-2 w-full mb-4"
            rows={4}
            value={description}
            placeholder="Describe the problem in detail..."
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />

          {/* Location label */}
          <label className="block text-sm font-medium mb-1">
            Location
          </label>
          {/* Location input */}
          <input
            className="border p-2 w-full mb-6"
            value={location}
            placeholder="e.g., Soweto"
            onChange={(e) => setLocation(e.target.value)}
            disabled={isLoading}
          />

          {/* Action buttons */}
          <div className="flex gap-4">
            {/* Cancel button closes modal */}
            <button
              type="button"
              onClick={closeModal}
              disabled={isLoading}
              className="w-1/2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            {/* Submit button adds the problem */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add Problem"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default ProblemPad;
