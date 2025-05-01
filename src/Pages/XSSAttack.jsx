import React, { useCallback, useState } from 'react'
import xssimg from '../assets/xssimg.jfif'
import xsstype from '../assets/xsstypeimg.jpg'
import preventimg from '../assets/preventimg.webp'

const XSSAttack = (props) => {
  const [comments, setcomments] = useState([]);
  const [input, setinput] = useState("");
  const [sanitize, setSanitize] = useState(false);

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
      setinput('');
    }
  };

  return (
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
            <li>Reflected XSS (non-persistent)</li>
            <li>Stored XSS (persistent)</li>
            <li>DOM-based XSS</li>
            <li>Blind XSS</li>
          </ul>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <img className="h-10 w-10 mb-2" src={preventimg} alt="Prevention" />
          <h2 className="text-xl font-semibold mb-2">Prevention Techniques</h2>
          <ul className="list-disc list-inside text-base space-y-2">
            <li>Input validation & sanitization</li>
            <li>Output encoding</li>
            <li>Content Security Policy (CSP)</li>
            <li>Using frameworks with built-in XSS protection</li>
          </ul>
        </div>
      </div>

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default XSSAttack;
