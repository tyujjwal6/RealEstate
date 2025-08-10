import React from 'react';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-white text-base-content px-4 sm:px-8 lg:px-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8'>
            <div>
                <h2 className='text-4xl font-bold text-gray-800'>Discover Nature's Wonders with Expert Guidance</h2>
            </div>
            <div className='text-left md:text-right text-gray-700'>
                <p>12345, Gazipur, Dhaka, Road, Bangladesh.</p>
                <p>(+1)839-849-8483</p>
            </div>
        </div>
        <div className="divider"></div>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 py-4'>
            <div className='flex flex-wrap gap-4 md:gap-8 text-gray-600 font-semibold'>
                <a>Home</a>
                <a>About</a>
                <a>Properties</a>
                <a>Services</a>
            </div>
            <div className='text-2xl font-bold text-gray-800'>
                EverGreen
            </div>
             <div className='flex flex-wrap gap-4 md:gap-8 text-gray-600 font-semibold'>
                <a>Gallery</a>
                <a>FAQ</a>
                <a>Pricing</a>
                <a>Contact</a>
            </div>
        </div>
         <div className="divider"></div>
         <div className='flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 mt-4'>
            <p>© 2025 EverGreen. All rights reserved.</p>
            <div className='flex gap-4'>
                <a className="link link-hover">Terms & Conditions</a>
                <a className="link link-hover">Privacy Policy</a>
            </div>
         </div>
      </div>
    </footer>
  );
};

export default Footer;