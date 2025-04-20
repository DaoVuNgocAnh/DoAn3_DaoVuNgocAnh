const db = require("../common/db");

const orderdetails = (orderdetails) => {
  this.order_detail_id = orderdetails.order_detail_id;
  this.order_id = orderdetails.order_id;
  this.product_id = orderdetails.product_id;
  this.quantity = orderdetails.quantity;
  this.price = orderdetails.price;
};

orderdetails.getByOrderId = (id, callback) => {
  const sqlString = "SELECT * FROM orderdetails WHERE order_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

orderdetails.getAll = (callback) => {
  const sqlString = "SELECT * FROM orderdetails ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

orderdetails.insert = (orderdetails, callBack) => {
  const sqlString = "INSERT INTO orderdetails SET ?";
  db.query(sqlString, orderdetails, (err, res) => {
    if (err) return callBack(err);
    callBack({ order_detail_id: res.insertId, ...orderdetails });
  });
};

orderdetails.update = (orderdetails, id, callBack) => {
  const sqlString = "UPDATE orderdetails SET ? WHERE order_detail_id = ?";
  db.query(sqlString, [orderdetails, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật orderdetails id = " + id + " thành công");
  });
};

orderdetails.delete = (id, callBack) => {
  db.query("DELETE FROM orderdetails WHERE order_detail_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa orderdetails id = " + id + " thành công");
  });
};

module.exports = orderdetails;
