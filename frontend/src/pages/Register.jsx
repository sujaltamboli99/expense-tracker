import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("Register success:", response.data);

      // after successful registration → go to login
      navigate("/login");
    } 
catch (err) {
  console.error(err);

  if (err.response && err.response.data) {
    setError(
      err.response.data.message ||
      err.response.data.error ||
      "Registration failed"
    );
  } else {
    setError("Server not responding");
  }
}
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F8FF] to-[#ECFEF8] px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-black">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Sign up to start managing your expenses
        </p>


        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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
              placeholder="Create a strong password"
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
            Create Account
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;

