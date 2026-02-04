import React from "react";

// CategoryFilter displays pill-style category tabs for filtering
function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 mt-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full font-medium transition duration-300 ease-out ${
            activeCategory === category
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-white/20 text-gray-200 hover:bg-white/30"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
