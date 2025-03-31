const db = require("../common/db");

const orders = (orders) => {
  this.order_id = orders.order_id;
  this.user_id = orders.user_id;
  this.order_date = orders.order_date;
  this.total_amount = orders.total_amount;
  this.status = orders.status;
};

orders.getById = (id, callback) => {
  const sqlString = "SELECT * FROM orders WHERE order_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

orders.getAll = (callback) => {
  const sqlString = "SELECT * FROM orders ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

orders.insert = (orders, callBack) => {
  const sqlString = "INSERT INTO orders SET ?";
  db.query(sqlString, orders, (err, res) => {
    if (err) return callBack(err);
    callBack({ order_id: res.insertId, ...orders });
  });
};

orders.update = (orders, id, callBack) => {
  const sqlString = "UPDATE orders SET ? WHERE order_id = ?";
  db.query(sqlString, [orders, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật orders id = " + id + " thành công");
  });
};

orders.delete = (id, callBack) => {
  db.query("DELETE FROM orders WHERE order_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa orders id = " + id + " thành công");
  });
};

module.exports = orders;
