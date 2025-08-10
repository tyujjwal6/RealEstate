import React from 'react';
import { Bed, Bath } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const { image, bedrooms, bathrooms, title, price, address } = property;

  return (
    <div className="card card-compact bg-base-300 shadow-sm rounded-2xl">
      <figure className="relative">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="absolute top-4 left-4 badge bg-white border-none text-black p-3 font-semibold">For Sale</div>
      </figure>
      <div className="card-body">
        <div className="flex gap-4 text-gray-500 text-sm">
            <span className="flex items-center gap-2"><Bed size={16}/> {bedrooms} Bedrooms</span>
            <span className="flex items-center gap-2"><Bath size={16}/> {bathrooms} Bathroom</span>
        </div>
        <h2 className="card-title text-xl font-bold text-gray-500">{title}</h2>
        <p className="text-lg font-semibold text-gray-400">${price}</p>
        <p className="text-gray-500">{address}</p>
      </div>
    </div>
  );
};

export default PropertyCard;