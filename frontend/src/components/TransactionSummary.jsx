const TransactionSummary = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">

      {/* TOTAL BALANCE */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <p className="text-sm text-gray-500">Total Balance</p>
        <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mt-2 break-words">
          ₹{totalBalance.toFixed(2)}
        </h3>
      </div>

      {/* TOTAL INCOME */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <p className="text-sm text-gray-500">Total Income</p>
        <h3 className="text-xl sm:text-2xl font-bold text-green-600 mt-2 break-words">
          ₹{totalIncome.toFixed(2)}
        </h3>
      </div>

      {/* TOTAL EXPENSE */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <p className="text-sm text-gray-500">Total Expenses</p>
        <h3 className="text-xl sm:text-2xl font-bold text-red-600 mt-2 break-words">
          ₹{totalExpense.toFixed(2)}
        </h3>
      </div>

    </div>
  );
};

export default TransactionSummary;
