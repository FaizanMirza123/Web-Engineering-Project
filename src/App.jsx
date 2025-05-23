import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import UserData from "./Pages/UserData";
import ForgotPassword from "./Pages/forgotpassword";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#1f2937",
            color: "#fff",
            fontSize: "1rem",
            padding: "14px 20px",
          },
          success: {
            icon: <span style={{ fontSize: "1.5rem" }}>✅</span>,
            style: {
              background: "#16a34a",
            },
          },
          error: {
            icon: <span style={{ fontSize: "1.8rem" }}>⚠️</span>,
            style: {
              background: "#dc2626",
            },
          },
        }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          }
        >
          <Route path="forgot-password" element={<ForgotPassword />} />
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
            path="userdata"
            element={
              <ProtectedRoute>
                <UserData />
              </ProtectedRoute>
            }
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
