import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#7c3aed"];

function AnalyticsCharts({ transactions }) {
    // totals
    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    // bar chart data
    const barData = [
        { name: "Income", amount: totalIncome },
        { name: "Expense", amount: totalExpense },
    ];

    // pie chart data
    const categoryMap = {};
    transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            categoryMap[t.category] =
                (categoryMap[t.category] || 0) + Number(t.amount);
        });

    const pieData = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
    }));

    if (transactions.length === 0) {
        return (
            <p className="text-center text-gray-500 mt-10">
                No data available for analytics
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

            {/* Income vs Expense */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold mb-4">Income vs Expense</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" barSize={60}>
                            {barData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.name === "Income" ? "#16a34a" : "#dc2626"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Expense by Category */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold mb-4">Expense by Category</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {pieData.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default AnalyticsCharts;
