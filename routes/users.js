const express = require('express');

const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  getUserShippingAddress,
  getUserOrders,
  createOrder,
  getUserOrdersByStatus,
} = require.main.require('./controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/shipping-address', getUserShippingAddress);
router.get('/:id/orders', getUserOrders);
router.post('/:id/orders', createOrder);
router.get('/:id/orders/status', getUserOrdersByStatus);

module.exports = router;
