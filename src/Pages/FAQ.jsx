import React from 'react';
import { faqs } from '../data/dummyData';

const FAQ = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Frequently asked<br />questions
          </h2>
          <p className="text-gray-600 max-w-sm hidden md:block">
            Our experts guide you in making informed investment decisions based on market insights. We offer residential, commercial, and luxury properties tailored to different preferences and budgets.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-white rounded-2xl shadow-sm">
              <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />
              <div className="collapse-title text-xl font-semibold text-gray-800">
                {faq.question}
              </div>
              <div className="collapse-content">
                <div className="flex flex-col md:flex-row gap-8 pt-2">
                    <p className="text-gray-600 flex-grow">{faq.answer}</p>
                    {index === 0 && (
                        <img src="/images/faq-interior.jpg" alt="Interior" className="w-full md:w-64 h-40 rounded-xl object-cover" />
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