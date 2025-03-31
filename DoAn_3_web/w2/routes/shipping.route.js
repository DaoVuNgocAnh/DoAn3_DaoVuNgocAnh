
var express = require('express');
var router = express.Router();
const shippingController = require("../controllers/shipping.controller");

/* Định nghĩa các route */
router.get('/', shippingController.getAll);
router.get('/:id', shippingController.getById);
router.post('/', shippingController.insert);
router.put('/:id', shippingController.update);
router.delete('/:id', shippingController.delete);

module.exports = router;
