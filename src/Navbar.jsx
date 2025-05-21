import { useRef, useState } from "react";
import { Shield } from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Navbar({ setIsLoggedIn, isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigateTo = useNavigate();

  const color2 = useRef(null);
  const color1 = useRef(null);
  const color3 = useRef(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const ChangeColor = (target) => {
    if (target === "sql") {
      color1.current.className =
        "text-white bg-cyber-fade transition-colors p-3";
      color2.current.className =
        "text-white hover:bg-cyber-fade2 transition-colors p-3";
      color3.current.className =
        "text-white hover:bg-cyber-fade3 transition-colors p-3";
      navigateTo("/sql-injection");
    } else if (target === "xss") {
      color1.current.className =
        "text-white hover:bg-cyber-fade transition-colors p-3";
      color2.current.className =
        "text-white bg-cyber-fade2 transition-colors p-3";
      color3.current.className =
        "text-white hover:bg-cyber-fade3 transition-colors p-3";
      navigateTo("/xss");
    } else if (target === "ddos") {
      color1.current.className =
        "text-white hover:bg-cyber-fade transition-colors p-3";
      color2.current.className =
        "text-white hover:bg-cyber-fade2 transition-colors p-3";
      color3.current.className =
        "text-white bg-cyber-fade3 transition-colors p-3";

      navigateTo("/ddos");
    } else if (target == "Index") {
      navigateTo("/login");
      try {
        color1.current.className =
          "text-white hover:bg-cyber-fade transition-colors p-3";
        color2.current.className =
          "text-white hover:bg-cyber-fade2 transition-colors p-3";
        color3.current.className =
          "text-white hover:bg-cyber-fade3 transition-colors p-3";
      } catch (err) {}
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="bg-cyber-dark p-2 font-sans-serif border-b border-cyber-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="text-white text-xl cursor-pointer"
            onClick={() => ChangeColor("Index")}
          >
            <Shield className="h-20 w-20 text-cyber-blue inline p-2 pb-4" />
            <h1 className="font-bold inline">Cyber</h1>
            <h1 className="font-bold text-cyber-blue inline">Defense</h1>
          </div>

          {/* Desktop Menu */}
          {isLoggedIn && (
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => ChangeColor("sql")}
                ref={color1}
                className="text-white hover:bg-cyber-fade transition-colors p-3"
              >
                SQL Injection
              </button>

              <button
                onClick={() => ChangeColor("xss")}
                ref={color2}
                className="text-white hover:bg-cyber-fade2 transition-colors p-3"
              >
                XSS Attack
              </button>

              <button
                onClick={() => ChangeColor("ddos")}
                ref={color3}
                className="text-white hover:bg-cyber-fade3 transition-colors p-3"
              >
                DDOS Attack
              </button>

              <button
                onClick={() => navigateTo("/userdata")}
                className="text-white hover:text-cyber-purple transition-colors block p-3"
              >
                UserData
              </button>
              <button
                onClick={handleLogout}
                className="text-white hover:text-cyber-green transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          <div className="md:hidden p-4">
            <button onClick={toggleMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isLoggedIn && (
          <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
            <div className="space-y-4 py-4 px-6">
              <button
                onClick={() => navigateTo("/sql-injection")}
                className="text-white hover:text-cyber-blue transition-colors block"
              >
                SQL Injection
              </button>

              <button
                onClick={() => navigateTo("/xss")}
                className="text-white hover:text-cyber-purple transition-colors block"
              >
                XSS Attack
              </button>
              <button
                onClick={() => navigateTo("/userdata")}
                className="text-white hover:text-cyber-purple transition-colors block"
              >
                UserData
              </button>

              <button
                onClick={() => navigateTo("/ddos")}
                className="text-white hover:text-cyber-purple transition-colors block"
              >
                DDOS Attack
              </button>

              <button
                onClick={handleLogout}
                className="text-white hover:text-cyber-green transition-colors block"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <Outlet />

      <footer className="bg-cyber-dark border-t border-cyber-border py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-gray-400 text-sm">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-8 w-8 text-cyber-blue mr-2" />
            <span className="text-white font-bold">
              Cyber<span className="text-cyber-blue">Defense</span>
            </span>
          </div>
          <div className="text-center">
            © {new Date().getFullYear()} CyberDefense. All rights reserved.
            <br className="md:hidden" />
            <span className="block md:inline">
              {" "}
              | Educational purposes only.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
