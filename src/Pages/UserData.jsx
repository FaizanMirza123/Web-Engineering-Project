import { useEffect, useState } from "react";
import axios from "axios";

export default function UserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/userdata",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-blue-600">
        User Details
      </h2>

      <div className="bg-white shadow-md rounded-lg p-5 mb-8 border border-gray-200 text-black">
        <p className="mb-2">
          <span className="font-medium">Email:</span> {userData?.user?.email}
        </p>
        <p>
          <span className="font-medium">Registered On:</span>{" "}
          {new Date(userData?.user?.createdAt).toLocaleString()}
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-green-600">
        XSS Scan History
      </h3>

      {userData?.xssData?.length > 0 ? (
        userData.xssData.map((xss, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-300 rounded-md p-4 mb-5 shadow-sm"
          >
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(xss.date).toLocaleString()}
            </p>
            <p>
              <span className="font-medium text-black">Type:</span> {xss.type}
            </p>
            <p className="text-black">
              <span className="font-medium text-black">Message:</span>{" "}
              {xss.result.message}
            </p>
            <p className="text-black">
              <span className="font-medium text-black">Vulnerable:</span>{" "}
              {xss.result.isVulnerable ? (
                <span className="text-red-600 font-semibold">Yes ⚠️</span>
              ) : (
                <span className="text-green-600 font-semibold">No ✅</span>
              )}
            </p>

            {xss.result.vulnerabilities?.length > 0 && (
              <div className="mt-3 text-black">
                <p className="font-medium">Vulnerabilities:</p>
                <ul className="list-disc list-inside space-y-1 mt-1 ">
                  {xss.result.vulnerabilities.map((vuln, i) => (
                    <li key={i}>
                      <p className="ml-2 ">
                        <strong>Injection Point:</strong> {vuln.injectionPoint}
                      </p>
                      <p className="ml-2">
                        <strong>URL:</strong>{" "}
                        <a
                          href={vuln.url}
                          className="text-black underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {vuln.url}
                        </a>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No XSS data found.</p>
      )}
    </div>
  );
}
