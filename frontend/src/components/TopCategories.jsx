function TopCategories({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) {
    return (
      <p className="text-gray-500 mt-6">
        No expense data available
      </p>
    );
  }

  // total expense per category
  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + Number(t.amount);
  });

  const categoryList = Object.keys(categoryMap).map((key) => ({
    category: key,
    amount: categoryMap[key],
  }));

  // sort descending
  categoryList.sort((a, b) => b.amount - a.amount);

  const topCategories = categoryList.slice(0, 5);

  // highest amount (for progress bar scaling)
  const maxAmount = topCategories[0].amount;

  const COLORS = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-green-500",
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h4 className="font-semibold mb-6">
        Top Expense Categories
      </h4>

      <div className="space-y-5">
        {topCategories.map((item, index) => {
          const percentage = (item.amount / maxAmount) * 100;

          return (
            <div key={item.category}>
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${COLORS[index]}`}
                  ></span>
                  <span className="font-medium text-gray-800">
                    {item.category}
                  </span>
                </div>

                <span className="font-semibold">
                  ₹{item.amount}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${COLORS[index]} rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopCategories;
