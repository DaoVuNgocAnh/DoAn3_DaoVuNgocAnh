
var express = require('express');
var router = express.Router();
const paymentsController = require("../controllers/payments.controller");

/* Định nghĩa các route */
router.get('/', paymentsController.getAll);
router.get('/:id', paymentsController.getById);
router.post('/', paymentsController.insert);
router.put('/:id', paymentsController.update);
router.delete('/:id', paymentsController.delete);

module.exports = router;
