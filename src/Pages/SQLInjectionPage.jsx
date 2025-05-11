import React, { useState } from "react";
import axios from "axios";

export default function SQLInjectionPage() {
  const [url, setUrl] = useState("");
  const [param, setParam] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [terminalLog, setTerminalLog] = useState(
    'SQL Injection Practice Terminal\nType "help" for available commands\n\n'
  );

  // Execute generic SQL injection scan via backend
  const handleCheck = async () => {
    try {
      const response = await axios.post("http://localhost:5000/check/scan", {
        targetUrl: url,
        paramName: param,
      });
      setResults(response.data || []);
      setError("");
    } catch (err) {
      setError(
        "Request failed. Make sure the backend is running and URL is correct."
      );
      setResults([]);
      console.error("Error during request:", err);
    }
  };

  // Allow "query <name>" commands in the terminal
  function handleTerminalKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = e.target.value.trim();

      axios
        .post("http://localhost:3000/terminal-query", { query: cmd })
        .then((res) => {
          const data = res.data;
          const output = Array.isArray(data)
            ? JSON.stringify(data, null, 2)
            : data.error || data.message || "Unknown response";

          setTerminalLog((prev) => prev + `> ${cmd}\n${output}\n\n`);
          e.target.value = "";
        })
        .catch((err) => {
          setTerminalLog(
            (prev) => prev + `> ${cmd}\nERROR: ${err.message}\n\n`
          );
          e.target.value = "";
        });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-600 text-white px-6 py-10">
      {/* Conceptual Sections */}
      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-opacity-50 bg-black p-6 rounded-lg">
          <h2 className="text-teal-300 text-2xl font-semibold mb-4">
            What is SQL Injection?
          </h2>
          <p className="leading-relaxed">
            SQL injection occurs when user-supplied data is included directly in
            SQL queries without proper validation or escaping. Attackers can
            manipulate your database, bypass authentication, or extract
            sensitive data.
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-opacity-50 bg-black p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Common Attack Vectors</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <code className="text-teal-200">OR 1=1</code> to bypass login
              </li>
              <li>
                <code className="text-teal-200">; DROP TABLE users;</code>
              </li>
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

      {/* Interactive Tester */}
      <section className="grid md:grid-cols-2 gap-8 mt-12">
        {/* URL & Param Tester */}
        <div className="bg-opacity-50 bg-black p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">SQL Injection Tester</h3>
          <input
            type="text"
            placeholder="Target URL (e.g. http://localhost:3000/login)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-700 bg-opacity-75 rounded text-white"
          />
          <input
            type="text"
            placeholder="Parameter to test (e.g. username)"
            value={param}
            onChange={(e) => setParam(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-700 bg-opacity-75 rounded text-white"
          />
          <button
            onClick={handleCheck}
            className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition"
          >
            Run Test
          </button>

          {error && <p className="mt-4 text-red-400">{error}</p>}

          <div className="mt-4 text-green-300">
            <h4 className="font-semibold">Results:</h4>
            {results.length === 0 ? (
              <p>No results or no vulnerabilities found.</p>
            ) : (
              <pre className="whitespace-pre-wrap bg-gray-800 bg-opacity-75 p-3 rounded">
                {JSON.stringify(results, null, 2)}
              </pre>
            )}
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

      {/* Prevention Guide */}
      <section className="space-y-8 mt-12">
        <h2 className="text-teal-300 text-2xl font-semibold">
          How to Prevent SQL Injection
        </h2>
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
          <p>
            Validate and sanitize all user inputs before using them in SQL
            queries.
          </p>
        </div>
        <div className="bg-opacity-50 bg-black p-6 rounded-lg">
          <h3 className="font-semibold mb-2">3. Use ORMs / Frameworks</h3>
          <p>
            ORMs (e.g., Sequelize, TypeORM) abstract raw SQL and help prevent
            injection.
          </p>
        </div>
        <div className="bg-opacity-50 bg-black p-6 rounded-lg">
          <h3 className="font-semibold mb-2">
            4. Principle of Least Privilege
          </h3>
          <p>Give your DB user only the minimal permissions it needs.</p>
        </div>
      </section>
    </div>
  );
}
