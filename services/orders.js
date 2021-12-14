const db = require.main.require('./db');

const getOrders = () => db.query('SELECT * FROM orders');

const getOrdersByStatus = (status) => db.query('SELECT * FROM orders WHERE status = ?', [status]);

const getOrder = (id) => db.query('SELECT * FROM orders where id = ?', [id]);

const updateOrder = ({ id, status }) => db.query(`
  UPDATE orders
  SET status = ?,
  WHERE id = ?`, [status, id]);

const deleteOrder = (id) => db.query('DELETE FROM orders WHERE id = ?', [id]);

module.exports = {
  getOrders,
  getOrdersByStatus,
  getOrder,
  updateOrder,
  deleteOrder,
};
