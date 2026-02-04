const Transaction = require("../models/Transaction");

// ADD TRANSACTION
const addTransaction = async (req, res) => {
  try {
    // 1. Get data from request body
    const { type, category, amount, description, date } = req.body;

    // 2. Validation
    if (!type || !category || !amount) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // 3. Create transaction linked to logged-in user
    const transaction = await Transaction.create({
      user: req.user.id, // 👈 comes from JWT middleware
      type,
      category,
      amount,
      description,
      date,
    });

    // 4. Send response
    res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add transaction",
      error: error.message,
    });
  }
};

// GET ALL TRANSACTIONS OF LOGGED-IN USER
const getTransactions = async (req, res) => {
  try {
    // 1. Find transactions of current user
    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ date: -1 });

    // 2. Send response
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

// UPDATE TRANSACTION
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, description, date } = req.body;

    // 1. Find transaction
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // 2. Check ownership
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // 3. Update fields
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.amount = amount || transaction.amount;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;

    // 4. Save updated transaction
    const updatedTransaction = await transaction.save();

    res.status(200).json({
      message: "Transaction updated successfully",
      updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update transaction",
      error: error.message,
    });
  }
};


// DELETE TRANSACTION
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // ownership check
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
};



module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
