
var express = require('express');
var router = express.Router();
const shippingController = require("../controllers/shipping.controller");

/* Định nghĩa các route */
router.get('/', shippingController.getAll);
router.get('/:id', shippingController.getById);
router.get('/Order/:id', shippingController.getByOrderId);
router.post('/', shippingController.insert);
router.put('/:id', shippingController.updateStatus);
router.delete('/:id', shippingController.delete);

module.exports = router;
