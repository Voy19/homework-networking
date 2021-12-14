const { oneRowOrNull } = require.main.require('./helpers/db');
const {
  createUser: createUserService,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
  getUsers: getUsersService,
  getUser: getUserService,
  getUserShippingAddress: getUserShippingAddressService,
  getUserOrders: getUserOrdersService,
  getUserOrdersByStatus: getUserOrdersByStatusService,
  createOrder: createOrderService,
} = require.main.require('./services/users');

const createUser = async (req, res) => {
  const params = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    country: req.body.country,
    address: req.body.address,
    zipCode: req.body.zipCode,
  };

  try {
    const result = await createUserService(params);
    res.send({
      ...params,
      id: oneRowOrNull(result).id,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const params = {
    id: Number(req.params.id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    country: req.body.country,
    address: req.body.address,
    zipCode: req.body.zipCode,
  };

  try {
    await updateUserService(params);
    res.send(params);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await deleteUserService(Number(req.params.id));
    res.send();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getUsers = async (_, res) => {
  try {
    const result = await getUsersService();
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const result = await getUserService(Number(req.params.id));
    res.send(oneRowOrNull(result));
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getUserShippingAddress = async (req, res) => {
  try {
    const result = await getUserShippingAddressService(Number(req.params.id));
    res.send(oneRowOrNull(result));
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await getUserOrdersService(Number(req.params.id));
    const modifiedOrders = orders.map((order) => ({
      ...order,
      items: order.items.split(',').map(Number),
    }));

    res.send(modifiedOrders);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getUserOrdersByStatus = async (req, res) => {
  try {
    const orders = await getUserOrdersByStatusService(
      Number(req.params.id),
      req.query.status,
    );

    const modifiedOrders = orders.map((order) => ({
      ...order,
      items: order.items.split(',').map(Number),
    }));

    res.send(modifiedOrders);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const createOrder = async (req, res) => {
  const params = {
    userId: Number(req.params.id),
    items: req.body.items,
  };

  try {
    const result = await createOrderService(params);
    res.send({
      ...params,
      id: oneRowOrNull(result).id,
      status: 'PENDING',
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
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
