import React from 'react'
import { useEffect, useState } from "react";
import api from "../services/api";
import TransactionForm from "./TransactionForm";
import RecentTransactions from "./RecentTransactions";
import TransactionSummary from './TransactionSummary'
import AnalyticsCharts from './AnalyticsCharts';
import TopCategories from './TopCategories';
import ComparisonInsight from "./ComparisonInsight";
const AnalyticsList = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timeRange, setTimeRange] = useState("month");

    const filterTransactionsByDate = () => {
        const now = new Date();

        return transactions.filter((t) => {
            const txnDate = new Date(t.date);

            if (timeRange === "day") {
                return txnDate.toDateString() === now.toDateString();
            }

            if (timeRange === "week") {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(now.getDate() - 7);
                return txnDate >= oneWeekAgo;
            }

            if (timeRange === "month") {
                return (
                    txnDate.getMonth() === now.getMonth() &&
                    txnDate.getFullYear() === now.getFullYear()
                );
            }

            if (timeRange === "6months") {
                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(now.getMonth() - 6);
                return txnDate >= sixMonthsAgo;
            }

            return true;
        });
    };

    const getPreviousPeriodExpense = () => {
        const now = new Date();

        let start, end;

        if (timeRange === "day") {
            start = new Date(now);
            start.setDate(now.getDate() - 1);
            end = new Date(start);
            end.setHours(23, 59, 59, 999);
        }

        if (timeRange === "week") {
            end = new Date();
            end.setDate(now.getDate() - 7);
            start = new Date(end);
            start.setDate(end.getDate() - 7);
        }

        if (timeRange === "month") {
            start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            end = new Date(now.getFullYear(), now.getMonth(), 0);
        }

        if (timeRange === "6months") {
            start = new Date(now);
            start.setMonth(now.getMonth() - 12);
            end = new Date(now);
            end.setMonth(now.getMonth() - 6);
        }

        return transactions
            .filter(
                (t) =>
                    t.type === "expense" &&
                    new Date(t.date) >= start &&
                    new Date(t.date) <= end
            )
            .reduce((sum, t) => sum + Number(t.amount), 0);
    };




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
        console.log("Edit transaction:", transaction);
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

    const filteredTransactions = filterTransactionsByDate();

    const currentExpenseTotal = filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const previousExpenseTotal = getPreviousPeriodExpense();

    const comparisonLabel =
        timeRange === "day"
            ? "yesterday"
            : timeRange === "week"
                ? "last week"
                : timeRange === "month"
                    ? "last month"
                    : "previous 6 months";




    return (
        <div className='px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 max-w-6xl mx-auto'>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Analytics</h3>

                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="day">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="6months">Last 6 Months</option>
                </select>
            </div>

            <ComparisonInsight
                currentTotal={currentExpenseTotal}
                previousTotal={previousExpenseTotal}
                label={comparisonLabel}
            />


            <TransactionSummary transactions={filteredTransactions} />
            <AnalyticsCharts transactions={filteredTransactions} />
            <TopCategories transactions={filteredTransactions} />

        </div>
    )
}

export default AnalyticsList
