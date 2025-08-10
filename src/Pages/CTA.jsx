import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <div 
        className="hero min-h-[60vh] relative" 
        style={{ backgroundImage: `url('/src/assets/cta-bg.jpg')` }}
    >
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-2xl">
            <h1 className="mb-5 text-4xl md:text-6xl font-bold">Ready to Make Your Dream Property a Reality?</h1>
            <p className="mb-8">Explore a curated selection of properties that align with your vision and goals.</p>
            <button className="btn bg-white text-black hover:bg-gray-200 border-none rounded-full px-8">
                Get Started <ArrowRight className="ml-2" />
            </button>
            </div>
        </div>
    </div>
  );
};

export default CTA;