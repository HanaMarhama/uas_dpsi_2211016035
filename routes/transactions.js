const express = require("express");
const { Transactions } = require("../models");
const router = express.Router();

// Create Transaction
router.post("/", async (req, res) => {
  try {
    const transaction = await Transactions.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transactions.findAll();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Transaction by ID
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transactions.findByPk(req.params.id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Transaction
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Transactions.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedTransaction = await Transactions.findByPk(req.params.id);
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Transaction
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transactions.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: "Transaction deleted" });
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
