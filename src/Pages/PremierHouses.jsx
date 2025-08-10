import React from 'react';
import { ArrowRight } from 'lucide-react';
import { properties } from '../data/dummyData';
import PropertyCard from './PropertyCard';

const PremierHouses = () => {
  return (
    <div className="bg-white py-24 sm:py-32 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Explore our premier houses</h2>
            <p className="text-gray-600 max-w-lg">
              Each listing offers unique features, exceptional quality, and prime locations, ensuring an exclusive living experience.
            </p>
          </div>
          <button className="btn bg-gray-800 hover:bg-black text-white rounded-full px-6 hidden md:flex">
            See All Properties <ArrowRight className="ml-2" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="text-center mt-12 md:hidden">
             <button className="btn bg-gray-800 hover:bg-black text-white rounded-full px-6">
                See All Properties <ArrowRight className="ml-2" size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PremierHouses;