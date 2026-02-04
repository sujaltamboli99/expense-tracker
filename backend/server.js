const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");



const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running 🚀");
});

// Server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
