const db = require("../common/db");

const guest = (guest) => {
  this.guest_id = guest.guest_id;
  this.email = guest.email;
  this.fullname = guest.fullname;  
  this.phone_number = guest.phone_number;
  this.address = guest.address;
};

guest.getById = (id, callback) => {
  const sqlString = "SELECT guest_id, email, fullname, phone_number, address FROM guest WHERE guest_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};


guest.getAll = (callback) => {
  const sqlString = "SELECT * FROM guest ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};


guest.insert = (guest, callBack) => {
  const sqlString = "INSERT INTO guest SET ?";
  db.query(sqlString, guest, (err, res) => {
    if (err) return callBack(err);
    callBack({ guest_id: res.insertId, ...guest });
  });
};

guest.update = (guest, id, callBack) => {
  const sqlString = "UPDATE guest SET ? WHERE guest_id = ?";
  db.query(sqlString, [guest, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật guest id = " + id + " thành công");
  });
};

guest.delete = (id, callBack) => {
  db.query("DELETE FROM guest WHERE guest_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa guest id = " + id + " thành công");
  });
};

module.exports = guest;
