const db = require("../common/db");

const reviews = (reviews) => {
  this.review_id = reviews.review_id;
  this.product_id = reviews.product_id;
  this.user_id = reviews.user_id;
  this.rating = reviews.rating;
  this.comment = reviews.comment;
  this.review_date = reviews.review_date;
};

reviews.getById = (id, callback) => {
  const sqlString = "SELECT * FROM reviews WHERE review_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

reviews.getAll = (callback) => {
  const sqlString = "SELECT * FROM reviews ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

reviews.insert = (reviews, callBack) => {
  const sqlString = "INSERT INTO reviews SET ?";
  db.query(sqlString, reviews, (err, res) => {
    if (err) return callBack(err);
    callBack({ review_id: res.insertId, ...reviews });
  });
};

reviews.update = (reviews, id, callBack) => {
  const sqlString = "UPDATE reviews SET ? WHERE review_id = ?";
  db.query(sqlString, [reviews, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật reviews id = " + id + " thành công");
  });
};

reviews.delete = (id, callBack) => {
  db.query("DELETE FROM reviews WHERE review_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa reviews id = " + id + " thành công");
  });
};

module.exports = reviews;
