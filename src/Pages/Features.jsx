import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12 flex justify-between items-start">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 max-w-md">
                Your primary home might begin to feel left out.
            </h2>
            <div className='hidden md:flex flex-col items-end text-right max-w-xs'>
                <div className='flex items-center gap-4'>
                    <img src="/src/assets/small-house-1.jpg" alt="thumbnail" className='w-20 h-20 rounded-2xl object-cover'/>
                    <p className="text-gray-600">
                        Each listing offers unique features, exceptional quality, and prime locations
                    </p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="relative">
            <img src="/src/assets/modernhouse.jpg" alt="Modern House" className="rounded-3xl w-full h-auto object-cover"/>
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg flex gap-2">
                <img src="/src/assets/property-1.jpg" alt="thumb 1" className="w-16 h-16 rounded-full object-cover border-2 border-white"/>
                <img src="/src/assets/property-2.jpg" alt="thumb 2" className="w-16 h-16 rounded-full object-cover border-2 border-white"/>
                <img src="/src/assets/property-3.jpg" alt="thumb 3" className="w-16 h-16 rounded-full object-cover border-2 border-white"/>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl">
              <h3 className="text-3xl font-bold mb-4">Big things can happen in small spaces.</h3>
              <p className="text-gray-600 mb-6">
                With thoughtful design and smart organization, you can maximize every inch, making room for creativity
              </p>
              <button className="btn btn-outline rounded-full">Details</button>
            </div>
            
            <div className="relative">
                <img src="/src/assets/small-house-1.jpg" alt="Modern Villa" className="rounded-3xl w-full h-64 object-cover"/>
                <div className="absolute inset-0 bg-black/30 rounded-3xl flex flex-col justify-end p-6 text-white">
                    <p>Pricing Start at $256K</p>
                    <button className="btn btn-ghost justify-between w-full mt-2">
                        Explore Properties <ArrowRight />
                    </button>
                </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-12">
            <p className='text-gray-500 max-w-sm'>Whether it's creating a cozy corner for relaxation or transforming a small area into a workspace</p>
            <div className="flex gap-4">
              <button className="btn btn-circle btn-outline"><ArrowLeft /></button>
              <button className="btn btn-circle btn-outline"><ArrowRight /></button>
            </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="border-r border-gray-200">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-800">100%</h3>
                <p className="text-gray-500">Satisfactions Clients</p>
            </div>
            <div className="md:border-r border-gray-200">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-800">500+</h3>
                <p className="text-gray-500">Property sells</p>
            </div>
            <div className="border-r border-gray-200">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-800">150+</h3>
                <p className="text-gray-500">Countries & Cities</p>
            </div>
            <div>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-800">2,00+</h3>
                <p className="text-gray-500">Positive reviews</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Features;