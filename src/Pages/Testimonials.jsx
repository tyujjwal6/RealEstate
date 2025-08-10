import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../data/dummyData';

const Testimonials = () => {
  return (
    <div className="bg-white py-24 sm:py-32 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">What our clients say<br/>about us</h2>
          <div className="hidden sm:flex items-center gap-2">
            <div className="avatar-group -space-x-6">
              <div className="avatar">
                <div className="w-12">
                  <img src="/images/testimonial-person.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                   <img src="/images/testimonial-person-2.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                   <img src="/images/testimonial-person-3.jpg" />
                </div>
              </div>
            </div>
            <p className="font-semibold text-gray-700">More than 500+ <br/> Client Reviews</p>
          </div>
        </div>
        
        <div className="carousel w-full" id="testimonial-carousel">
            {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} id={`slide${index}`} className="carousel-item relative w-full">
                     <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 p-4">
                        <img src={testimonial.image} className="w-64 h-64 md:w-80 md:h-80 rounded-3xl object-cover" />
                        <div className="relative">
                            <span className="text-lime-400 text-8xl font-bold absolute -top-8 left-0 opacity-50">“</span>
                            <div className="bg-gray-50 p-8 rounded-3xl relative">
                                <p className="text-xl lg:text-2xl text-gray-700 italic mb-6">
                                    {testimonial.quote}
                                </p>
                                <p className="font-bold text-gray-900">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${(index - 1 + testimonials.length) % testimonials.length}`} className="btn btn-circle btn-outline"><ArrowLeft/></a> 
                        <a href={`#slide${(index + 1) % testimonials.length}`} className="btn btn-circle btn-outline"><ArrowRight/></a>
                    </div>
                </div> 
            ))}
        </div>
        <div className="flex justify-center w-full py-2 gap-2 mt-4">
            <a href="#slide0" className="btn btn-xs btn-circle"></a> 
            <a href="#slide1" className="btn btn-xs btn-circle"></a> 
            <a href="#slide2" className="btn btn-xs btn-circle"></a> 
        </div>

      </div>
    </div>
  );
};

export default Testimonials;