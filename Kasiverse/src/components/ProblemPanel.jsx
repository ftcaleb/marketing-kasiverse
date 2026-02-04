import React, { useState } from "react";
import { MapPin, Edit2, Trash2 } from "lucide-react";
import { deleteNote, updateNote } from "../lib/api";

// ProblemPanel displays a single problem card with edit/delete functionality
function ProblemPanel({ problem, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: problem.title || "",
    description: problem.description || "",
    location: problem.location || "",
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
      title: problem.title || "",
      description: problem.description || "",
      location: problem.location || "",
    });
  };

  const handleSave = async () => {
    if (!editData.title.trim() || !editData.description.trim() || !editData.location.trim()) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const updatedNote = await updateNote(problem.id, {
        title: editData.title,
        description: editData.description,
        location: editData.location,
      });
      onUpdate(updatedNote);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update problem");
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this problem?")) {
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await deleteNote(problem.id);
      onDelete(problem.id);
    } catch (err) {
      setError(err.message || "Failed to delete problem");
      console.error("Delete error:", err);
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-5 border border-gray-300 rounded-lg shadow-2xl flex flex-col transition duration-300 ease-out max-w-sm w-full">
        <h3 className="text-lg font-semibold text-black mb-4">Edit Problem</h3>

        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 flex-1">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Title</label>
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
    <div className="bg-white p-5 border border-gray-300 rounded-lg shadow-2xl flex flex-col transition duration-300 ease-out hover:-translate-y-1
                    hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] max-w-sm w-full">

      {/* Problem title */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-lg font-semibold text-black flex-1">
          {problem.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition disabled:opacity-50"
            title="Edit problem"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-1 text-red-600 hover:bg-red-100 rounded transition disabled:opacity-50"
            title="Delete problem"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
          {error}
        </div>
      )}

      {/* Problem description */}
      <p className="text-sm text-black whitespace-pre-wrap mb-3">
        {problem.description}
      </p>

      {/* Location row */}
      <div className="flex items-center border-t pt-2 mt-auto">
        <span className="flex items-center gap-1 text-black text-sm">
          <MapPin size={14} />
          {problem.location}
        </span>
      </div>

    </div>
  );
}

export default ProblemPanel;
