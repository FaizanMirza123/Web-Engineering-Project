import React from 'react'
import { Database, ShieldAlert, Zap } from 'lucide-react'; 
export default function Index() {
  return (
    <div className="min-h-screen bg-cyber-black flex flex-col items-center">
      {/* Top Titles */}
      <div className="py-12 flex justify-center items-center">
        <h1 className="text-5xl font-bold text-white inline">Cyber</h1>
        <h1 className="text-5xl font-bold text-cyber-blue inline">Defense</h1>
        <h1 className="text-5xl font-bold text-white ml-4">Playground</h1>
      </div>

      {/* Description */}
      <div className="text-center py-2">
        <p className="text-gray-300 text-xl">
          Learn about common cyber attacks through interactive demonstrations in a safe environment.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-center py-8">
        <button className="animate-set px-6 py-3 border-2 border-cyber-blue
         text-cyber-blue text-[1.125rem] font-semibold hover:bg-cyber-fade transition-colors
         rounded-[6px]">
          Start Testing
        </button>
      </div>

      {/* New Title */}
      <div className="py-8 ">
        <h2 className="text-2xl font-bold text-white text-center inline ">
        Choose an 
        </h2>
        <h2 className="text-2xl font-bold text-cyber-blue text-center inline ml-2">Attack Vector</h2>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl pb-8">
        {/* Card 1 */}
        <div className="bg-cyber-dark border border-cyber-blue rounded-lg p-6 flex-1 min-w-[400px] max-w-[600px] text-white shadow-lg hover:shadow-cyber-blue transition-shadow">
          <Database className="text-cyber-blue w-12 h-12"/>
          <h3 className="text-xl font-bold mb- py-4">SQL Injection</h3>
          <p className="text-gray- py-4">Learn how attackers can manipulate SQL queries to access unauthorized data and how to prevent these attacks.</p>
          <button className="animate-set px-6 py-3 border-2 border-cyber-blue
         text-cyber-blue text-[1.125rem] font-semibold hover:bg-cyber-fade transition-colors
         rounded-[6px]">
          Learn More
        </button>
</div>

        {/* Card 2 */}
        <div className="bg-cyber-dark border border-cyber-blue rounded-lg p-6 flex-1 min-w-[400px] max-w-[600px] text-white shadow-lg hover:shadow-cyber-blue transition-shadow">
        <ShieldAlert className="text-cyber-purple w-12 h-12 "/>
          <h3 className="text-xl font-bold mb-2 py-4">XSS Attack</h3>
          <p className="text-white-400 py-4">Explore cross-site scripting vulnerabilities where malicious scripts are injected into trusted websites..</p>
          <button className="animate-set2 px-6 py-3 border-2 border-cyber-purple
         text-cyber-purple text-[1.125rem] font-semibold hover:bg-cyber-fade2 transition-colors
         rounded-[6px]">
          Learn More
        </button>
        </div>

        {/* Card 3 */}
        <div className="bg-cyber-dark border border-cyber-blue rounded-lg p-6 flex-1 min-w-[400px] max-w-[600px] text-white shadow-lg hover:shadow-cyber-blue transition-shadow">
          <Zap className="text-cyber-green w-12 h-12"/>
          <h3 className="text-xl font-bold mb-2 py-4 pb-8">DDoS Attacks</h3>
          <p className="text-white-400 pb-8">Understand how distributed denial-of-service attacks work by overwhelming servers with traffic.</p>
          <button className="animate-set3 px-6 py-3 border-2 border-cyber-green
         text-cyber-green text-[1.125rem] font-semibold hover:bg-cyber-fade3 transition-colors
         rounded-[6px]">
          Learn More
        </button>
        </div>
      </div>
      <div className="flex justify-center py-4 ">
      <h2 className="text-2xl font-bold text-white text-center inline ">
        How it
        </h2>
        <h2 className="text-2xl font-bold text-cyber-blue text-center inline ml-2">Works</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 px-8 w-full max-w-7xl pb-16">
        <div className="bg-cyber-dark border border-cyber-blue rounded-lg p-6 flex-1 min-w-[250px] max-w-[1120px] text-white shadow-lg hover:shadow-cyber-blue transition-shadow">
    <ol className="list-decimal list-inside text-gray-300 text-lg space-y-4 marker:text-cyber-blue"  >
      <li>Choose an attack vector you want to learn about.</li>
      <li>Explore the interactive demonstration to understand how the attack works.</li>
      <li>Learn about prevention techniques and best practices to protect against these attacks.</li>
      <li>Test your knowledge with practical exercises in our safe environment.</li>
    </ol>
     </div>
        </div>
    </div>
  )
}
