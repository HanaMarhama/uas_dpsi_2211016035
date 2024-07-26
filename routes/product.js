const express = require("express");
const router = express.Router();
const db = require("../models");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST create a new product
router.post("/", async (req, res) => {
  const { name, category, code, price } = req.body;

  // Simple validation
  if (!name || !code || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const product = await db.Product.create({ name, category, code, price });
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ error: "Failed to create product" });
  }
});

// PUT update a product by ID
router.put("/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(400).json({ error: "Failed to update product" });
  }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(400).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
