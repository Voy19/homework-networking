const { oneRowOrNull } = require.main.require('./helpers/db');
const {
  getOrders: getOrdersService,
  getOrder: getOrderService,
  updateOrder: updateOrderService,
  deleteOrder: deleteOrderService,
  getOrdersByStatus: getOrdersByStatusService,
} = require.main.require('./services/orders');

const getOrders = async (_, res) => {
  try {
    const orders = await getOrdersService();
    const modifiedOrders = orders.map((order) => ({
      ...order,
      items: order.items.split(',').map(Number),
    }));
  
    res.send(modifiedOrders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOrdersByStatus = async (req, res) => {
  try {
    const orders = await getOrdersByStatusService(req.query.status);
    const modifiedOrders = orders.map((order) => ({
      ...order,
      items: order.items.split(',').map(Number),
    }));
  
    res.send(modifiedOrders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOrder = async (req, res) => {
  try {
    const result = await getOrderService(Number(req.params.id));
    const order = oneRowOrNull(result);
    if (order) {
      res.send({ ...order, items: order.items.split(',').map(Number) });
    }
    res.send({});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateOrder = async (req, res) => {
  const params = {
    id: Number(req.params.id),
    status: req.body.status,
  }
  try {
    await updateOrderService(params);
    res.send(params);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await deleteOrderService(Number(req.params.id));
    res.send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getOrders,
  getOrdersByStatus,
  getOrder,
  updateOrder,
  deleteOrder,
};