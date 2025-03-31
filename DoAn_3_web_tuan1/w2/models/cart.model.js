const db = require("../common/db");

const cart = (cart) => {
  this.cart_id = cart.cart_id;
  this.user_id = cart.user_id;
  this.product_id = cart.product_id;
  this.quantity = cart.quantity;
};

cart.getById = (id, callback) => {
  const sqlString = "SELECT * FROM cart WHERE cart_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

cart.getAll = (callback) => {
  const sqlString = "SELECT * FROM cart ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

cart.insert = (cart, callBack) => {
  const sqlString = "INSERT INTO cart SET ?";
  db.query(sqlString, cart, (err, res) => {
    if (err) return callBack(err);
    callBack({ cart_id: res.insertId, ...cart });
  });
};

cart.update = (cart, id, callBack) => {
  const sqlString = "UPDATE cart SET ? WHERE cart_id = ?";
  db.query(sqlString, [cart, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật cart id = " + id + " thành công");
  });
};

cart.delete = (id, callBack) => {
  db.query("DELETE FROM cart WHERE cart_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa cart id = " + id + " thành công");
  });
};

module.exports = cart;
