const db = require.main.require('./db');

const createUser = async ({
  firstName,
  lastName,
  role,
  country,
  address,
  zipCode,
}) => {
  await db.query(`INSERT INTO users (
    firstName,
    lastName,
    role,
    country,
    address,
    zipCode
  ) VALUES (?,?,?,?,?,?)`, [
    firstName,
    lastName,
    role,
    country,
    address,
    zipCode,
  ]);

  return await db.query('SELECT LAST_INSERT_ROWID() AS id');
};

const updateUser = ({
  id,
  firstName,
  lastName,
  role,
  country,
  address,
  zipCode,
}) => db.query(`
  UPDATE users
  SET firstName = ?,
    lastName = ?,
    role = ?,
    country = ?,
    address = ?,
    zipCode = ?
  WHERE id = ?`, [
    firstName,
    lastName,
    role,
    country,
    address,
    zipCode,
    id,
  ]);

const deleteUser = (id) => db.query('DELETE FROM users WHERE id = ?', [id]);

const getUsers = () => db.query('SELECT id, firstName, lastName, role FROM users', []);

const getUser = (id) => db.query(`
  SELECT
    id,
    firstName,
    lastName,
    role
  FROM users
  WHERE id = ?`, [id]);

const getUserShippingAddress = (id) => db.query(`
  SELECT
    country,
    address,
    zipCode
  FROM users
  WHERE id = ?`, [id]);

const getUserOrders = (userId) => db.query('SELECT * FROM orders WHERE userId = ?', [userId]);

const getUserOrdersByStatus = (userId, status) => db.query(`
  SELECT *
  FROM orders
  WHERE userId = ?
    AND status = ?`, [userId, status]);

const createOrder = async ({ userId, items }) => {
  await db.query(`INSERT INTO orders (userId, items, status) VALUES (?,?,?)`, [
    userId,
    items,
    'PENDING',
  ]);

  return await db.query('SELECT LAST_INSERT_ROWID() AS id');
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  getUserShippingAddress,
  getUserOrders,
  getUserOrdersByStatus,
  createOrder,
};
