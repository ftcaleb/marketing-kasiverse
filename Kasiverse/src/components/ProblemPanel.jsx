import React from "react";

// icon
import { MapPin } from "lucide-react";

// ProblemPanel displays a single problem card
function ProblemPanel({ problem }) {

  return (
    // Card container
    <div className="bg-white p-5 rounded-lg shadow flex flex-col gap-3">
      {/* Problem title */}
      <h3 className="text-lg font-semibold text-gray-900">
        {problem.title}
      </h3>
      {/* Full problem description */}
      <p className="text-sm text-gray-700 whitespace-pre-wrap">
        {problem.description}
      </p>
      {/* Location row */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin size={14} />
        <span>{problem.location}</span>
      </div>

    </div>
  );
}

export default ProblemPanel;
