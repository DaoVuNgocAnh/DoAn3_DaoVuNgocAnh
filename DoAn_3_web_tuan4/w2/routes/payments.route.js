
var express = require('express');
var router = express.Router();
const paymentsController = require("../controllers/payments.controller");

/* Định nghĩa các route */
router.get('/', paymentsController.getAll);
router.get('/:id', paymentsController.getById);
router.get('/Order/:id', paymentsController.getByOrderId);
router.post('/', paymentsController.insert);
router.put('/:id', paymentsController.updateStatus);
router.delete('/:id', paymentsController.delete);

module.exports = router;
