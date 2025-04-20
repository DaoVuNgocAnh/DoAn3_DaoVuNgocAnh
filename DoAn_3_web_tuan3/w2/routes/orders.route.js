
var express = require('express');
var router = express.Router();
const ordersController = require("../controllers/orders.controller");

/* Định nghĩa các route */
router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getById);
router.get('/User/:id', ordersController.getByUserId);
router.post('/', ordersController.insert);
router.put('/:id', ordersController.update);
router.delete('/:id', ordersController.delete);

module.exports = router;
