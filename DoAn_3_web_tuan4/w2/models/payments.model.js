const db = require("../common/db");

const payments = (payments) => {
  this.payment_id = payments.payment_id;
  this.order_id = payments.order_id;
  this.payment_date = payments.payment_date;
  this.payment_method = payments.payment_method;
  this.payment_status = payments.payment_status;
};

payments.getById = (id, callback) => {
  const sqlString = "SELECT * FROM payments WHERE payment_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

payments.getByOrderId = (id, callback) => {
  const sqlString = "SELECT * FROM payments WHERE order_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

payments.getAll = (callback) => {
  const sqlString = "SELECT * FROM payments ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

payments.insert = (payments, callBack) => {
  const sqlString = "INSERT INTO payments SET ?";
  db.query(sqlString, payments, (err, res) => {
    if (err) return callBack(err);
    callBack({ payment_id: res.insertId, ...payments });
  });
};

payments.updateStatus = (payments, id, callBack) => {
  const sqlString = "UPDATE payments SET ? WHERE order_id = ?";
  db.query(sqlString, [payments, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật payments id = " + id + " thành công");
  });
};

payments.delete = (id, callBack) => {
  db.query("DELETE FROM payments WHERE payment_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa payments id = " + id + " thành công");
  });
};

module.exports = payments;
