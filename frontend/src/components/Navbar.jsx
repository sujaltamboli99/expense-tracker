import { Link, useNavigate } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b border-gray-300 bg-white">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">

        <Link to="/" className="flex items-center gap-2">
          <FaWallet className="text-2xl text-blue-600" />
          <span className="text-xl font-bold text-gray-800">
            SpendIQ
          </span>
        </Link>

        <div className="flex items-center gap-4">

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-black font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-black font-medium"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

