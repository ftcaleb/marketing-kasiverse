import React, { useState } from "react";
// search icon
import { Search } from "lucide-react";

// components
import StorePanel from "../components/StorePanel.jsx";
import StorePad from "../components/StorePad.jsx";

// Problems page component
function Stores() {

  // State holding all problems (static + user-added)
  const [stores, setStores] = useState([
    {
      id: 1,
      title: "Transport",
      description:
        "There isn't any reliable public transport to travel on a daily basis, and having to walk long distances just for transport is a bit tiring on a daily basis.",
      location: "Midrand",
      category: "Services",
      price: "50",
    },
    {
      id: 2,
      title: "Need after-school tutoring",
      description:
        "Many parents work late and need affordable, safe after-school tutoring for their children in primary school.",
      location: "Alexandra",
      category: "Services",
      price: "100",
    },
  ]);

  // State for search input value
  const [searchTerm, setSearchTerm] = useState("");
  // State controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to add a new problem
  const addStore = (title, description, location, price, category) => {
    const newStore = {
      id: Date.now(), // Temporary unique ID
      title,
      description,
      location,
      price,
      category,
    };

    // Add the new problem to the top of the list
    setStores((prevStores) => [newStore, ...prevStores]);
  };

  // Filter problems based on search input
  const filteredProblems = stores.filter((store) => {
    const query = searchTerm.toLowerCase();

    return (
      store.title.toLowerCase().includes(query) ||
      store.description.toLowerCase().includes(query) ||
      store.location.toLowerCase().includes(query) || 
      (store.category?.toLowerCase().includes(query) || false)
    );
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

      {/* Problems grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {filteredProblems.map((store) => (
          <StorePanel
            key={store.id}
            store={store}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <StorePad
          closeModal={() => setIsModalOpen(false)}
          addStore={addStore}
        />
      )}
    </div>
    </div>
  );
}

export default Stores;