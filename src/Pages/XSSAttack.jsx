import React, { useCallback, useState } from 'react'
import xssimg from '../assets/xssimg.jfif'
import xsstype from '../assets/xsstypeimg.jpg'
import preventimg from '../assets/preventimg.webp'

const XSSAttack = (props) => {
  const [comments, setcomments] = useState([]);
  const [input, setinput] = useState("");
<<<<<<< HEAD
  const [sanitize, setSanitize] = useState(false); // New state to track checkbox
=======
  const [sanitize, setSanitize] = useState(false);
>>>>>>> 6102ec8b4d7514ec57aad7048aa43b480a5263c0

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
<<<<<<< HEAD
=======
      setinput('');
>>>>>>> 6102ec8b4d7514ec57aad7048aa43b480a5263c0
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="bg-gray-950 text-white min-h-screen px-10 py-6 space-y-8">
      <h1 className="text-4xl font-bold">
        Cross-Site <span className="text-purple-600">{props.type}</span> (XSS Attack)
      </h1>
      <p className="text-lg">
        Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-4 rounded-lg">
          <img className="w-20 h-20 mb-2" src={xssimg} alt="XSS Intro" />
          <h2 className="text-xl font-semibold mb-2">What is XSS?</h2>
          <p className="text-base leading-relaxed">
            XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of browser-side scripts, to different end users. These attacks can steal data, hijack sessions, or redirect users to malicious sites.
          </p>
        </div>

        <div className="bg-blue-950 p-4 rounded-lg">
          <img className="h-10 mb-2" src={xsstype} alt="XSS Types" />
          <h2 className="text-xl font-semibold">XSS Types</h2>
          <ul className="list-disc list-inside mt-2 space-y-2 text-base">
>>>>>>> 6102ec8b4d7514ec57aad7048aa43b480a5263c0
            <li>Reflected XSS (non-persistent)</li>
            <li>Stored XSS (persistent)</li>
            <li>DOM-based XSS</li>
            <li>Blind XSS</li>
          </ul>
        </div>

<<<<<<< HEAD
        <div className='bg-slate-800 w-[400px] h-[270px] pl-5 ml-20 '>
          <img className='h-10 w-10' src={preventimg} alt="Loading" />
          <ul className='text-base list-disc list-inside space-y-5'>
=======
        <div className="bg-slate-800 p-4 rounded-lg">
          <img className="h-10 w-10 mb-2" src={preventimg} alt="Prevention" />
          <h2 className="text-xl font-semibold mb-2">Prevention Techniques</h2>
          <ul className="list-disc list-inside text-base space-y-2">
>>>>>>> 6102ec8b4d7514ec57aad7048aa43b480a5263c0
            <li>Input validation & sanitization</li>
            <li>Output encoding</li>
            <li>Content Security Policy (CSP)</li>
            <li>Using frameworks with built-in XSS protection</li>
          </ul>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold">Interactive <span className="text-purple-600">Demo</span></h2>
          <div className="bg-zinc-800 p-4 rounded-lg space-y-3 mt-2">
            <div className="text-base">
              <label className="font-semibold">Comment Section Vulnerability</label>
              <div className="mt-2 flex items-center gap-2">
                <input type="checkbox" onChange={(e) => setSanitize(e.target.checked)} />
                <label>Enable Input Sanitization</label>
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg">
              <label className="text-lg font-medium">Comments:</label>
              <div className="max-h-40 overflow-y-auto bg-gray-800 p-2 rounded mb-2">
                {comments.map((comment, index) => (
                  <pre key={index}>User: {comment}</pre>
                ))}
              </div>
              <input
                className="w-full bg-slate-950 p-2 border border-green-600 rounded mt-2"
                type="text"
                placeholder="Enter Your Comment Here...(Try Adding HTML or Script Tags)"
                value={input}
                onChange={(e) => setinput(e.target.value)}
              />
              <button className="mt-3 px-4 py-2 border border-green-800 text-purple-500 rounded" onClick={addcomment}>
                Post Comment
              </button>
            </div>

            <div>
              <label className="font-semibold">Try entering some of these common XSS payloads:</label>
              <ul className="list-disc list-inside ml-4">
                <li>&lt;script&gt;alert('XSS')&lt;/script&gt;</li>
                <li>&lt;img src="x" onerror="alert('XSS')"&gt;</li>
                <li>&lt;a href="javascript:alert('XSS')"&gt;Click me&lt;/a&gt;</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold">XSS Payload Tester</h2>
          <label className="block mt-3">Enter XSS Payload to Test:</label>
          <input className="w-full h-12 bg-slate-950 border mt-2 border-green-600 rounded px-2" type="text" placeholder="Enter Data" />
          <label className="mt-3 block text-xl">Preview:</label>
          <div className="w-full h-24 mt-1 bg-white border rounded-lg"></div>
          <p className="mt-2">Note: Some XSS payloads may be blocked by browser security features.</p>

          <label className="text-2xl mt-4 block">XSS Terminal</label>
          <input className="w-full h-12 bg-slate-950 border border-green-600 mt-2 rounded px-2" type="text" placeholder="Enter command" />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold pl-2">Prevention <span className="text-purple-600">Guide</span></h2>
        <div className="bg-slate-900 p-6 rounded-lg mt-4 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-purple-500">1. Input Validation & Sanitization</h3>
            <div className="bg-gray-700 p-4 rounded mt-2 text-base">
              <pre>// Instead of directly using user input:</pre>
              <pre>element.innerHTML = userInput;</pre>
              <pre>// Sanitize input first:</pre>
              <pre>const sanitized = DOMPurify.sanitize(userInput);</pre>
              <pre>element.innerHTML = sanitized;</pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-500">2. Output Encoding</h3>
            <p className="mt-2 ml-2">Encode user-generated content before rendering it to prevent script execution.</p>
            <div className="bg-gray-700 p-4 rounded mt-2 text-base">
              <pre>const encodedOutput = userInput</pre>
              <pre>.replace(/&/g, '&amp;')</pre>
              <pre>.replace(/&lt;/g, '&amp;lt;')</pre>
              <pre>.replace(/&gt;/g, '&amp;gt;')</pre>
              <pre>.replace(/&quot;/g, '&amp;quot;')</pre>
              <pre>.replace(/&#039;/g, '&amp;#039;')</pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-500">3. Content Security Policy (CSP)</h3>
            <p className="mt-2">Implement CSP Headers to restrict which scripts can be executed.</p>
            <div className="bg-gray-700 p-4 rounded mt-2 text-base">
              <pre>Content-Security-Policy: default-src 'self';</pre>
              <pre>script-src 'self' trusted-cdn.com;</pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-500">4. Use Frameworks with XSS Protection</h3>
            <p className="mt-2 text-base">Modern frameworks like React, Angular, and Vue have built-in XSS protection.</p>
>>>>>>> 6102ec8b4d7514ec57aad7048aa43b480a5263c0
          </div>
        </div>
      </div>
    </div>
  )
}

export default XSSAttack;
