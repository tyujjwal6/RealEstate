import React from 'react';
import { Globe } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="navbar bg-transparent text-white absolute top-0 left-0 right-0 z-10 px-4 sm:px-8 lg:px-16">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52">
            <li><a>Home</a></li>
            <li><a>About Us</a></li>
            <li><a>Property List</a></li>
            <li><a>Contact Us</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-bold">EverGreen</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base font-semibold">
          <li><a className="bg-white text-black rounded-full">Home</a></li>
          <li><a>About Us</a></li>
          <li><a>Property List</a></li>
          <li><a>Contact Us</a></li>
        </ul>
      </div>
      <div className="navbar-end gap-4">
        <div className="hidden sm:flex items-center gap-2">
            <Globe size={20} />
            <span>Eng</span>
        </div>
        <button 
          className="btn bg-lime-400 hover:bg-lime-500 border-none rounded-full px-6 text-black"
          onClick={()=>document.getElementById('signup_modal').showModal()}
        >
            Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;