import React, { useState } from 'react';

export default function SQLInjectionPage() {
  const [username, setUsername] = useState('');
  const [queryResult, setQueryResult] = useState('No results found');
  const [terminalLog, setTerminalLog] = useState(
    'SQL Injection Practice Terminal\nType "help" for available commands\n\n'
  );

  function handleExecute() {
    // stubbed logic
    if (username.toLowerCase() === 'admin') {
      setQueryResult('User: admin | Role: Administrator');
    } else {
      setQueryResult('No results found');
    }
  }

  function handleTerminalKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = e.target.value.trim();
      let out;
      if (cmd === 'help') {
        out = 'help — show commands\nexit — leave terminal';
      } else if (cmd === 'exit') {
        out = 'Closing terminal...';
      } else {
        out = `Command not found: ${cmd}`;
      }
      setTerminalLog((prev) => prev + `> ${cmd}\n${out}\n\n`);
      e.target.value = '';
    }
  }

  return (
    <div className="container mx-auto px-6 py-10 space-y-12">
      {/* 1. What is SQL Injection? / Attack Vectors / Prevention Methods */}
      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-teal-400 text-2xl font-semibold mb-4">What is SQL Injection?</h2>
          <p className="leading-relaxed">
            SQL injection occurs when user-supplied data is included directly in SQL
            queries without proper validation or escaping. Attackers can manipulate your
            database, bypass authentication, or extract sensitive data.
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Common Attack Vectors</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Using <code>OR 1=1</code> to bypass login</li>
              <li>Appending <code>; DROP TABLE users;</code></li>
              <li>UNION SELECT injections</li>
              <li>Boolean-based blind injections</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
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
      <section className="grid md:grid-cols-2 gap-8">
        {/* SQL Query Interface */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">SQL Query Interface</h3>
          <pre className="bg-gray-900 p-3 rounded mb-4 font-mono">
            {`SELECT * FROM users WHERE username = '${username}' ;`}
          </pre>
          <input
            type="text"
            placeholder="Enter username to search"
            className="w-full p-2 mb-3 bg-gray-900 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleExecute}
            className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition"
          >
            Execute Query
          </button>
          <div className="mt-4 text-green-300">{queryResult}</div>
        </div>

        {/* SQL Injection Terminal */}
        <div className="bg-gray-800 p-6 rounded-lg font-mono text-sm">
          <h3 className="text-xl font-semibold mb-4">SQL Injection Terminal</h3>
          <div className="h-56 overflow-y-auto bg-gray-900 p-3 rounded mb-3 whitespace-pre-wrap">
            {terminalLog}
          </div>
          <input
            type="text"
            placeholder='Type "help" and press Enter'
            className="w-full p-2 bg-gray-900 rounded"
            onKeyDown={handleTerminalKey}
          />
        </div>
      </section>

      {/* 3. Prevention Guide */}
      <section className="space-y-8">
        <h2 className="text-teal-400 text-2xl font-semibold">How to Prevent SQL Injection</h2>

        <div className="bg-gray-800 p-6 rounded-lg space-y-4">
          <h3 className="font-semibold">1. Use Parameterized Queries</h3>
          <pre className="bg-gray-900 p-4 rounded font-mono text-sm">
{`// ❌ Vulnerable:
const query = "SELECT * FROM users WHERE username = '" + username + "'";

// ✅ Safe:
const query = "SELECT * FROM users WHERE username = ?";
db.execute(query, [username]);
`}
          </pre>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">2. Input Validation</h3>
          <p>Validate and sanitize all user inputs before using them in SQL queries.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">3. Use ORMs / Frameworks</h3>
          <p>
            Object-Relational Mapping libraries (e.g. Sequelize, TypeORM) abstract away
            raw SQL and help prevent injection.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">4. Principle of Least Privilege</h3>
          <p>
            Database accounts used by your app should have only the minimal permissions
            they need.
          </p>
        </div>
      </section>
    </div>
  );
}
