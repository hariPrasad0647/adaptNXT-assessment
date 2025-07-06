const express = require('express');
const Product = require('../models/products');
const { authenticateToken, authorizeRoles } = require('../authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
  const { page = 1, limit = 10, search = '', category } = req.query;
  const query = {
    name: { $regex: search, $options: 'i' },
    ...(category && { category })
  };
  const products = await Product.find(query).skip((page - 1) * limit).limit(Number(limit));
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;