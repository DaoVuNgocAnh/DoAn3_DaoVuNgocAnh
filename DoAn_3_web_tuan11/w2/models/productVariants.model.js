const db = require("../common/db");

const productVariants = (productVariants) => {
  this.variant_id = productVariants.product_id;
  this.product_id = productVariants.product_id;
  this.size = productVariants.size;
  this.stock = productVariants.stock;
};

productVariants.getByProductId = (product_id, callback) => {
  const sql = "SELECT * FROM product_variants WHERE product_id = ?";
  db.query(sql, product_id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

productVariants.getOne = (product_id, size, callback) => {
  const sql = "SELECT * FROM product_variants WHERE product_id = ? AND size = ?";
  db.query(sql, [product_id, size], (err, result) => {
    if (err) return callback(err);
    callback(result[0]);
  });
};

productVariants.insert = (variant, callback) => {
  const allowedSizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  // Kiểm tra size có hợp lệ không
  if (!allowedSizes.includes(variant.size)) {
    return callback({ error: "Size không hợp lệ. Chỉ được phép XS, S, M, L, XL." });
  }

  const sql = "INSERT INTO product_variants SET ?";
  db.query(sql, variant, (err, res) => {
    if (err) return callback(err);
    callback({ variant_id: res.insertId, ...variant });
  });
};


productVariants.updateStock = (product_id, size, stock, callback) => {
  const sql = "UPDATE product_variants SET stock = ? WHERE product_id = ? AND size = ?";
  db.query(sql, [stock, product_id, size], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật stock thành công");
  });
};

productVariants.delete = (variant_id, callback) => {
  const sql = "DELETE FROM product_variants WHERE variant_id = ?";
  db.query(sql, [variant_id], (err, res) => {
    if (err) return callback(err);
    callback("Xoá biến thể thành công");
  });
};

module.exports = productVariants;
