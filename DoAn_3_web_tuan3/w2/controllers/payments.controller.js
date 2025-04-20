const payments = require("../models/payments.model");

module.exports = {
  getAll: (req, res) => {
    payments.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    payments.getById(id, (result) => {
      res.send(result);
    });
  },

  getByOrderId: (req, res) => {
    const id = req.params.id;
    payments.getByOrderId(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const newData = req.body;
    payments.insert(newData, (result) => {
      res.send(result);
    });
  },

  updateStatus: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    payments.updateStatus(newData, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    payments.delete(id, (result) => {
      res.send(result);
    });
  }
};
