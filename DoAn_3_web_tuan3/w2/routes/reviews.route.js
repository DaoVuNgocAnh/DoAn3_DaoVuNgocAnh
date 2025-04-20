
var express = require('express');
var router = express.Router();
const reviewsController = require("../controllers/reviews.controller");

/* Định nghĩa các route */
router.get('/', reviewsController.getAll);
router.get('/:id', reviewsController.getById);
router.get('/Product/:id', reviewsController.getByProductId);
router.post('/', reviewsController.insert);
router.put('/:id', reviewsController.update);
router.delete('/:id', reviewsController.delete);

module.exports = router;
