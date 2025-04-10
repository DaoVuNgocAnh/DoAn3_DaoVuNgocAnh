const db = require("../common/db");

const productcategories = (productcategories) => {
  this.category_id = productcategories.category_id;
  this.category_name = productcategories.category_name;
  this.category_description = productcategories.category_description;
};

productcategories.getById = (id, callback) => {
  const sqlString = "SELECT * FROM productcategories WHERE category_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

productcategories.getAll = (callback) => {
  const sqlString = "SELECT * FROM productcategories ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

productcategories.insert = (productcategories, callBack) => {
  const sqlString = "INSERT INTO productcategories SET ?";
  db.query(sqlString, productcategories, (err, res) => {
    if (err) return callBack(err);
    callBack({ category_id: res.insertId, ...productcategories });
  });
};

productcategories.update = (productcategories, id, callBack) => {
  const sqlString = "UPDATE productcategories SET ? WHERE category_id = ?";
  db.query(sqlString, [productcategories, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật productcategories id = " + id + " thành công");
  });
};

productcategories.delete = (id, callBack) => {
  db.query("DELETE FROM productcategories WHERE category_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa productcategories id = " + id + " thành công");
  });
};

module.exports = productcategories;
