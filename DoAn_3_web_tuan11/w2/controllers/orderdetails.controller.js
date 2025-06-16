const orderdetails = require("../models/orderdetails.model");

module.exports = {
  getAll: (req, res) => {
    orderdetails.getAll((result) => {
      res.send(result);
    });
  },

  getByOrderId: (req, res) => {
    const id = req.params.id;
    orderdetails.getByOrderId(id, (result) => {
      res.send(result);
    });
  },

  getByProductIdAndSize: (req, res) => {
    const productId = req.params.productId;
    const size = req.params.size;
    orderdetails.getByProductIdAndSize(productId, size, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const newData = req.body;
    orderdetails.insert(newData, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    orderdetails.update(newData, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    orderdetails.delete(id, (result) => {
      res.send(result);
    });
  }
};
