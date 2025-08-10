import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Discover = () => {
  // Create a ref for the main container to scope our animations
  const discoverRef = useRef(null);

  useEffect(() => {
    // Use GSAP Context for easy cleanup
    const ctx = gsap.context(() => {
      // Create a timeline that will be controlled by ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.discover-container', // Use a class for the trigger
          start: 'top 80%', // Start animation when the top of the container is 80% down the viewport
          end: 'bottom 20%',
          toggleActions: 'restart none none none', // Re-play the animation every time it enters the viewport
        },
      });

      // --- Animation Sequence ---

      // 1. Animate the map image on the left.
      // Slides in from the left and fades in. Using xPercent is great for responsiveness.
      tl.from('.discover-image', {
        xPercent: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // 2. Animate the text content on the right.
      // We target all direct children of '.discover-text' and stagger their animation.
      // They will slide up and fade in.
      tl.from('.discover-text > *', {
        y: 50,
        opacity: 0,
        stagger: 0.2, // Animate each element 0.2s after the previous one
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.7'); // The "-=0.7" overlaps this animation with the previous one for a smoother effect

    }, discoverRef); // Scope the context to our component

    // Cleanup function to revert all animations when the component unmounts
    return () => ctx.revert();
  }, []);

  return (
    // Add the ref to the root element
    <div ref={discoverRef} className="bg-gray-50 py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Add a specific class 'discover-container' to be used as the ScrollTrigger trigger */}
      <div className="discover-container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Map */}
        <div>
          {/* Add a specific class 'discover-image' to target for animation */}
          <img src="/images/map.jpg" alt="Map with property location" className="discover-image rounded-2xl shadow-lg"/>
        </div>

        {/* Right Side: Text Content */}
        {/* Add a wrapper div with class 'discover-text' to easily target its children for staggering */}
        <div className="discover-text text-left">
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