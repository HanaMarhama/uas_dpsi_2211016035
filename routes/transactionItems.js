const express = require("express");
const { TransactionItem } = require("../models");
const router = express.Router();

// Create TransactionItem
router.post("/", async (req, res) => {
  try {
    const transactionItem = await TransactionItem.create(req.body);
    res.status(201).json(transactionItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all TransactionItems
router.get("/", async (req, res) => {
  try {
    const transactionItems = await TransactionItem.findAll();
    res.status(200).json(transactionItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get TransactionItem by ID
router.get("/:id", async (req, res) => {
  try {
    const transactionItem = await TransactionItem.findByPk(req.params.id);
    if (transactionItem) {
      res.status(200).json(transactionItem);
    } else {
      res.status(404).json({ error: "TransactionItem not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update TransactionItem
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await TransactionItem.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedTransactionItem = await TransactionItem.findByPk(
        req.params.id
      );
      res.status(200).json(updatedTransactionItem);
    } else {
      res.status(404).json({ error: "TransactionItem not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete TransactionItem
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await TransactionItem.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: "TransactionItem deleted" });
    } else {
      res.status(404).json({ error: "TransactionItem not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
