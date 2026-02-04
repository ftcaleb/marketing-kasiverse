import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { addStore } from '../store/storeSlice'

// ProblemPad is the modal form used to add a new problem
function StorePad({ closeModal }) {

  // State to store the problem title
  const [businessName, setbusinessName] = useState("");
  // State to store the problem description
  const [description, setDescription] = useState("");
  // State to store the problem location
  const [location, setLocation] = useState("");
  
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const dispatch = useDispatch()

  // Function runs when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh

    const newStore = {
      id: Date.now(),
      title: businessName,
      description,
      location,
      price,
      category,
    }

    // Dispatch action to add the store (and persist to localStorage)
    dispatch(addStore(newStore))

    // Close the modal after adding the problem
    closeModal();
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

          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          {/* Category dropdown */}
          <select
            className="border p-2 w-full mb-6"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
              Add Store
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default StorePad;