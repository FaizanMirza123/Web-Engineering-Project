// src/SQLInjectionPage.js
import React, { useState } from 'react';

export default function SQLInjectionPage() {
  const [username, setUsername] = useState('');
  const [queryResult, setQueryResult] = useState('No results found');
  const [terminalLog, setTerminalLog] = useState(
    'SQL Injection Practice Terminal\nType "help" for available commands\n\n'
  );

  // real fetch to your Node.js + MySQL backend
  function handleExecute() {
    fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then(data => {
        setQueryResult(JSON.stringify(data, null, 2));
      })
      .catch(err => {
        setQueryResult("Error: " + err.message);
      });
  }

  // allow "query <name>" in the terminal
  function handleTerminalKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = e.target.value.trim();
  
      fetch('http://localhost:3000/terminal-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cmd })
      })
        .then(res => res.json())
        .then(data => {
          const output = Array.isArray(data)
            ? JSON.stringify(data, null, 2)
            : data.error || data.message || 'Unknown response';
  
          setTerminalLog(prev => prev + `> ${cmd}\n${output}\n\n`);
          e.target.value = '';
        })
        .catch(err => {
          setTerminalLog(prev => prev + `> ${cmd}\nERROR: ${err.message}\n\n`);
          e.target.value = '';
        });
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-600 text-white px-6 py-10">
      {/* 1. Conceptual Sections */}
      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-opacity-50 bg-black p-6 rounded-lg">
          <h2 className="text-teal-300 text-2xl font-semibold mb-4">
            What is SQL Injection?
          </h2>
          <p className="leading-relaxed">
            SQL injection occurs when user-supplied data is included directly in SQL
            queries without proper validation or escaping. Attackers can manipulate your
            database, bypass authentication, or extract sensitive data.
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-opacity-50 bg-black p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Common Attack Vectors</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><code className="text-teal-200">OR 1=1</code> to bypass login</li>
              <li><code className="text-teal-200">; DROP TABLE users;</code></li>
              <li>UNION SELECT injections</li>
              <li>Boolean-based blind injections</li>
            </ul>
          </div>
          <div className="bg-opacity-50 bg-black p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Prevention Methods</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use parameterized queries</li>
              <li>Implement input validation</li>
              <li>Leverage ORMs / frameworks</li>
              <li>Principle of least privilege</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Interactive Demo */}
      <section className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Query Interface */}
        <div className="bg-opacity-50 bg-black p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">SQL Query Interface</h3>
          <pre className="bg-gray-800 bg-opacity-75 p-3 rounded mb-4 font-mono">
            {`SELECT * FROM users WHERE username = '${username}' ;`}
          </pre>
          <input
            type="text"
            placeholder="Enter username to search"
            className="w-full p-2 mb-3 bg-gray-700 bg-opacity-75 rounded text-white"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button
            onClick={handleExecute}
            className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition"
          >
            Execute Query
          </button>
          <div className="mt-4 text-green-300">
            <pre className="whitespace-pre-wrap">{queryResult}</pre>
          </div>
        </div>

        {/* Injection Terminal */}
        <div className="bg-opacity-50 bg-black p-6 rounded-lg font-mono text-sm">
          <h3 className="text-xl font-semibold mb-4">SQL Injection Terminal</h3>
          <div className="h-56 overflow-y-auto bg-gray-800 bg-opacity-75 p-3 rounded mb-3 whitespace-pre-wrap">
            {terminalLog}
          </div>
          <input
            type="text"
            placeholder='Type "help" or "query <username>" and press Enter'
            className="w-full p-2 bg-gray-700 bg-opacity-75 rounded text-white"
            onKeyDown={handleTerminalKey}
          />
        </div>
      </section>

      {/* 3. Prevention Guide */}
      <section className="space-y-8 mt-12">
        <h2 className="text-teal-300 text-2xl font-semibold">How to Prevent SQL Injection</h2>
        <div className="bg-opacity-50 bg-black p-6 rounded-lg space-y-4">
          <h3 className="font-semibold">1. Use Parameterized Queries</h3>
          <pre className="bg-gray-800 bg-opacity-75 p-4 rounded font-mono text-sm">
{`// ❌ Vulnerable:
const query = "SELECT * FROM users WHERE username = '" + username + "'";

// ✅ Safe:
const query = "SELECT * FROM users WHERE username = ?";
db.execute(query, [username]);
`}
          </pre>
        </div>
        <div className="bg-opacity-50 bg-black p-6 rounded-lg">
          <h3 className="font-semibold mb-2">2. Input Validation</h3>
          <p>Validate and sanitize all user inputs before using them in SQL queries.</p>
        </div>
        <div className="bg-opacity-50 bg-black p-6 rounded-lg">
          <h3 className="font-semibold mb-2">3. Use ORMs / Frameworks</h3>
          <p>ORMs (e.g., Sequelize, TypeORM) abstract raw SQL and help prevent injection.</p>
        </div>
        <div className="bg-opacity-50 bg-black p-6 rounded-lg">
          <h3 className="font-semibold mb-2">4. Principle of Least Privilege</h3>
          <p>Give your DB user only the minimal permissions it needs.</p>
        </div>
      </section>
    </div>
  );
}
