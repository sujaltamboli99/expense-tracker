import { useState } from "react";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import AnalyticsList from "../components/AnalyticsList";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Page container */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`pb-3 text-sm font-medium transition ${
              activeTab === "transactions"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Transactions
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`pb-3 text-sm font-medium transition ${
              activeTab === "analytics"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "transactions" && <TransactionList />}

          {activeTab === "analytics" && <AnalyticsList />}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;


