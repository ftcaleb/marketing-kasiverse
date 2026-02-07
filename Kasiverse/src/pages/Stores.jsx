import React, { useState, useEffect } from "react";
// search icon
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// API
import { getNotes, isAuthenticated } from "../lib/api";

// components
import StorePanel from "../components/StorePanel.jsx";
import StorePad from "../components/StorePad.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import Navbar from "../components/Navbar.jsx";


// Stores page component
function Stores() {
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  // Stores are now managed via backend API
  const [stores, setStores] = useState([]);

  // State for search input value
  const [searchTerm, setSearchTerm] = useState("");
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState("All");
  // State controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Category options for filter
  const categories = ["All", "Delivery", "Waste Collection", "Tutoring", "Cleaning", "Repairs", "Other"];

  // Fetch stores on component mount
  useEffect(() => {
    fetchStores();
  }, []);

  // Function to fetch stores from backend
  const fetchStores = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getNotes();
      // Ensure data is an array
      // Filter out problems (keep everything else as stores)
      const storesData = Array.isArray(data) ? data.filter(note => note.category !== "Problem") : [];
      setStores(storesData);
    } catch (err) {
      console.error("Fetch stores error:", err);
      setError(err.message || "Failed to load stores");
      setStores([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle new store added
  const handleStoreAdded = (newStore) => {
    setStores((prev) => [newStore, ...prev]);
  };

  // Function to handle store deletion
  const handleStoreDelete = (storeId) => {
    setStores((prev) => prev.filter((s) => s.id !== storeId));
  };

  // Function to handle store update
  const handleStoreUpdate = (updatedStore) => {
    setStores((prev) =>
      prev.map((s) => (s.id === updatedStore.id ? updatedStore : s))
    );
  };

  // Filter stores based on search input and category
  const filteredStores = stores.filter((store) => {
    const query = searchTerm.toLowerCase();

    // Check if store matches search query
    const matchesSearch = (
      store.title.toLowerCase().includes(query) ||
      store.description.toLowerCase().includes(query) ||
      (store.location && store.location.toLowerCase().includes(query)) ||
      (store.category?.toLowerCase().includes(query) || false)
    );

    // Check if store matches selected category
    const matchesCategory = activeCategory === "All" || store.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    // Page container
    <div>
      <Navbar />

      <div className="min-h-screen bg-linear-to-l from-purple-800 via-black to-purple-900 px-8 pt-24 pb-8">
        {/* Page title */}
        <h1 className="text-3xl font-bold text-white mb-1">
          Kasi Marketplace
        </h1>
        {/* Subtitle */}
        <p className="text-gray-300 mb-6">
          Support local businesses and discover new products.
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={fetchStores}
              className="ml-4 underline hover:no-underline font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 backdrop-blur-md">
          {/* Search input */}
          <div className="flex items-center bg-white/80 gap-2 w-full px-12 py-3 rounded-md">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm"
            />
          </div>

          {/* Add store button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black w-40 text-white px-4 py-3 rounded-md transition duration-300 ease-out hover:bg-gray-800"
          >
            + List Service
          </button>

        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Stores grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <p className="text-xl text-gray-400 font-medium">Loading stores...</p>
            </div>
          ) : filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <StorePanel
                key={store.id}
                store={store}
                onDelete={handleStoreDelete}
                onUpdate={handleStoreUpdate}
              />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-12">
              <p className="text-xl text-gray-400 font-medium">
                {stores.length === 0 ? "No stores yet. Be the first to list one!" : "No stores match your search"}
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <StorePad
            closeModal={() => setIsModalOpen(false)}
            onStoreAdded={handleStoreAdded}
          />
        )}
      </div>
    </div>
  );
}

export default Stores;