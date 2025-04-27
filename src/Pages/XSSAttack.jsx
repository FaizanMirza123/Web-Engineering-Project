import React, { useCallback, useState } from 'react'
import xssimg from '../assets/xssimg.jfif'
import xsstype from '../assets/xsstypeimg.jpg'
import preventimg from '../assets/preventimg.webp'

const XSSAttack = (props) => {
  const [comments, setcomments] = useState([]);
  const [input, setinput] = useState("");
  const [sanitize, setSanitize] = useState(false); // New state to track checkbox

  const sanitizeInput = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const addcomment = () => {
    if (input.trim() !== '') {
      const safeInput = sanitize ? sanitizeInput(input) : input;
      setcomments([...comments, safeInput]);
    }
  };

  return (
    <div className="bg-gray-950 text-white text-3xl   min-h-screen overflow-x-hidden">
      <h1 className="pl-5">Cross-Site <span className='text-purple-600 '>{props.type}</span>(XSS Attack)</h1>
      <pre className='pt-3  text-base'>Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.</pre>
      <div className='grid grid-cols-3  '>

        <div className='flex-wrap bg-gray-900 w-[500px] h-[270px] pl-2  '>
          <img className='w-20 h-20 ' src={xssimg} alt="Loading" />
          <label >What is XSS?</label>
          <pre className='text-base pt-2'>
            <pre >XSS attacks occur when an attacker uses a web</pre>
            <pre>application to send malicious code,generally in the</pre>
            <pre>form of browser-side scripts, to different end users.</pre>
            <pre>These attacks can steal data, hijack sessions, or</pre>
            <pre>redirect users to malicious sites.</pre>
          </pre>
        </div>

        <div className='bg-blue-950 w-[370px] h-[270px] ml-20 pl-5'>
          <img className='h-10 w-15 ' src={xsstype} alt="Loading" />
          <label className='text-2xl ' >XSS Types</label>
          <ul className='list-disc list-inside text-base space-y-5 pt-2 ' >
            <li>Reflected XSS (non-persistent)</li>
            <li>Stored XSS (persistent)</li>
            <li>DOM-based XSS</li>
            <li>Blind XSS</li>
          </ul>
        </div>

        <div className='bg-slate-800 w-[400px] h-[270px] pl-5 ml-20 '>
          <img className='h-10 w-10' src={preventimg} alt="Loading" />
          <ul className='text-base list-disc list-inside space-y-5'>
            <li>Input validation & sanitization</li>
            <li>Output encoding</li>
            <li>Content Security Policy (CSP)</li>
            <li>Using frameworks with built-in XSS protection</li>
          </ul>
        </div>
      </div>

      <div className='grid grid-cols-2 '>
        <div className='text-2xl mt-4'>
          <h1>Interactive <span className='text-purple-600'>Demo</span></h1>
          <div className='text-base pt-4 w-[700px] h-[390px] bg-zinc-800'>
            <label >Comment Section Vulnerability</label>
            <br />
            <input className='ml-2' type="checkbox" onChange={(e) => setSanitize(e.target.checked)} />
            <label className='ml-2' >Enable Input sanitaization</label>
            <div className='bg-slate-900 '>
              <label className='text-lg' >Comments:</label>
              <br />
              <label >Add Comments:</label>
              <br />
              <div className='max-h-10 overflow-scroll'>
                {
                  comments != null ?
                    comments.map((comment, index) => {
                      return (
                        <div key={index}>
                          <pre>User: {comment}</pre>
                        </div>
                      )
                    }) : null
                }
              </div>
              <input
                className='bg-slate-950 w-[600px] h-[70px] border border-green-600 mt-2 '
                type="text"
                placeholder='Enter Your Comment Here...(Try Adding HTML or Script Tags)'
                value={input}
                onChange={(event) => { setinput(event.target.value) }}
              />
              <button className='text-purple-500 mt-7 border border-green-800 ' onClick={addcomment}>Post Comment</button>
            </div>
            <label >Try entering some of these common XSS payloads:</label>
            <ul>
              <li>&lt;script&gt;alert('XSS')&lt;/script&gt;</li>
              <li>&lt;img src="x" onerror="alert('XSS')"&gt;</li>
              <li>&lt;a href="javascript:alert('XSS')"&gt;Click me&lt;/a&gt;</li>
            </ul>
          </div>
        </div>

        <div className='text-base  bg-zinc-800 mt-12'>
          <label className='text-2xl'  >XSS Payload Tester</label>
          <br />
          <label className='mt-3 block' >Enter XSS Payload to Test:</label>
          <input className='w-[700px] h-[50px] bg-slate-950 border mt-2 border-green-600' type="text" placeholder='Enter Data' />
          <label className='mt-1 text-2xl block' >Preview:</label>
          <div className='w-[700px] h-[100px] mt-1 bg-white border rounded-lg'>
          </div>
          <label >Note: Some XSS payloads may be blocked by browser security features.</label>
          <br />
          <label className='text-2xl mt-2 block' >XSS Terminal</label>
          <input className='bg-slate-950 w-[700px] h-[55px]' type="text" placeholder='Enter command' />
        </div>
      </div>

      <div className='text-xl pt-6 pl-6  '>
        <h1 className='text-2xl'>Prevention <span className='text-purple-600'>Guide</span></h1>
        <div className='border border-green-400 mt-3 bg-slate-900 ml-10 mr-10 h-[800px]'>
          <label className='text-2xl p-4 block' >How To prevent XSS Attack</label>
          <label className='text-purple-500 block pl-4' >1. Input Validation & Sanitization</label>
          <div className='bg-gray-700 h-[150px] ml-10 mr-10 '>
            <pre className='text-lg'>
              <pre>// Instead of directly using user input:</pre>
              <pre>element.innerHTML = userInput;</pre>
              <pre>// Sanitize input first:</pre>
              <pre> const sanitized = DOMPurify.sanitize(userInput);</pre>
              <pre> element.innerHTML = sanitized;</pre>
            </pre>
          </div>
          <label className='text-purple-500 pl-4 block text-xl' >2.Output Encoding</label>
          <pre className='mt-3 ml-5' >Encode user-generated content before rendering it to prevent script execution.</pre>
          <div className='bg-gray-700 h-[180px] ml-10 mr-10 text-base'>
            <label >// Encode output:</label>
            <br />
            <label><code>const encodedOutput = userInput;</code></label>
            <br />
            <label> .replace(/&/g, '&amp;')</label>
            <br />
            <label>.replace(/&lt;/g, '&amp;lt;')</label><br />
            <label>.replace(/&gt;/g, '&amp;gt;')</label><br />
            <label>.replace(/&quot;/g, '&amp;quot;')</label><br />
            <label>.replace(/&#039;/g, '&amp;#039;')</label>
          </div>
          <div>
            <label className='text-purple-400 block pt-3 '>3. Content Security Policy (CSP)</label>
            <br />
            <label >Implement CSP Headers to restrict which scripts can be executed</label>
            <div className='bg-gray-700 h-[100px] ml-10 mr-10 text-base space-y-2'>
              <label>// Add CSP header:</label><br />
              <label>Content-Security-Policy: default-src 'self';</label><br />
              <label>&nbsp;&nbsp;script-src 'self' trusted-cdn.com;</label>
            </div>
            <label className='text-purple-400 text-xl block mt-3 ml-3'>4. Use Frameworks with XSS Protection</label>
            <pre className='mt-3 text-lg'>Modern frameworks like React, Angular, and Vue have built-in XSS protection.</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default XSSAttack;
