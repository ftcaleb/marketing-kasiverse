import React from "react";
import { MapPin } from "lucide-react";

// ProblemPanel displays a single problem card
function ProblemPanel({ problem }) {
  return (
    // Card container
    <div className="bg-white p-5 border border-gray-300 rounded-lg shadow-2xl flex flex-col transition duration-300 ease-out hover:-translate-y-1
                    hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] max-w-sm w-full ">

      {/* Problem title */}
      <div className="flex items-center justify-between gap-2">

        <h3 className="text-lg font-semibold text-black">
          {problem.title}
        </h3>
      </div>
      {/* Problem description */}
      <p className="text-sm text-black whitespace-pre-wrap">
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
