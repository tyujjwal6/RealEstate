import React, { useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  // A ref for the component's root element to scope our animations
  const heroRef = useRef(null);

  useEffect(() => {
    // GSAP Context is the modern, safe way to use GSAP in React
    // It automatically handles cleanup to prevent memory leaks.
    const ctx = gsap.context(() => {
      
      // Create a timeline to orchestrate the animations in sequence
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: 'power3.out' }
      });

      // --- Animation Sequence ---

      // 1. Animate the background image with a subtle zoom-out ("Ken Burns" effect)
      // This is on a separate div so it doesn't affect other elements.
      tl.fromTo(".hero-bg-img", 
        { scale: 1.15, opacity: 0.8 }, 
        { scale: 1, opacity: 1, duration: 4, ease: 'none' }
      );

      // 2. Animate the small tag buttons with a staggered fade-in from the top
      tl.from(".hero-tag", {
        y: -40,
        opacity: 0,
        stagger: 0.15,
      }, "-=3.5"); // Overlap with the background animation for a smoother start

      // 3. Animate the main headline with a "reveal from bottom" effect.
      // This is responsive because yPercent is relative to the element's own height.
      tl.from(".hero-title", {
        yPercent: 100,
        opacity: 0,
      }, "-=0.3");

      // 4. Animate the subtitle paragraph with a simple fade-in and slide-up
      tl.from(".hero-subtitle", {
        y: 20,
        opacity: 0,
      }, "-=0.6");

      // 5. Animate the entire search form container, making it slide up from the bottom
      tl.from(".search-form", {
        y: 50,
        opacity: 0,
        duration: 1,
      }, "-=0.5");

      // 6. Animate the items *inside* the search form with a final staggered flourish
      tl.from(".form-item", {
          opacity: 0,
          y: 20,
          stagger: 0.1
      }, "-=0.7");

    }, heroRef); // Scope the context to this component

    // Cleanup function: GSAP automatically reverts all animations when the component unmounts
    return () => ctx.revert();

  }, []); // The empty dependency array ensures this effect runs only once

  return (
    // Add the ref to the root element
    <div ref={heroRef}>
      <div 
        className="hero min-h-screen relative overflow-hidden" // overflow-hidden is crucial for the zoom effect
      >
        {/*
          SOLUTION for the image:
          The background image is placed on its own div. This allows us to animate it
          (scale, opacity) without affecting the overlay or any content on top.
          The original image URL from your code is used here.
        */}
        <div 
          className="hero-bg-img absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/src/assets/hero.jpg')` }}
        ></div>

        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-neutral-content w-full px-4 sm:px-8 lg:px-16 flex flex-col items-start">
          <div className="max-w-4xl">
              {/* Added a class "hero-tag" to each button for GSAP targeting */}
              <div className='flex gap-2 mb-4'>
                  <button className='hero-tag btn btn-sm rounded-full bg-white bg-opacity-20 border-white text-white backdrop-blur-sm'>House</button>
                  <button className='hero-tag btn btn-sm rounded-full bg-white bg-opacity-20 border-white text-white backdrop-blur-sm'>Apartment</button>
                  <button className='hero-tag btn btn-sm rounded-full bg-white bg-opacity-20 border-white text-white backdrop-blur-sm'>Residential</button>
              </div>

            {/* Wrapped title in a div with overflow-hidden for the reveal effect */}
            <div className="overflow-hidden">
                <h1 className="hero-title mb-5 text-5xl md:text-7xl font-bold">Build Your Future, One Property at a Time.</h1>
            </div>
            <p className="hero-subtitle mb-5 max-w-sm">Own Your World. One Property at a time. Own Your World. One Property at a Time. Own Your World.</p>
          </div>
        </div>
        
        {/* Search Form: Added "search-form" class for targeting the whole container */}
        <div className="search-form absolute -bottom-3 w-full px-4 sm:px-8 lg:px-16">
              <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto text-black">
                  {/* Added "form-item" class to all children for staggered animation */}
                  <h2 className="form-item text-xl font-bold mb-4">Find the best place</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                      <div className="form-item form-control w-full">
                          <label className="label"><span className="label-text font-semibold">Looking for</span></label>
                          <input type="text" placeholder="Enter type" className="input input-bordered w-full bg-gray-100" />
                      </div>
                      <div className="form-item form-control w-full">
                          <label className="label"><span className="label-text font-semibold">Price</span></label>
                          <select className="select select-bordered w-full bg-gray-100">
                              <option>Price</option>
                              <option>$100,000 - $200,000</option>
                              <option>$200,000 - $500,000</option>
                          </select>
                      </div>
                      <div className="form-item form-control w-full">
                          <label className="label"><span className="label-text font-semibold">Locations</span></label>
                          <select className="select select-bordered w-full bg-gray-100">
                              <option>Location</option>
                              <option>New York</option>
                              <option>Denver</option>
                              <option>Austin</option>
                          </select>
                      </div>
                      <div className="form-item form-control w-full">
                          <label className="label"><span className="label-text font-semibold">Number of rooms</span></label>
                          <select className="select select-bordered w-full bg-gray-100">
                              <option>2 Bed rooms</option>
                              <option>3 Bed rooms</option>
                              <option>4+ Bed rooms</option>
                          </select>
                      </div>
                      <button className="form-item btn bg-gray-800 hover:bg-black text-white w-full lg:w-auto lg:h-[48px] self-end">
                          <Search size={20} className="mr-2"/>
                          Search Properties
                      </button>
                  </div>
                  <div className="form-item flex items-center gap-4 mt-4">
                      <span className="font-semibold">Filter:</span>
                      <button className="btn btn-sm btn-outline rounded-full">City</button>
                      <button className="btn btn-sm btn-outline rounded-full">House</button>
                      <button className="btn btn-sm btn-outline rounded-full">Residential</button>
                      <button className="btn btn-sm btn-outline rounded-full">Apartment</button>
                  </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;