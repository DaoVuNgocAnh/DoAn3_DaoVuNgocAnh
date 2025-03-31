const db = require("../common/db");

const users = (users) => {
  this.user_id = users.user_id;
  this.username = users.username;
  this.password = users.password;
  this.email = users.email;
  this.phone_number = users.phone_number;
  this.role = users.role;
};

users.getById = (id, callback) => {
  const sqlString = "SELECT user_id, fullname, username, email, phone_number, image_user FROM users WHERE user_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

users.getAll = (callback) => {
  const sqlString = "SELECT * FROM users ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

users.getByUsernamePass = (username, password, callback) => {
  const sqlString = "SELECT user_id, fullname, username, email, phone_number, image_user FROM users WHERE username = ? AND password = ?";
  db.query(sqlString, [username, password], (err, result) => {
    if (err) return callback(err);
    
    if (result.length > 0) {
      callback(result[0]); // Trả về thông tin người dùng (chỉ 1 user)
    } else {
      callback(null); // Sai tài khoản hoặc mật khẩu
    }
  });
};

users.insert = (users, callBack) => {
  const sqlString = "INSERT INTO users SET ?";
  db.query(sqlString, users, (err, res) => {
    if (err) return callBack(err);
    callBack({ user_id: res.insertId, ...users });
  });
};

users.update = (users, id, callBack) => {
  const sqlString = "UPDATE users SET ? WHERE user_id = ?";
  db.query(sqlString, [users, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật users id = " + id + " thành công");
  });
};

users.delete = (id, callBack) => {
  db.query("DELETE FROM users WHERE user_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa users id = " + id + " thành công");
  });
};

module.exports = users;
