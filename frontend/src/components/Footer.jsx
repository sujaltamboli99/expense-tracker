import { FaWallet } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0B1220] to-[#0E1627] text-gray-400">
      
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">

        {/* Logo + Name */}
        <div className="flex items-center justify-center gap-2 text-white">
          <FaWallet className="text-blue-500 text-2xl" />
          <span className="text-xl font-semibold">SpendIQ</span>
        </div>

        {/* Tagline */}
        <p className="mt-4 text-gray-400">
          Smart expense tracking for a better financial future
        </p>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gray-700/40"></div>

        {/* Credits */}
        <p className="text-gray-400">
          Built with <span className="text-red-500">❤</span> by{" "}
          <span className="text-blue-400 font-medium">Sujal</span>
        </p>

        {/* Copyright */}
        <p className="mt-2 text-sm text-gray-500">
          © 2026 SpendIQ. All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;
