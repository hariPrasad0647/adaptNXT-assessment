const express = require('express');
const Cart = require('../models/cart');
const { authenticateToken } = require('../authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  res.json(cart || { items: [] });
});

router.post('/', authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });
  const item = cart.items.find(i => i.productId.toString() === productId);
  if (item) item.quantity += quantity;
  else cart.items.push({ productId, quantity });
  await cart.save();
  res.json(cart);
});

router.put('/:itemId', authenticateToken, async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });
  const item = cart.items.id(req.params.itemId);
  item.quantity = quantity;
  await cart.save();
  res.json(cart);
});

router.delete('/:itemId', authenticateToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  cart.items.id(req.params.itemId).remove();
  await cart.save();
  res.json(cart);
});

module.exports = router;