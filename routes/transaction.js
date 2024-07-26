const express = require("express");
const router = express.Router();
const db = require("../models");
const authenticateToken = require("../middleware/authenticateToken");

// Rute GET untuk mendapatkan daftar transaksi
router.get("/", authenticateToken, async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll({
      include: [db.TransactionItem], // Include TransactionItems for detailed info
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

// Rute POST untuk mencatat transaksi baru
router.post("/", authenticateToken, async (req, res) => {
  const { totalAmount, tax, discount, items } = req.body;

  // Validasi input
  if (
    typeof totalAmount !== "number" ||
    typeof tax !== "number" ||
    typeof discount !== "number" ||
    !Array.isArray(items)
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    // Mulai transaksi untuk memastikan atomicity
    const result = await db.sequelize.transaction(async (t) => {
      // Membuat transaksi baru
      const transaction = await db.Transaction.create(
        {
          totalAmount,
          tax,
          discount,
        },
        { transaction: t }
      );

      // Membuat item transaksi
      for (const item of items) {
        if (
          !item.productId ||
          typeof item.quantity !== "number" ||
          typeof item.price !== "number"
        ) {
          throw new Error("Invalid item data");
        }
        await db.TransactionItem.create(
          {
            transactionId: transaction.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
          { transaction: t }
        );
      }

      return transaction;
    });

    res.status(201).json({
      message: "Transaction recorded successfully",
      transaction: result,
    });
  } catch (error) {
    console.error("Error recording transaction:", error);
    res.status(500).json({ message: "Error recording transaction" });
  }
});

module.exports = router;
