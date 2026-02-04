import { useState, useEffect } from "react";
import api from "../services/api";

function TransactionForm({ onAdd, editingTransaction, onUpdate }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

    useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setAmount(editingTransaction.amount);
      setDescription(editingTransaction.description || "");
    }
  }, [editingTransaction]);

  const expenseCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Rent",
    "Bills",
    "Entertainment",
    "Other",
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other",
  ];

  // 🔑 Reset category when type changes
  const handleTypeChange = (e) => {
    setType(e.target.value);
    setCategory("");
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    if (editingTransaction) {
      // 🔹 UPDATE existing transaction
      await api.put(`/transactions/${editingTransaction._id}`, {
        type,
        category,
        amount,
        description,
      });

      onUpdate(); // refresh list & exit edit mode
    } else {
      // 🔹 CREATE new transaction
      await api.post("/transactions", {
        type,
        category,
        amount,
        description,
      });

      onAdd(); // refresh list
    }

    // 🔹 reset form after submit
    setCategory("");
    setAmount("");
    setDescription("");
  } catch (err) {
    setError("Failed to save transaction");
  }
};


  return (
    <div className="max-w-xl w-full bg-white rounded-xl shadow-xl p-8 h-fit">
      <h3 className="font-semibold text-lg text-gray-900 mb-5 text-center">
        Add Transaction
      </h3>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Type */}
        <div>
          <label className="block text-[16px] font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[16px] font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Select category</option>

            {(type === "expense" ? expenseCategories : incomeCategories).map(
              (cat, index) => (
                <option key={index} value={cat.toLowerCase()}>
                  {cat}
                </option>
              )
            )}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-[16px] font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[16px] font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="Add a note (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Button */}
<button type="submit">
  {editingTransaction ? "Update Transaction" : "Add Transaction"}
</button>
      </form>
    </div>
  );
}

export default TransactionForm;
