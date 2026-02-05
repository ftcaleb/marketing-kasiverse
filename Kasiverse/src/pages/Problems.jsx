import React, { useState, useEffect } from "react";
// search icon
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// API
import { getNotes, isAuthenticated } from "../lib/api";

// components
import ProblemPanel from "../components/ProblemPanel";
import ProblemPad from "../components/ProblemPad";
import Navbar from "../components/Navbar.jsx";

// Problems page component
function Problems() {
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  // State holding all problems from backend
  const [problems, setProblems] = useState([]);
  
  // State for search input value
  const [searchTerm, setSearchTerm] = useState("");
  // State controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch problems on component mount
  useEffect(() => {
    fetchProblems();
  }, []);

  // Function to fetch problems from backend
  const fetchProblems = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getNotes();
      // Ensure data is an array
      setProblems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch problems error:", err);
      setError(err.message || "Failed to load problems");
      setProblems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle new problem added
  const handleProblemAdded = (newProblem) => {
    setProblems((prev) => [newProblem, ...prev]);
  };

  // Function to handle problem deletion
  const handleProblemDelete = (problemId) => {
    setProblems((prev) => prev.filter((p) => p.id !== problemId));
  };

  // Function to handle problem update
  const handleProblemUpdate = (updatedProblem) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === updatedProblem.id ? updatedProblem : p))
    );
  };

  // Filter problems based on search input
  const filteredProblems = problems.filter((problem) => {
    const query = searchTerm.toLowerCase();

    return (
      problem.title.toLowerCase().includes(query) ||
      problem.description.toLowerCase().includes(query) ||
      (problem.location && problem.location.toLowerCase().includes(query))
    );
  });

  return (
    // Page container
    <div>
      <Navbar/>
      <div className="min-h-screen bg-linear-to-l from-purple-800 via-black to-purple-900 px-8 pt-24 pb-8">
      {/* Page title */}
      
      <h1 className=" text-3xl font-bold text-white mb-1">
        Community Problem Board
      </h1>
      {/* Subtitle */}
      <p className="text-gray-300 mb-6">
        Share problems affecting your community.
      </p>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={fetchProblems}
            className="ml-4 underline hover:no-underline font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 ">
        {/* Search input */}
        <div className="flex items-center bg-white/80 gap-2 w-full max-w-auto px-12 py-3 rounded-md">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full  text-sm"
          />
        </div>

        {/* Add problem button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-linear-to-l from-purple-800 via-black to-purple-900 text-white w-40 px-4 py-3  rounded-md transition duration-300 ease-out hover:bg-purple-900"
        >
          + Add Problem
        </button>

      </div>
    

      {/* Problems grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 mt-8 max-w-8xl mx-auto">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-xl text-gray-400 font-medium">Loading problems...</p>
          </div>
        ) : filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <ProblemPanel
              key={problem.id}
              problem={problem}
              onDelete={handleProblemDelete}
              onUpdate={handleProblemUpdate}
            />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-xl text-gray-400 font-medium">
              {problems.length === 0 ? "No problems yet. Be the first to add one!" : "No problems match your search."}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProblemPad
          closeModal={() => setIsModalOpen(false)}
          onProblemAdded={handleProblemAdded}
        />
      )}
    </div>
 
    </div>
  );
}

export default Problems;
