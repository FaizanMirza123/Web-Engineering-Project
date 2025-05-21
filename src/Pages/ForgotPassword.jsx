import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          newPassword,
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="min-h-screen flex items-center justify-center bg-cyber-gray">
        <div className="w-full max-w-md p-6 bg-white border rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center text-black">
            Reset Your Password
          </h2>
          <form onSubmit={handleReset} className="text-black">
            <input
              className="w-full mb-4 p-2 border rounded"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full mb-4 p-2 border rounded"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
