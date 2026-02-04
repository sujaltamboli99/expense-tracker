import { useEffect, useState } from "react";
import api from "../services/api";
import TransactionForm from "./TransactionForm";
import RecentTransactions from "./RecentTransactions";
import TransactionSummary from "./TransactionSummary";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);


  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (err) {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = () => {
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      alert("Failed to delete transaction");
    }
  };

const handleEdit = (transaction) => {
  setEditingTransaction(transaction);
};


  if (loading) {
    return (
      <div className="p-6 sm:p-8 mt-10 max-w-6xl mx-auto text-center text-gray-500">
        Loading your transactions…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 sm:p-8 mt-10 max-w-6xl mx-auto text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 max-w-6xl mx-auto">

      {/* SUMMARY */}
      <TransactionSummary transactions={transactions} />

      {/* FORM + LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">

        {/* Add Transaction Form */}
<TransactionForm
  onAdd={fetchTransactions}
  editingTransaction={editingTransaction}
  onUpdate={() => {
    setEditingTransaction(null);
    fetchTransactions();
  }}
/>
        {/* Recent Transactions */}
        <div className="w-full">
          <RecentTransactions
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

      </div>
    </div>
  );
}

export default TransactionList;
