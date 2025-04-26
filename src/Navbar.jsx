import React, { useState } from 'react'
import { Shield, Menu, X } from 'lucide-react';
export default function Navbar() {
 // State to toggle the mobile menu
 const [isOpen, setIsOpen] = useState(false);

 // Toggle function for the hamburger menu
 const toggleMenu = () => {
   setIsOpen(!isOpen);
 };

 return (
   <nav className="bg-cyber-dark p-2 font-sans-serif">

     <div className="max-w-7xl mx-auto flex justify-between items-center">
       <div className="text-white text-xl ">
       <Shield className="h-11 w-11 text-cyber-blue inline p-1" />
       <h1 className="font-bold inline">Cyber</h1>
       <h1 className="font-bold text-cyber-blue inline">Defense</h1>
       </div>
       
       {/* Desktop Menu */}
       <div className="hidden md:flex space-x-6">
       <button 
            onClick={() => navigateTo('/sql-injection')} 
            className="text-white hover:text-cyber-blue transition-colors">
            SQL Injection
            </button>

            <button 
            onClick={() => navigateTo('/xss')} 
            className="text-white hover:text-cyber-purple transition-colors"
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
 );
}
