import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import { MdArrowForward } from "react-icons/md";
import FeatureCard from '../components/FeatureCard';
import { features } from '../data/features';
import Footer from '../components/Footer';

const Landing = () => {
  return (
<div>
  <Navbar />

  <main className="bg-gradient-to-b from-[#F3F8FF] via-[#F6FAFF] to-white">

    {/* ================= HERO ================= */}
    <section className="flex items-center justify-center px-6 w-full min-h-[calc(100vh-64px)]">
      <div className="max-w-3xl text-center">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
          Take Control of Your
          <span className="block bg-gradient-to-r from-[#007CF0] to-[#00DFD8] bg-clip-text text-transparent">
            Financial Future
          </span>
        </h1>

        <p className="max-w-xl mx-auto mt-6 text-base sm:text-lg text-[#6f757d]">
          Smart expense tracking made simple. Track, analyze, and optimize your
          spending habits with powerful insights and beautiful visualizations.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/register"
            className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold rounded-lg flex items-center gap-2 transition"
          >
            Start Tracking Free
            <MdArrowForward size={20} />
          </Link>

          <Link
            to="/login"
            className="h-11 px-6 flex items-center justify-center bg-white border border-gray-300 text-black text-base sm:text-lg font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Sign In
          </Link>
        </div>

      </div>
    </section>

    {/* ================= FEATURES ================= */}
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-black">
          Everything You Need to Manage Money
        </h2>

        <p className="max-w-xl mx-auto mt-4 text-base sm:text-lg text-[#6f757d]">
          Powerful features designed specifically for college students and young professionals
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </section>

    {/* ================= CTA ================= */}
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-r from-[#0F62FE] via-[#0096A7] to-[#00A63E] shadow-xl">

        <div className="text-center px-6 sm:px-10 md:px-16 py-14 md:py-16 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Ready to Transform Your Finances?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/90">
            Join thousands of users who are already taking control of their money
          </p>

          <Link
            to="/register"
            className="inline-flex mt-8 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg"
          >
            Create Free Account
          </Link>
        </div>

      </div>
    </section>

    <Footer />

  </main>
</div>

  )
}

export default Landing;

