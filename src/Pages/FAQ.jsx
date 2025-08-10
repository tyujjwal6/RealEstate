import React, { useLayoutEffect, useRef } from 'react';
import { faqs } from '../data/dummyData';

// Import our custom image loader for the conditional image
import ImageWithLoader from '../Pages/ImageWithLoader'; // Adjust path if needed

// Import GSAP and the ScrollTrigger plugin
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  // Create a ref for the root element to use as the animation trigger
  const root = useRef(null);

  // useLayoutEffect is best for animations that need to measure the DOM
  useLayoutEffect(() => {
    // GSAP Context provides a safe environment for animations and easy cleanup
    const ctx = gsap.context(() => {
      // Create a timeline for a controlled, sequential animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%', // Animation starts when the top of the component is 80% down the viewport
          end: 'bottom 20%', // Helps with performance and timing
        },
      });

      // 1. Animate the header section first
      // The '>' selector targets direct children for precise animation
      tl.from('.faq-header > *', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2, // Animates the h2 and p one after the other
      });

      // 2. Animate the FAQ items (the accordions)
      // The stagger effect is naturally responsive and works perfectly on any screen size.
      tl.from('.faq-item', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1, // A subtle delay between each FAQ item appearing
      }, "-=0.5"); // The "-=0.5" overlaps this animation with the previous one for a smoother flow

    }, root); // Scope the animations to the `root` element

    // Cleanup function: This is crucial to prevent memory leaks when the component unmounts
    return () => ctx.revert(); 
  }, []);


  return (
    // Attach the ref to the root element of our component
    <div ref={root} className="bg-gray-50 py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* We add a "faq-header" class to group elements for GSAP targeting */}
        <div className="faq-header flex justify-between items-start mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Frequently asked<br />questions
          </h2>
          <p className="text-gray-600 max-w-sm hidden md:block">
            Our experts guide you in making informed investment decisions based on market insights. We offer residential, commercial, and luxury properties tailored to different preferences and budgets.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            // Add a "faq-item" class to each card for GSAP to animate
            <div key={index} className="faq-item collapse collapse-arrow bg-white rounded-2xl shadow-sm">
              <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />
              <div className="collapse-title text-xl font-semibold text-gray-800">
                {faq.question}
              </div>
              <div className="collapse-content">
                <div className="flex flex-col md:flex-row gap-8 pt-2">
                    <p className="text-gray-600 flex-grow">{faq.answer}</p>
                    {/* The image now uses our high-performance loader */}
                    {index === 0 && (
                        <ImageWithLoader 
                            src="/images/faq-interior.jpg" 
                            alt="Modern home interior" 
                            className="w-full md:w-64 h-40 rounded-xl object-cover" 
                        />
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;