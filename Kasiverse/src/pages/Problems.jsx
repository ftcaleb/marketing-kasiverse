import React, { useState } from "react";
// search icon
import { Search } from "lucide-react";

// components
import ProblemPanel from "../components/ProblemPanel";
import ProblemPad from "../components/ProblemPad";
import Navbar from "../components/Navbar.jsx";

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
    {
      id: 3,
      title: "Crime and Safety",
      description:
        "High crime rates make it unsafe to walk around at night, with incidents of theft, burglary, and gang violence being common.",
      location: "Vaal",
    },
    {
  id: 4,
  title: "Electricity Load Shedding",
  description:
    "Communities experience frequent power outages, which disrupts small businesses, studying, and household routines.",
  location: "Townships in Gauteng",
},
    {
  id: 5,
  title: "Fitness & Recreation",
  description:
    "People lack safe areas to exercise or play sports. Starting community gyms, classes, or sports programs could help.",
  location: "Brakpan",
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
          className="bg-linear-to-l from-purple-800 via-black to-purple-900 text-white w-40 px-4 py-3  rounded-md transition duration-300 ease-out"
        >
          + Add Problem
        </button>

      </div>
    

      {/* Problems grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 mt-8 max-w-8xl mx-auto">
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
 
    </div>
  );
}

export default Problems;
