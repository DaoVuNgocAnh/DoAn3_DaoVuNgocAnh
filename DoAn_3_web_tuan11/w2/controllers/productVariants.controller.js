const productVariants = require("../models/productVariants.model");

module.exports = {
  // Lấy tất cả size của một sản phẩm theo product_id
  getByProductId: (req, res) => {
    const productId = req.params.productId;
    productVariants.getByProductId(productId, (result) => {
      res.send(result);
    });
  },

  // Lấy một biến thể cụ thể theo product_id và size
  getOne: (req, res) => {
    const productId = req.params.productId;
    const size = req.params.size;
    productVariants.getOne(productId, size, (result) => {
      res.send(result);
    });
  },

  // Thêm mới một biến thể sản phẩm (product_id + size + stock)
  insert: (req, res) => {
    const newData = req.body; // { product_id, size, stock }
    productVariants.insert(newData, (result) => {
      res.send(result);
    });
  },

  // Cập nhật số lượng stock theo product_id và size
  updateStock: (req, res) => {
    const { stock } = req.body;
    const { productId, size } = req.params;
    productVariants.updateStock(productId, size, stock, (result) => {
      res.send(result);
    });
  },

  // Xóa một biến thể theo variant_id
  delete: (req, res) => {
    const { variantId } = req.params;
    productVariants.delete(variantId, (result) => {
      res.send(result);
    });
  }
};
