import React, { useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    // Use GSAP Context for proper cleanup
    const ctx = gsap.context(() => {
      // --- REVISED ANIMATION LOGIC ---
      // We will create separate, individually triggered animations for each section
      // instead of one master timeline. This makes the component feel more responsive
      // to the user's scroll position.

      // The key is toggleActions: "restart none none none" which will replay the
      // animation every time the element scrolls into view from the top.

      // 1. Animate the top header elements
      gsap.from(".features-title", {
        yPercent: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ".features-title",
          start: "top 85%",
          toggleActions: "restart none none none",
        }
      });
      gsap.from(".features-header-thumb", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".features-header-thumb",
          start: "top 85%",
          toggleActions: "restart none none none",
        }
      });

      // 2. Animate the main content grid using a timeline for coordinated effects
      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main-content-grid",
          start: "top 80%",
          toggleActions: "restart none none none",
        }
      });

      gridTl.from(".main-image", {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
      })
      .from(".avatar-bubbles", {
          scale: 0.5,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
      }, "-=0.8")
      .from(".right-card", {
          y: 60,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
      }, "-=0.8");

      // 3. Animate the bottom navigation row
      gsap.from(".bottom-nav", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".bottom-nav",
          start: "top 95%",
          toggleActions: "restart none none none",
        }
      });

      // 4. Animate the stats section
      // First, fade in the container for each stat
      gsap.from(".stat-item", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".stats-container", // Trigger based on the container
          start: "top 70%",
          toggleActions: "restart none none none",
        }
      });

      // Then, animate the numbers counting up, each triggered individually
      gsap.utils.toArray(".stat-number").forEach(el => {
        const targetNumber = parseFloat(el.textContent.replace(/[%+,]/g, ''));
        gsap.from(el, {
          textContent: 0,
          duration: 3,
          ease: "power2.out",
          snap: { textContent: 1 }, // Snap to whole numbers
          stagger: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "restart none none none",
          },
          // A custom function to format the number during the animation
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].textContent) + (el.dataset.suffix || '');
          }
        });
      });

    }, mainRef);

    // Cleanup function to revert all animations
    return () => ctx.revert();
  }, []);

  return (
    // Add the ref to the root element for GSAP context
    <div ref={mainRef} className="bg-white py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
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

        {/* Added a wrapper with a class for a more precise trigger */}
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
        
        {/* Stats Section - Added a wrapper with a class for a more precise trigger */}
        <div className="stats-container mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item border-r border-gray-200">
                <h3 className="stat-number text-4xl md:text-5xl font-bold text-gray-800" data-suffix="%">100</h3>
                <p className="text-gray-500">Satisfactions Clients</p>
            </div>
            <div className="stat-item md:border-r border-gray-200">
                <h3 className="stat-number text-4xl md:text-5xl font-bold text-gray-800" data-suffix="+">500</h3>
                <p className="text-gray-500">Property sells</p>
            </div>
            <div className="stat-item border-r border-gray-200">
                <h3 className="stat-number text-4xl md:text-5xl font-bold text-gray-800" data-suffix="+">150</h3>
                <p className="text-gray-500">Countries & Cities</p>
            </div>
            <div className="stat-item">
                {/* Corrected number and moved suffix to data attribute */}
                <h3 className="stat-number text-4xl md:text-5xl font-bold text-gray-800" data-suffix="+">2000</h3>
                <p className="text-gray-500">Positive reviews</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Features;