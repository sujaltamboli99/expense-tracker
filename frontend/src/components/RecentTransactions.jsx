import { FiEdit2, FiTrash2 } from "react-icons/fi";

const RecentTransactions = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full">

      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Recent Transactions
      </h3>

      {/* EMPTY STATE */}
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-gray-600 font-medium">
            No transactions yet.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Add your first transaction!
          </p>
        </div>
      ) : (
        /* TRANSACTION LIST */
        <div className="space-y-4">
          {transactions.map((txn) => (
            <div
              key={txn._id}
              className="
                bg-gray-50 rounded-lg p-4
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-4
              "
            >
              {/* LEFT SIDE */}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {txn.category}
                  </h4>

                  {/* TYPE BADGE */}
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-medium
                    ${
                      txn.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {txn.type}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {txn.description || "—"}
                </p>

                <p className="text-sm text-gray-400 mt-0.5">
                  {new Date(txn.createdAt).toISOString().split("T")[0]}
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div
                className="
                  flex items-center justify-between
                  sm:justify-end
                  gap-4 sm:gap-6
                  w-full sm:w-auto
                "
              >
                {/* AMOUNT */}
                <p
                  className={`text-base sm:text-lg font-semibold
                  ${
                    txn.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {txn.type === "income" ? "+" : "-"}₹{txn.amount.toFixed(2)}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => onEdit(txn)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(txn._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
