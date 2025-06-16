
const guest = require("../models/guest.model");

module.exports = {
  getAll: (req, res) => {
    guest.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    guest.getById(id, (result) => {
      res.send(result);
    });
  },


  insert: (req, res) => {
    const newData = req.body;
    guest.insert(newData, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
  
    guest.update(newData, id, (result) => {
      res.send(result);
    });
  },
  

  delete: (req, res) => {
    const id = req.params.id;
    guest.delete(id, (result) => {
      res.send(result);
    });
  },
};
