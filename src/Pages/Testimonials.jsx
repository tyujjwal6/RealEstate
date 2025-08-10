import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../data/dummyData';

// --- FIX #1: Corrected the import path ---
// Reusable components should be in a 'components' folder.
import ImageWithLoader from '../Pages/ImageWithLoader'; 

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const root = useRef(null);
  const sliderContainer = useRef(null);
  
  // --- FIX #2: Add a ref to track the initial render ---
  // This is the key to separating the entrance animation from the interaction animation.
  const isInitialRender = useRef(true);

  // --- 1. ENTRANCE ANIMATION ON SCROLL (MODIFIED) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      });

      tl.from('.testimonial-header > *', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      })
      .from('.testimonial-body', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      }, "-=0.5")
      // --- FIX #3: Animate the first slide's content AS PART of the entrance ---
      // This ensures the first slide appears smoothly with the rest of the component.
      .from('.carousel-item:first-child .animate-in', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
      }, "-=0.7"); // Overlap with the body animation for a seamless look

    }, root);

    return () => ctx.revert();
  }, []);

  // --- 2. GSAP SLIDER LOGIC (MODIFIED FOR INTERACTIONS ONLY) ---
  useEffect(() => {
    const slides = sliderContainer.current?.children;
    if (!slides) return;

    // This part always runs: move the slider container
    gsap.to(sliderContainer.current, {
      xPercent: -100 * activeSlide,
      duration: 0.8,
      ease: 'power3.inOut',
    });

    // --- FIX #4: Prevent content animation on the very first render ---
    // The entrance animation has already handled the first slide.
    // This block now only runs for user-driven slide changes.
    if (isInitialRender.current) {
      isInitialRender.current = false; // Set it to false after the first run
      return; // And exit the effect
    }

    // This animation now only runs on the 2nd, 3rd, etc. slide changes.
    const activeSlideContent = slides[activeSlide];
    gsap.from(activeSlideContent.querySelectorAll('.animate-in'), {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
        delay: 0.3, 
    });

  }, [activeSlide]);

  const goToSlide = (index) => setActiveSlide(index);
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    // The rest of your JSX remains exactly the same. The fixes are purely in the logic.
    <div ref={root} className="bg-white py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="testimonial-header flex justify-between items-center mb-12">
          {/* ... Header Content ... */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">What our clients say<br/>about us</h2>
          <div className="hidden sm:flex items-center gap-2">
            <div className="avatar-group -space-x-6">
              <div className="avatar"><div className="w-12"><ImageWithLoader src="/images/testimonial-person.jpg" alt="Client 1"/></div></div>
              <div className="avatar"><div className="w-12"><ImageWithLoader src="/images/testimonial-person-2.jpg" alt="Client 2"/></div></div>
              <div className="avatar"><div className="w-12"><ImageWithLoader src="/images/testimonial-person-3.jpg" alt="Client 3"/></div></div>
            </div>
            <p className="font-semibold text-gray-700">More than 500+ <br/> Client Reviews</p>
          </div>
        </div>
        <div className="testimonial-body relative">
            {/* ... Carousel JSX ... */}
             <div className="relative w-full overflow-hidden rounded-3xl">
                <div ref={sliderContainer} className="flex">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="carousel-item relative w-full flex-shrink-0">
                    <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 p-4">
                        <div className="animate-in">
                        <ImageWithLoader src={testimonial.image} className="w-64 h-64 md:w-80 md:h-80 rounded-3xl object-cover shadow-xl" alt={`Testimonial from ${testimonial.name}`}/>
                        </div>
                        <div className="relative">
                        <span className="text-lime-400 text-8xl font-bold absolute -top-8 left-0 opacity-50 z-0">“</span>
                        <div className="bg-gray-50 p-8 rounded-3xl relative z-10">
                            <p className="animate-in text-xl lg:text-2xl text-gray-700 italic mb-6">{testimonial.quote}</p>
                            <p className="animate-in font-bold text-gray-900">{testimonial.name}</p>
                            <p className="animate-in text-gray-500">{testimonial.role}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 sm:left-5 sm:right-5 top-1/2 z-20">
                <button onClick={prevSlide} aria-label="Previous testimonial" className="btn btn-circle btn-outline bg-white/50 hover:bg-white"><ArrowLeft/></button>
                <button onClick={nextSlide} aria-label="Next testimonial" className="btn btn-circle btn-outline bg-white/50 hover:bg-white"><ArrowRight/></button>
            </div>
            <div className="flex justify-center w-full py-2 gap-2 mt-4">
                {testimonials.map((_, index) => (
                <button 
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`btn btn-xs btn-circle transition-colors ${activeSlide === index ? 'btn-primary' : 'bg-gray-300 border-none hover:bg-gray-400'}`}
                />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;