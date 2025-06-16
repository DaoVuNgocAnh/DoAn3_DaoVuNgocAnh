const orders = require("../models/orders.model");

module.exports = {
  getAll: (req, res) => {
    orders.getAll((result) => {
      res.send(result);
    });
  },

  getTotal: (req, res) => {
    orders.getTotal((err, total) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ total });
    });
  },
  
  getTotalAmount: (req, res) => {
    orders.getTotalAmount((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    orders.getById(id, (result) => {
      res.send(result);
    });
  },

  getByUserId: (req, res) => {
    const id = req.params.id;
    orders.getByUserId(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const newData = req.body;
    orders.insert(newData, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    orders.update(newData, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    orders.delete(id, (result) => {
      res.send(result);
    });
  }
};
