const reviews = require("../models/reviews.model");

module.exports = {
  getAll: (req, res) => {
    reviews.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    reviews.getById(id, (result) => {
      res.send(result);
    });
  },

  getByProductId: (req, res) => {
    const id = req.params.id;
    reviews.getByProductId(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const newData = req.body;
    reviews.insert(newData, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    reviews.update(newData, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    reviews.delete(id, (result) => {
      res.send(result);
    });
  }
};
