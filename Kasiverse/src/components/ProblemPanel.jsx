import React from "react";

// icon
import { MapPin } from "lucide-react";

// ProblemPanel displays a single problem card
function ProblemPanel({ problem }) {

  return (
    // Card container
    <div className="bg-gray-900 p-5 border border-white rounded-lg shadow-md flex flex-col gap-3 transition duration-300 ease-out hover:-translate-y-1
                hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
      {/* Problem title */}
      <h3 className="text-lg font-semibold text-white">
        {problem.title} 
      </h3>
      {/* Full problem description */}
      <p className="text-sm text-white whitespace-pre-wrap">
        {problem.description}
      </p>
      {/* Location row */}
      <div className="flex items-center gap-2 text-sm text-white">
        <MapPin size={14} />
        <span>{problem.location}</span>
      </div>

    </div>
  );
}

export default ProblemPanel;
