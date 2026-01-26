import React from "react";
import ContactForm from "./ContactForm.jsx";
import { Link } from "react-router-dom"
// icon
import { MapPin } from "lucide-react";

// ProblemPanel displays a single problem card
function StorePanel({ store }) {

  return (
    // Card container
    <div className="bg-white p-5 border border-gray-300 rounded-lg shadow-md flex flex-col gap-3 transition duration-300 ease-out hover:-translate-y-1
                hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
      {/* Problem title */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center text-lg font-semibold text-black">
        {store.title} 
      </h3>
      <p className="text-sm text-black rounded-lg px-2 bg-red-600">{store.category}</p>
      </div>
      
      {/* Full problem description */}
      <p className="text-sm text-black whitespace-pre-wrap">
        {store.description}
      </p>
      {/* Location row */}
      <div className="flex items-center justify-between border-t">
        <span className="flex items-center gap-1 text-black">
          <MapPin size={14} className="text-black" />
          {store.location}
        </span>
        <p className="text-sm text-white rounded-lg px-2 bg-green-500">${store.price}</p>
      </div>

      <Link to="contactForm" className="mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300 ease-out">
        Contact Business
        </Link>

    </div>
  );
}

export default StorePanel;