import React from 'react';
import { Bed, Bath, MapPin } from 'lucide-react';

// 1. We MUST import the lazy-loading component we created earlier
import ImageWithLoader from './ImageWithLoader'; // Make sure this path is correct

const PropertyCard = ({ property }) => {
  // Destructure properties for cleaner access
  const { image, bedrooms, bathrooms, title, price, address } = property;

  return (
    // "group" allows for cool hover effects on child elements (see button)
    <div className="group card card-compact bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out rounded-2xl overflow-hidden">
      
      <figure className="relative">
        {/*
          FIX #1: PERFORMANCE
          Replaced the standard <img> tag with our lazy-loading component.
          This will show a blurred placeholder until the image is loaded.
        */}
        <ImageWithLoader 
          src={image} 
          alt={title} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        {/* FIX #2: IMPROVED STYLING
           - Changed badge color to a primary theme color for better branding.
           - Used DaisyUI `badge-primary` class for consistency.
        */}
        <div className="absolute top-4 left-4 badge badge-primary text-primary-content border-none p-3 font-semibold">
          For Sale
        </div>
      </figure>

      <div className="card-body gap-3">
        {/* FIX #3: VISUAL HIERARCHY
           - Made the title the most prominent element with a darker color.
           - Used `card-title` but ensured it's a strong color.
        */}
        <h2 className="card-title text-xl font-bold text-base-content !mb-0">{title}</h2>

        {/* Added Address with an icon for better context */}
        <p className="flex items-center gap-1.5 text-sm text-base-content/70">
            <MapPin size={14} /> {address}
        </p>

        <div className="flex justify-between items-center mt-2">
            {/* FIX #4: DATA FORMATTING
                - Formatted the price with `toLocaleString()` to add commas (e.g., $1,200,000).
                - Made the price very prominent.
            */}
            <p className="text-2xl font-extrabold text-base-content">
                ${price.toLocaleString()}
            </p>
            <div className="flex gap-4 text-base-content/80">
                <span className="flex items-center gap-1.5"><Bed size={16}/> {bedrooms}</span>
                <span className="flex items-center gap-1.5"><Bath size={16}/> {bathrooms}</span>
            </div>
        </div>

        {/* FIX #5: USER INTERACTION (Call to Action)
           - Added a "View Details" button, which is crucial for a property listing.
           - It appears on hover for a clean, modern look.
        */}
        <div className="card-actions mt-2">
           <button className="btn btn-primary w-full transition-all opacity-0 group-hover:opacity-100">
                View Details
            </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;