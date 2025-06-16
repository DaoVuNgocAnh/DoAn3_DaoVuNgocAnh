const db = require("../common/db");

const products = (products) => {
  this.product_id = products.product_id;
  this.category_id = products.category_id;
  this.product_name = products.product_name;
  this.description = products.description;
  this.price = products.price;
  this.image_url = products.image_url;
};

products.getById = (id, callback) => {
  const sqlString = "SELECT * FROM products WHERE product_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

products.getByCategoryId = (id, callback) => {
  const sqlString = "SELECT * FROM products WHERE category_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

products.getAll = (callback) => {
  const sqlString = "SELECT * FROM products ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

products.insert = (products, callBack) => {
  const sqlString = "INSERT INTO products SET ?";
  db.query(sqlString, products, (err, res) => {
    if (err) return callBack(err);
    callBack({ product_id: res.insertId, ...products });
  });
};

products.update = (products, id, callBack) => {
  const sqlString = "UPDATE products SET ? WHERE product_id = ?";
  db.query(sqlString, [products, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật products id = " + id + " thành công");
  });
};

products.delete = (id, callBack) => {
  db.query("DELETE FROM products WHERE product_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa products id = " + id + " thành công");
  });
};

module.exports = products;
