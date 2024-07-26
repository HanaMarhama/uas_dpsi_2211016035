const express = require("express");
const router = express.Router();
const db = require("../models");
const authenticateToken = require("../middleware/authenticateToken");

// Rute GET untuk mendapatkan daftar transaksi
router.get("/", authenticateToken, async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

// Rute POST untuk mencatat transaksi baru
router.post("/", authenticateToken, async (req, res) => {
  const { totalAmount, tax, discount, items } = req.body;
  try {
    const transaction = await db.Transaction.create({
      totalAmount,
      tax,
      discount,
    });
    for (const item of items) {
      await db.TransactionItem.create({
        transactionId: transaction.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }
    res
      .status(201)
      .json({ message: "Transaction recorded successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error recording transaction" });
  }
});

module.exports = router;
