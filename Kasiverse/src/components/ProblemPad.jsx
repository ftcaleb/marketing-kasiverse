import React, { useState } from "react";

// ProblemPad is the modal form used to add a new problem
function ProblemPad({ closeModal, addProblem }) {

  // State to store the problem title
  const [title, setTitle] = useState("");
  // State to store the problem description
  const [description, setDescription] = useState("");
  // State to store the problem location
  const [location, setLocation] = useState("");

  // Function runs when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh

    // Call parent function to add a new problem
    addProblem(title, description, location);

    // Close the modal after adding the problem
    closeModal();
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
          />

          {/* Action buttons */}
          <div className="flex gap-4">
            {/* Cancel button closes modal */}
            <button
              type="button"
              onClick={closeModal}
              className="w-1/2 border border-gray-300 py-2 rounded-md"
            >
              Cancel
            </button>

            {/* Submit button adds the problem */}
            <button
              type="submit"
              className="w-1/2 bg-black text-white py-2 rounded-md"
            >
              Add Problem
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default ProblemPad;
