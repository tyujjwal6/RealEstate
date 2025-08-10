import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Import GSAP and ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  // A ref for the main container to scope our animations
  const root = useRef(null);

  useLayoutEffect(() => {
    // gsap.context() is the modern way to handle cleanup in React.
    // It automatically cleans up all GSAP animations and ScrollTriggers created within it when the component unmounts.
    const ctx = gsap.context(() => {
      // --- HEADER ANIMATION ---
      // Animate the main title and the small thumbnail description
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.features-title',
          start: 'top 85%', // Animate when 85% of the element is in view
        },
      });

      headerTimeline
        .from('.features-title', {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        })
        .from(
          '.features-header-thumb',
          {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.7' // Start this animation 0.7s before the previous one ends
        );
        
      // --- MAIN CONTENT GRID ANIMATION ---
      const gridTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.main-content-grid',
          start: 'top 80%',
        }
      });

      // Animate the large image with a subtle scale and fade
      gridTimeline.from('.main-image', {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Animate the avatar bubbles with a staggered pop-up effect
      gridTimeline.from('.avatar-bubbles', {
          opacity: 0,
          y: 20,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
      }, "-=0.8"); // Overlap with the main image animation

      // Animate the two cards on the right, staggering them
      gridTimeline.from('.right-card', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }, "-=1"); // Overlap significantly for a cohesive feel

      // --- BOTTOM NAV ANIMATION ---
      gsap.from('.bottom-nav > *', {
          scrollTrigger: {
              trigger: '.bottom-nav',
              start: 'top 90%',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
      });

      // --- STATS COUNTER ANIMATION ---
      // This is a more complex animation that triggers once when the section is entered.
      const statsSection = document.querySelector('.stats-container');
      ScrollTrigger.create({
        trigger: statsSection,
        start: 'top 80%',
        once: true, // Ensure the animation only runs once
        onEnter: () => {
          // Animate the containers of the stats first
          gsap.from('.stat-item', {
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          });

          // Animate each number
          gsap.utils.toArray('.stat-number').forEach((el) => {
            const endText = el.textContent;
            // Handle numbers with commas and suffixes like '+' or '%'
            const endValue = parseFloat(endText.replace(/,/g, ''));
            const suffix = endText.match(/[%+]/g)?.[0] || '';

            gsap.fromTo(
              el,
              { textContent: '0' },
              {
                textContent: endValue,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 }, // Snap to whole numbers
                onUpdate: () => {
                  // Format with commas and add the suffix back
                  el.textContent = Math.ceil(Number(el.textContent)).toLocaleString() + suffix;
                },
                delay: 0.5, // Start counting shortly after the container fades in
              }
            );
          });
        },
      });

    }, root); // Scope the context to the root element

    return () => ctx.revert(); // Cleanup on component unmount
  }, []);

  return (
    // The ref is now attached to the root container
    <div ref={root} className="bg-white py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12 flex justify-between items-start">
            <h2 className="features-title text-4xl md:text-5xl font-bold text-gray-800 max-w-md">
                Your primary home might begin to feel left out.
            </h2>
            <div className='features-header-thumb hidden md:flex flex-col items-end text-right max-w-xs'>
                <div className='flex items-center gap-4'>
                    <img src="/images/small-house-1.jpg" alt="thumbnail" className='w-20 h-20 rounded-2xl object-cover'/>
                    <p className="text-gray-600">
                        Each listing offers unique features, exceptional quality, and prime locations
                    </p>
                </div>
            </div>
        </div>

        <div className="main-content-grid grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="relative">
            <img src="/images/modernhouse.jpg" alt="Modern House" className="main-image rounded-3xl w-full h-auto object-cover"/>
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg flex gap-2">
                <img src="/images/property-1.jpg" alt="thumb 1" className="avatar-bubbles w-16 h-16 rounded-full object-cover border-2 border-white"/>
                <img src="/images/property-2.jpg" alt="thumb 2" className="avatar-bubbles w-16 h-16 rounded-full object-cover border-2 border-white"/>
                <img src="/images/property-3.jpg" alt="thumb 3" className="avatar-bubbles w-16 h-16 rounded-full object-cover border-2 border-white"/>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-8">
            <div className="right-card bg-gray-50 p-8 rounded-3xl">
              <h3 className="text-3xl font-bold mb-4">Big things can happen in small spaces.</h3>
              <p className="text-gray-600 mb-6">
                With thoughtful design and smart organization, you can maximize every inch, making room for creativity
              </p>
              <button className="btn btn-outline rounded-full">Details</button>
            </div>
            
            <div className="right-card relative">
                <img src="/images/small-house-1.jpg" alt="Modern Villa" className="rounded-3xl w-full h-64 object-cover"/>
                <div className="absolute inset-0 bg-black/30 rounded-3xl flex flex-col justify-end p-6 text-white">
                    <p>Pricing Start at $256K</p>
                    <button className="btn btn-ghost justify-between w-full mt-2">
                        Explore Properties <ArrowRight />
                    </button>
                </div>
            </div>
          </div>
        </div>
        
        <div className="bottom-nav flex justify-between items-center mt-12">
            <p className='text-gray-500 max-w-sm'>Whether it's creating a cozy corner for relaxation or transforming a small area into a workspace</p>
            <div className="flex gap-4">
              <button className="btn btn-circle btn-outline"><ArrowLeft /></button>
              <button className="btn btn-circle btn-outline"><ArrowRight /></button>
            </div>
        </div>
        
        {/* Stats Section - Numbers are now hardcoded with their suffixes */}
        <div className="stats-container mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item border-r border-gray-200">
                <h3 className="stat-number text-4xl md:text-5xl font-bold text-gray-800">100%</h3>
                <p className="text-gray-500">Satisfactions Clients</p>
            </div>
            <div className="stat-item md:border-r border-gray-200">
                <h3 className="stat-number text-4xl md:text-5xl font-bold text-gray-800">500+</h3>
                <p className="text-gray-500">Property sells</p>
            </div>
            <div className="stat-item border-r border-gray-200">
                <h3 className="stat-number text-4xl md:text-5xl font-bold text-gray-800">150+</h3>
                <p className="text-gray-500">Countries & Cities</p>
            </div>
            <div className="stat-item">
                <h3 className="stat-number text-4xl md:text-5xl font-bold text-gray-800">2,000+</h3>
                <p className="text-gray-500">Positive reviews</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Features;