import { useEffect, useState } from "react";
import axios from "axios";
import { ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function UserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/api/auth/userdata",
          { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-cyber-blue">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        Loading user data...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-10 font-medium">{error}</div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-cyber-dark text-white rounded-lg p-6 shadow-lg mb-8 border border-cyber-border">
        <h2 className="text-3xl font-bold mb-4 text-cyber-blue">
          User Profile
        </h2>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold">Accessed On:</span>{" "}
          {new Date().toLocaleString()}
        </p>
      </div>

      {/* XSS History */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-cyber-green mb-4">
          XSS Scan History
        </h3>

        {userData?.xssData?.length > 0 ? (
          userData.xssData.map((xss, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg p-5 mb-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {new Date(xss.date).toLocaleString()}
                </span>
                <span className="text-sm px-2 py-1 text-black bg-gray-200 rounded">
                  {xss.type}
                </span>
              </div>

              <p className="mb-2">
                <span className="font-medium text-black">Vulnerable:</span>{" "}
                {xss.result.isVulnerable ? (
                  <span className="text-red-600 font-semibold inline-flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4" />
                    Yes
                  </span>
                ) : (
                  <span className="text-green-600 font-semibold inline-flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    No
                  </span>
                )}
              </p>

              {/* Vulnerabilities */}
              {xss.result.vulnerabilities?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-black">
                    Vulnerabilities Found:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-black">
                    {xss.result.vulnerabilities.map((vuln, i) => (
                      <li key={i} className="ml-2">
                        <p>
                          <strong>Injection Point:</strong>{" "}
                          {vuln.injectionPoint}
                        </p>
                        <p>
                          <strong>URL:</strong>{" "}
                          <a
                            href={vuln.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-words"
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
          <p className="text-gray-500 italic">No XSS scan history available.</p>
        )}
      </div>
    </div>
  );
}
