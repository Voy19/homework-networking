const express = require('express');

const router = express.Router();
const {
  getOrders,
  getOrdersByStatus,
  getOrder,
  updateOrder,
  deleteOrder,
} = require.main.require('./controllers/orders');

router.get('/', getOrders);
router.get('/status', getOrdersByStatus);
router.get('/:id', getOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
