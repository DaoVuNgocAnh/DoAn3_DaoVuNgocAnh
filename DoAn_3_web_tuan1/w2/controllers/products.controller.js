const products = require("../models/products.model");

module.exports = {
  getAll: (req, res) => {
    products.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    products.getById(id, (result) => {
      res.send(result);
    });
  },

  getByCategoryId: (req, res) => {
    const id = req.params.id;
    products.getByCategoryId(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const newData = req.body;
    products.insert(newData, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    products.update(newData, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    products.delete(id, (result) => {
      res.send(result);
    });
  }
};
