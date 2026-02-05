import React, { useState } from "react";
import ContactForm from "./ContactForm.jsx";
import { Link } from "react-router-dom"
// icon
import { MapPin, Edit2, Trash2 } from "lucide-react";
import { deleteNote, updateNote } from "../lib/api";

// StorePanel displays a single store card with edit/delete functionality
function StorePanel({ store, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: store.title || "",
    description: store.description || "",
    location: store.location || "",
    price: store.price || "",
    category: store.category || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: store.title || "",
      description: store.description || "",
      location: store.location || "",
      price: store.price || "",
      category: store.category || "",
    });
  };

  const handleSave = async () => {
    if (!editData.title.trim() || !editData.description.trim() || !editData.location.trim() || !editData.price) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const updatedStore = await updateNote(store.id, {
        title: editData.title,
        description: editData.description,
        location: editData.location,
        price: editData.price,
        category: editData.category,
      });
      onUpdate(updatedStore);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update store");
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this store?")) {
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await deleteNote(store.id);
      onDelete(store.id);
    } catch (err) {
      setError(err.message || "Failed to delete store");
      console.error("Delete error:", err);
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-5 border border-gray-300 rounded-lg shadow-md flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-black mb-2">Edit Store</h3>

        {error && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 flex-1">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Business Name</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded text-black"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Description</label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 p-2 rounded text-black"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Category</label>
            <select
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded text-black"
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              <option value="Delivery">Delivery</option>
              <option value="Waste collection">Waste Collection</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Repairs">Repairs</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Price</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={editData.price}
              onChange={(e) => setEditData({ ...editData, price: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded text-black"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Location</label>
            <input
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded text-black"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 border border-gray-300 py-2 rounded-md text-black hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    );
  }

  return (
    // Card container
    <div className="bg-white p-5 border border-gray-300 rounded-lg shadow-md flex flex-col gap-3 transition duration-300 ease-out hover:-translate-y-1
                hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
      {/* Store title */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center text-lg font-semibold text-black flex-1">
        {store.title} 
      </h3>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          disabled={isLoading}
          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition disabled:opacity-50"
          title="Edit store"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="p-1 text-red-600 hover:bg-red-100 rounded transition disabled:opacity-50"
          title="Delete store"
        >
          <Trash2 size={18} />
        </button>
      </div>
      </div>

      {error && (
        <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
          {error}
        </div>
      )}

      <p className="text-sm text-black rounded-lg px-2 bg-red-600 w-fit">{store.category}</p>
      
      {/* Full store description */}
      <p className="text-sm text-black whitespace-pre-wrap">
        {store.description}
      </p>
      {/* Location row */}
      <div className="flex items-center justify-between border-t pt-2">
        <span className="flex items-center gap-1 text-black">
          <MapPin size={14} className="text-black" />
          {store.location}
        </span>
        <p className="text-sm text-white rounded-lg px-2 bg-green-500">${store.price}</p>
      </div>

      <Link to="/contactform" className="mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300 ease-out">
        Contact Business
        </Link>

    </div>
  );
}

export default StorePanel;