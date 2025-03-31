const db = require("../common/db");

const shipping = (shipping) => {
  this.shipping_id = shipping.shipping_id;
  this.order_id = shipping.order_id;
  this.shipping_address = shipping.shipping_address;
  this.shipping_status = shipping.shipping_status;
};

shipping.getById = (id, callback) => {
  const sqlString = "SELECT * FROM shipping WHERE shipping_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

shipping.getAll = (callback) => {
  const sqlString = "SELECT * FROM shipping ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

shipping.insert = (shipping, callBack) => {
  const sqlString = "INSERT INTO shipping SET ?";
  db.query(sqlString, shipping, (err, res) => {
    if (err) return callBack(err);
    callBack({ shipping_id: res.insertId, ...shipping });
  });
};

shipping.update = (shipping, id, callBack) => {
  const sqlString = "UPDATE shipping SET ? WHERE shipping_id = ?";
  db.query(sqlString, [shipping, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật shipping id = " + id + " thành công");
  });
};

shipping.delete = (id, callBack) => {
  db.query("DELETE FROM shipping WHERE shipping_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa shipping id = " + id + " thành công");
  });
};

module.exports = shipping;
