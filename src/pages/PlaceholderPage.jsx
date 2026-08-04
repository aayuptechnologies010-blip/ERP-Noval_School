import React from 'react';
import { FaTools } from 'react-icons/fa';

function PlaceholderPage() {
  return (
    <div className="flex-1 bg-[#f9fafb] rounded-tl-[2rem] p-6 flex flex-col items-center justify-center">
      <div className="text-teal-500 mb-6 animate-bounce">
        <FaTools className="text-7xl" />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Under Construction</h1>
      <p className="text-gray-500 text-lg">This feature is currently being built. Check back soon!</p>
    </div>
  );
}

export default PlaceholderPage;
