import React, { useState } from 'react'
import { Shield, Menu, X } from 'lucide-react';
import { Outlet,useNavigate  } from 'react-router-dom';
export default function Navbar() {
 // State to toggle the mobile menu
 const [isOpen, setIsOpen] = useState(false);
 const navigateTo = useNavigate();
 // Toggle function for the hamburger menu
 const toggleMenu = () => {
   setIsOpen(!isOpen);
 };

 return (
<>
   <nav className="bg-cyber-dark p-2 font-sans-serif border-b border-cyber-border">

     <div className="max-w-7xl mx-auto flex justify-between items-center">
       <div className="text-white text-xl " onClick={() => navigateTo('/')}>
       <Shield className="h-20 w-20 text-cyber-blue inline p-2 pb-4"  />
       <h1 className="font-bold inline">Cyber</h1>
       <h1 className="font-bold text-cyber-blue inline">Defense</h1>
       </div>
       
       {/* Desktop Menu */}
       <div className="hidden md:flex space-x-6">
       <button 
            onClick={() => navigateTo('/sql-injection')} 
            className="text-white hover:text-cyber-blue transition-colors p-3">
            SQL Injection
            </button>

            <button 
            onClick={() => navigateTo('/xss')} 
            className="text-white hover:text-cyber-purple transition-colors p-3"
          >
            XSS Attack
          </button>
          <button 
            onClick={() => navigateTo('/ddos')} 
            className="text-white hover:text-cyber-green transition-colors"
          >
            DDoS Attack
          </button>
       </div>

       {/* Hamburger Icon for Mobile */}
       <div className="md:hidden p-4">
         <button onClick={toggleMenu} className="text-white">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
           </svg>
         </button>
       </div>
     </div>

     {/* Mobile Menu */}
     <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
       <div className="space-y-4 py-4 px-6">
          <button 
            onClick={() => navigateTo('/sql-injection')} 
            className="text-white hover:text-cyber-blue transition-colors block">
            SQL Injection
            </button>
            
            <button 
            onClick={() => navigateTo('/xss')} 
            className="text-white hover:text-cyber-purple transition-colors block"
          >
            XSS Attack
          </button>
          <button 
            onClick={() => navigateTo('/ddos')} 
            className="text-white hover:text-cyber-green transition-colors block"
          >
            DDoS Attack
          </button>
       </div>
     </div>
   </nav>
   <Outlet/>
   <footer className="bg-cyber-dark border-t border-cyber-border py-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-gray-400 text-sm">
    
    {/* Logo */}
    <div className="flex items-center mb-4 md:mb-0">
      <Shield className="h-8 w-8 text-cyber-blue mr-2" />
      <span className="text-white font-bold">Cyber<span className="text-cyber-blue">Defense</span></span>
    </div>

    {/* Copyright */}
    <div className="text-center">
      © {new Date().getFullYear()} CyberDefense. All rights reserved.<br className="md:hidden" />
      <span className="block md:inline"> | Educational purposes only.</span>
    </div>

  </div>
</footer>
   </>
   
   
 );
}
