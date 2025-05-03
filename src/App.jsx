import {BrowserRouter,Routes,Route,Navigate,} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Index from "./Pages/Index";
import SQLInjectionPage from "./Pages/SQLInjectionPage";
import XSSAttack from "./Pages/XSSAttack";
import DdosPage from "./Pages/ddosPage";
import NotFound from "./Pages/NotFound";
import Navbar from "./Navbar";
import Login from "./Pages/Login";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/status");
        if (localStorage.getItem("token")) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setServerError(true);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (serverError) {
    return <div>Server is not running. Please start the server.</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          }
        >
          <Route
            index
            element={(() => {
              if (isLoggedIn) {
                return <Index />;
              } else {
                return <Navigate to="/login" />;
              }
            })()}
          />

          <Route
            path="login"
            element={(() => {
              if (isLoggedIn) {
                return <Navigate to="/" />;
              } else {
                return <Login setIsLoggedIn={setIsLoggedIn} />;
              }
            })()}
          />


          <Route
            path="ddos"
            element={
              <ProtectedRoute>
                <DdosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="xss"
            element={
              <ProtectedRoute>
                <XSSAttack />
              </ProtectedRoute>
            }
          />
          <Route
            path="sql-injection"
            element={
              <ProtectedRoute>
                <SQLInjectionPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
