
var express = require('express');
var router = express.Router();
const orderdetailsController = require("../controllers/orderdetails.controller");

/* Định nghĩa các route */
router.get('/', orderdetailsController.getAll);
router.get('/:id', orderdetailsController.getById);
router.post('/', orderdetailsController.insert);
router.put('/:id', orderdetailsController.update);
router.delete('/:id', orderdetailsController.delete);

module.exports = router;
