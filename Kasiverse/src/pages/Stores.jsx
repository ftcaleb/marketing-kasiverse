import React, { useState } from "react";
// search icon
import { Search } from "lucide-react";
import { useSelector } from 'react-redux'

// components
import StorePanel from "../components/StorePanel.jsx";
import StorePad from "../components/StorePad.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";

// Problems page component
function Stores() {

  // Stores are now managed globally via Redux (persisted to localStorage)
  const stores = useSelector((state) => state.stores);

  // State for search input value
  const [searchTerm, setSearchTerm] = useState("");
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState("All");
  // State controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Category options for filter
  const categories = ["All", "Delivery", "Waste Collection", "Tutoring", "Cleaning", "Repairs", "Other"];

  // Adding stores is handled by the `StorePad` component via Redux dispatch

  // Filter problems based on search input and category
  const filteredProblems = stores.filter((store) => {
    const query = searchTerm.toLowerCase();
    
    // Check if store matches search query
    const matchesSearch = (
      store.title.toLowerCase().includes(query) ||
      store.description.toLowerCase().includes(query) ||
      store.location.toLowerCase().includes(query) || 
      (store.category?.toLowerCase().includes(query) || false)
    );

    // Check if store matches selected category
    const matchesCategory = activeCategory === "All" || store.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    // Page container
    <div>
      <div className="min-h-screen bg-linear-to-l from-purple-800 via-black to-purple-900 px-8 pt-24 pb-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-white mb-1">
        Kasi Marketplace
      </h1>
      {/* Subtitle */}
      <p className="text-gray-300 mb-6">
        Support local businesses and discover new products.
      </p>

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 backdrop-blur-md">
        {/* Search input */}
        <div className="flex items-center bg-white/80 gap-2 w-full px-12 py-3 rounded-md">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm"
          />
        </div>

        {/* Add problem button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black w-40 text-white px-4 py-3 rounded-md transition duration-300 ease-out hover:bg-linear-to-l from-purple-800 via-black to-purple-900 p-8"
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

      {/* Problems grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((store) => (
            <StorePanel
              key={store.id}
              store={store}
            />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-xl text-gray-400 font-medium">
              No stores available in this category
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <StorePad
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
    </div>
  );
}

export default Stores;