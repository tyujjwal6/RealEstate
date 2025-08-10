import React from 'react';
import { ArrowRight } from 'lucide-react';

const Discover = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Map */}
        <div>
          <img src="/images/map.jpg" alt="Map with property location" className="rounded-2xl shadow-lg"/>
        </div>

        {/* Right Side: Text Content */}
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Discover Properties with the Best Value
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            From minimalist interiors to compact solutions, small spaces inspire big ideas, proving that you don't need much room.
          </p>
          <button className="btn bg-gray-800 hover:bg-black text-white rounded-full px-6">
            Find Nearest Properties <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discover;