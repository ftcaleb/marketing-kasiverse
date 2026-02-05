import React, { useState } from "react";
import { createNote } from "../lib/api";

// StorePad is the modal form used to add a new store
function StorePad({ closeModal, onStoreAdded }) {

  // State to store the business name
  const [businessName, setbusinessName] = useState("");
  // State to store the description
  const [description, setDescription] = useState("");
  // State to store the location
  const [location, setLocation] = useState("");
  // State to store the price
  const [price, setPrice] = useState("");
  // State to store the category
  const [category, setCategory] = useState("");
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh

    // Validation
    if (!businessName.trim() || !description.trim() || !location.trim() || !price || !category) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const newStore = {
        title: businessName,
        description,
        location,
        price: parseFloat(price),
        category,
      };

      // Create note via API
      const createdStore = await createNote(newStore);

      // Notify parent component
      if (onStoreAdded) {
        onStoreAdded(createdStore);
      }

      // Close the modal after adding the store
      closeModal();
    } catch (err) {
      setError(err.message || "Failed to add store. Please try again.");
      console.error("Create store error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Full-screen overlay
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      {/* Modal container */}
      <div className="bg-gray-200 p-8 rounded-xl w-full max-w-md">
        {/* Modal title */}
        <h2 className="text-xl font-bold mb-6">
          List Your Service
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
            Business Name
          </label>
          {/* Title input */}
          <input
            className="border p-2 w-full mb-4"
            value={businessName}
            placeholder="e.g., No waste collection service"
            onChange={(e) => setbusinessName(e.target.value)}
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

          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          {/* Category dropdown */}
          <select
            className="border p-2 w-full mb-6"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Select a category</option>
            <option value="Delivery">Delivery</option>
            <option value="Waste collection">Waste Collection</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Cleaning">Cleaning </option>
            <option value="Repairs">Repairs</option>
            <option value="Other">Other</option>
          </select>

          <label className="block text-sm font-medium mb-1">
            Price
          </label>
          {/* Price input */}
          <input
            className="border p-2 w-full mb-6"
            value={price}
            type="number"
            step="0.1"
            min="0"
            onChange={(e) => setPrice(e.target.value)}
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

            {/* Submit button adds the store */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add Store"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default StorePad;