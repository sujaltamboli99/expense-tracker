function ComparisonInsight({ currentTotal, previousTotal, label }) {
  const difference = previousTotal - currentTotal;

  let message = "";
  let color = "";

  if (difference > 0) {
    message = `You saved ₹${difference} compared to ${label}`;
    color = "text-green-600";
  } else if (difference < 0) {
    message = `You spent ₹${Math.abs(difference)} more than ${label}`;
    color = "text-red-600";
  } else {
    message = `Your spending is the same as ${label}`;
    color = "text-gray-600";
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-8">
      <h4 className="font-semibold mb-2">Spending Insight</h4>
      <p className={`text-sm ${color}`}>{message}</p>
    </div>
  );
}

export default ComparisonInsight;
