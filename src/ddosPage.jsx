import { Shield } from 'lucide-react';
import React from 'react'
import { Zap } from 'lucide-react';
import { Server } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import "./css/ddosPage.css";
import { useState,useRef } from 'react';


const DdosPage = () => {
    const ddosData = [
        {
          type: "section",
          title: "What is a DDoS Attack?",
          description:
            "A DDoS attack uses multiple compromised computer systems to target a single system, causing a denial of service for users of the targeted resource. The flood of incoming traffic and requests forces the target to slow down or even crash and shut down."
        },
        {
          type: "section",
          title: "Common Attack Types",
          list: [
            "HTTP/HTTPS floods",
            "TCP SYN floods",
            "UDP floods",
            "DNS amplification",
            "NTP amplification"
          ]
        },
        {
          type: "section",
          title: "Protection Methods",
          list: [
            "Traffic filtering and rate limiting",
            "Anycast network diffusion",
            "DDoS protection services",
            "Black hole routing",
            "Web Application Firewalls (WAF)"
          ]
        }
      ];

      const nginxConfig = `// Example Nginx rate limiting configuration
http {
  limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
  
  server {
    location /login {
      limit_req zone=one burst=5;
    }
  }
}`

 const [targetUrl, setTargetUrl] = useState('');
  const [message, setMessage] = useState('');
  let inputRef=useRef(null);
  let reqRef=useRef(null);
  let durationRef=useRef(null);

  const startAttack = async () => {
    try {
      const response = await axios.post('http://localhost:3000/start-attack', {
        targetUrl: inputRef.current.value,
        requestsPerSecond: 100,  
        durationSeconds: 30
      });

      setMessage(response.data);  // "Started attack on..."
    } catch (error) {
      console.error(error);
      setMessage('Error starting attack.');
    }
  };


      




  return (
    <div className='px-2  py-5 text-center'>
        <h1 className='mt-2'> DDoS <span className='text-cyber-green'>Attack</span></h1>
    <p className='text-center'>Distributed Denial of Service (DDoS) attacks attempt to disrupt normal traffic to a targeted server, service, or network by overwhelming it with a flood of internet traffic.</p>
    <div className='cards-section d-inline-flex text-center justify-content-center row'>
    <div class="card col-md-3 col-9 mx-1 my-3 p-4">
    <Zap class="card-img-top" alt=""/>
    <div class="card-body">
    <h5 class="card-title">What is a DDoS Attack?</h5>
    <p class="card-text text-grey">A DDoS attack uses multiple compromised computer systems to target a single system, causing a denial of service for users of the targeted resource. The flood of incoming traffic and requests forces the target to slow down or even crash and shut down.</p>
    


    
  </div>
</div>

<div class="card col-md-3 col-9 mx-1 my-3 p-4">
    <Server class="card-img-top" alt=""/>
    <div class="card-body">
    <h5 class="card-title">Common Attack Types</h5>
    <ul className='card-text text-grey'>
    <li>HTTP/HTTPS floods</li>
    <li>TCP SYN floods</li>
    <li>UDP floods</li>
    <li>DNS amplification</li>
    <li>NTP amplification</li>
    </ul>
    


    
  </div>
</div>

<div class="card col-md-3 col-9 mx-1 my-3 p-4">
    <Shield class="card-img-top" alt=""/>
    <div class="card-body">
    <h5 class="card-title">Protection Methods</h5>
    <ul class="card-text text-grey">
    <li>Traffic filtering and rate limiting</li>
    <li>Anycast network diffusion</li>
    <li>DDoS protection services</li>
    <li>Black hole routing</li>
    <li>Web Application Firewalls (WAF)</li>

    </ul>
  </div>
</div>


    </div>
    <div className='test-section my-5'>
    <form action="">
      <h2>Test your <span className='text-cyber-green'>Website</span></h2>
      <input type="url" name="" id="" placeholder='Enter URL' className='col-10 url-testing-field my-2' ref={inputRef}/>
      <input type="number" name="" id="" placeholder='Choose Requests Per Second' className='col-10 url-testing-field my-2' ref={reqRef}/>
      <input type="number" name="" id="" placeholder='Duration (Seconds)' className='col-10 url-testing-field my-2' />
      <button className='startTestingBtn col-10 my-2' onClick={()=>{startAttack();}} ref={durationRef}>Start Testing</button>
    </form>
    </div>

    <div className='guide-section row text-center justify-content-center'>
    <h2 className='text-center text-cyber-green'>Protection Guide</h2>
    <div className='card col-9 text-start'>
    <div className='d-inline-flex text-center justify-content-center'>
        <AlertTriangle size={24} className='flex-shrink-0' />< p>DDoS attacks can be devastating to businesses, causing service outages, financial losses, and damage to reputation. Implementing effective protection measures is essential.

    </p>
    </div>

    <h3 className="row text-center">How to Protect Against DDoS Attacks</h3>
    <h4 className='text-cyber-green'>1. Increase Network Bandwidth</h4>
    <p>Having more bandwidth than you need can help absorb the impact of a DDoS attack.</p>
    <h4 className='text-cyber-green'>2. Use a Content Delivery Network (CDN)</h4>
    <p>A CDN can help distribute traffic across multiple servers, reducing the impact of an attack.</p>     
    <h4 className='text-cyber-green'>3. Configure Firewalls and Routers</h4>
    <div className='cyber-terminal'>
        <pre>// Example iptables rule to rate limit connections
        iptables -A INPUT -p tcp --dport 80 -m limit   --limit 25/minute --limit-burst 100 -j ACCEPT</pre>
    </div>
    <h4 className='text-cyber-green'>4. Use DDoS Protection Services</h4>
    <p>Consider using third-party DDoS protection services that can help mitigate attacks.</p>    

    <h4 className='text-cyber-green'>5. Implement Rate Limiting</h4>
    <div className='cyber-terminal'>
        <pre>{nginxConfig}</pre>
    </div>


    </div>
    
    </div>
    
    </div>
    
  )
}

export default DdosPage