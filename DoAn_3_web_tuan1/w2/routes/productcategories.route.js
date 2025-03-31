
var express = require('express');
var router = express.Router();
const productcategoriesController = require("../controllers/productcategories.controller");
/* GET users listing. */
router.get('/', productcategoriesController.getAll);
router.get('/:id', productcategoriesController.getById);
router.post('/', productcategoriesController.insert);
router.put('/:id', productcategoriesController.update);
router.delete('/:id', productcategoriesController.delete); 

module.exports = router;
