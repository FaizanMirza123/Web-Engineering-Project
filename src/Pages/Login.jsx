import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
export default function Login({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const pass1 = useRef();
  const pass2 = useRef();
  const navigate = useNavigate();
  const toggleForm = () => setIsLogin(!isLogin);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = pass1.current.value;
    let confirmPassword;
    if (!isLogin) {
      confirmPassword = pass2.current.value;
    }
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        dispatch(
          loginSuccess({
            token: res.data.token,
            user: res.data.user,
            email: email,
          })
        );
        navigate("/");
      } else {
        if (!password || !confirmPassword) {
          return toast.error("Please fill in both password fields");
        }

        if (password !== confirmPassword) {
          return toast.error("Passwords do not match");
        }

        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            email,
            password,
          }
        );
        toast.success("Registration successful!");
        setIsLoggedIn(true);
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center text-black p-4">
          <div className="max-w-sm w-full">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder={
                    isLogin ? "Enter your password" : "Create a password"
                  }
                  ref={pass1}
                />
              </div>
              {!isLogin && (
                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Confirm your password"
                    ref={pass2}
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p className="mt-4 text-center">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={toggleForm} className="text-blue-500">
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={toggleForm} className="text-blue-500">
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-black flex items-center justify-center text-white p-4">
          <div className="max-w-sm text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              Welcome Back!
            </h1>
            <p className="text-lg mb-4">
              Please log in to access your account.
            </p>
            <p className="text-sm">
              Don't have an account? Sign up to get started!
            </p>
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-500"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
