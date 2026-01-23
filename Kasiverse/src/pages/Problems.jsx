import React, { useState } from "react";
// search icon
import { Search } from "lucide-react";

// components
import ProblemPanel from "../components/ProblemPanel";
import ProblemPad from "../components/ProblemPad";

// Problems page component
function Problems() {

  // State holding all problems (static + user-added)
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "Transport",
      description:
        "There isn't any reliable public transport to travel on a daily basis, and having to walk long distances just for transport is a bit tiring on a daily basis.",
      location: "Midrand",
    },
    {
      id: 2,
      title: "Need after-school tutoring",
      description:
        "Many parents work late and need affordable, safe after-school tutoring for their children in primary school.",
      location: "Alexandra",
    },
  ]);

  // State for search input value
  const [searchTerm, setSearchTerm] = useState("");
  // State controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to add a new problem
  const addProblem = (title, description, location) => {
    const newProblem = {
      id: Date.now(), // Temporary unique ID
      title,
      description,
      location,
    };

    // Add the new problem to the top of the list
    setProblems((prevProblems) => [newProblem, ...prevProblems]);
  };

  // Filter problems based on search input
  const filteredProblems = problems.filter((problem) => {
    const query = searchTerm.toLowerCase();

    return (
      problem.title.toLowerCase().includes(query) ||
      problem.description.toLowerCase().includes(query) ||
      problem.location.toLowerCase().includes(query)
    );
  });

  return (
    // Page container
    <div className="min-h-screen bg-linear-to-l from-gray-800 via-blue-700 to-gray-900 p-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-white mb-1">
        Community Problem Board
      </h1>
      {/* Subtitle */}
      <p className="text-gray-300 mb-6">
        Share problems affecting your community.
      </p>

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur-md px-6 py-4 rounded-md">
        {/* Search input */}
        <div className="flex items-center gap-2 w-full max-w-md">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        {/* Add problem button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md transition duration-300 ease-out hover:bg-linear-to-l from-gray-800 via-blue-700 to-gray-900 p-8"
        >
          + Add Problem
        </button>

      </div>

      {/* Problems grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {filteredProblems.map((problem) => (
          <ProblemPanel
            key={problem.id}
            problem={problem}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProblemPad
          closeModal={() => setIsModalOpen(false)}
          addProblem={addProblem}
        />
      )}
    </div>
  );
}

export default Problems;
