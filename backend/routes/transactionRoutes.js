const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");
const { updateTransaction } = require("../controllers/transactionController");
const { deleteTransaction } = require("../controllers/transactionController");

// add transaction (protected)
router.post("/", protect, addTransaction);

// get all transactions of logged-in user (protected)
router.get("/", protect, getTransactions);

router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
