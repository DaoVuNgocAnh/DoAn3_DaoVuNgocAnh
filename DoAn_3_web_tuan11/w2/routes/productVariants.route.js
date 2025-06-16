const express = require("express");
const router = express.Router();
const variantController = require("../controllers/productVariants.controller");

router.get("/product/:productId", variantController.getByProductId);
router.get("/:productId/:size", variantController.getOne);
router.post("/", variantController.insert);
router.put("/:productId/:size", variantController.updateStock);
router.delete("/:variantId", variantController.delete);

module.exports = router;
