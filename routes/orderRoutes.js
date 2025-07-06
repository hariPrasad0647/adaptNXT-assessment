const express = require('express');
const Order = require('../models/order');
const Cart = require('../models/cart');
const { authenticateToken } = require('../authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  if (!cart || !cart.items.length) return res.status(400).json({ error: 'Cart is empty' });

  const totalAmount = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  const order = new Order({ userId: req.user.id, items: cart.items, totalAmount });
  await order.save();

  cart.items = [];
  await cart.save();
  res.status(201).json(order);
});

router.get('/', authenticateToken, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
  res.json(orders);
});

module.exports = router;