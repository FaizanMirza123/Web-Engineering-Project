
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";


const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-cyber-dark">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="cyber-card max-w-md w-full text-center">
          <Shield className="mx-auto text-cyber-blue h-20 w-20 mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
          <div className="cyber-terminal mb-6">
            <p className="text-cyber-green"> Error: Page not found</p>
            <p className="text-cyber-green"> System could not locate requested resource</p>
            <p className="text-cyber-green">Initiating return protocol...</p>
          </div>
          <p className="text-xl text-white mb-6">
            The page you're looking for has been relocated or doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
             className="animate-set px-6 py-3 border-2 border-cyber-blue
         text-cyber-blue text-[1.125rem] font-semibold hover:bg-cyber-fade transition-colors
         rounded-[6px]">
            Return to Base
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default NotFound;
