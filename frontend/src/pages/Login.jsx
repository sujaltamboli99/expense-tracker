import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [error, setError] = useState("");

    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // backend returns token
      const token = response.data.token;

      // store token
      localStorage.setItem("token", token);

      // go to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      const data = err.response?.data;

      setError(
        data?.message ||
        data?.error ||
        data?.msg ||
        (typeof data === "string" ? data : "Login failed")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F8FF] to-[#ECFEF8] px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-black">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Enter your credentials to access your account
        </p>

          {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;


