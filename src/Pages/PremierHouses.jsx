import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { properties } from '../data/dummyData';
import PropertyCard from '../Pages/PropertyCard'; // Using the now-modified PropertyCard

// Import GSAP and ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const PremierHouses = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    // Create a context for cleanup
    const ctx = gsap.context(() => {
      // Create a timeline for a controlled animation sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%', // Start animation when 80% of the component is in view
          end: 'bottom 20%',
        },
      });

      // 1. Animate the header content
      tl.from('.premier-header > *', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // 2. Animate the property cards
      tl.from('.property-card-item', {
        opacity: 0,
        y: 70,
        scale: 0.95,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
      }, "-=0.5");

      // 3. Animate the mobile-only button
      tl.from('.mobile-see-all-btn', {
          opacity: 0,
          y: 20,
          duration: 0.5,
      }, "<");

    }, root); // Scope the animations to the root element

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <div ref={root} className="bg-white py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="premier-header flex justify-between items-start mb-12">
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
            <div key={property.id} className="property-card-item">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 md:hidden">
             <button className="mobile-see-all-btn btn bg-gray-800 hover:bg-black text-white rounded-full px-6">
                See All Properties <ArrowRight className="ml-2" size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PremierHouses;