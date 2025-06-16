const productcategories = require("../models/productcategories.model");

module.exports = {
  getAll: (req, res) => {
    productcategories.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    productcategories.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const newData = req.body;
    productcategories.insert(newData, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    productcategories.update(newData, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    productcategories.delete(id, (result) => {
      res.send(result);
    });
  }
};
