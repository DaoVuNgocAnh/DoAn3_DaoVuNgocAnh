const shipping = require("../models/shipping.model");

module.exports = {
  getAll: (req, res) => {
    shipping.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    shipping.getById(id, (result) => {
      res.send(result);
    });
  },

  getByOrderId: (req, res) => {
    const id = req.params.id;
    shipping.getByOrderId(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const newData = req.body;
    shipping.insert(newData, (result) => {
      res.send(result);
    });
  },

  updateStatus: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    shipping.updateStatus(newData, id, (result) => {
      res.send(result);
    });
  },
  

  delete: (req, res) => {
    const id = req.params.id;
    shipping.delete(id, (result) => {
      res.send(result);
    });
  }
};
