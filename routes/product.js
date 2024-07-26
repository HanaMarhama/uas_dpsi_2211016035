const express = require("express");
const router = express.Router();
const db = require("../models");
const { authenticateUser, authorizeRole } = require("../middleware/auth"); // Middleware untuk otentikasi dan otorisasi

// GET all products
router.get("/", authenticateUser, async (req, res) => {
  // Hanya pengguna yang terotentikasi yang dapat mengakses
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new product
router.post("/", authenticateUser, authorizeRole("admin"), async (req, res) => {
  // Hanya pengguna dengan peran "admin" yang dapat membuat produk baru
  try {
    const product = await db.Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a product by ID
router.put("/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  // Hanya pengguna dengan peran "admin" yang dapat memperbarui produk
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a product by ID
router.delete("/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  // Hanya pengguna dengan peran "admin" yang dapat menghapus produk
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
