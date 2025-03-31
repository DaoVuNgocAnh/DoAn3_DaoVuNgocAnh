var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const cors = require("cors");
const xacthuc = require("./auth.middleware"); // Import middleware JWT

// Cấu hình CORS đúng cách
const corsOptions = {
  origin: "*", // Cho phép tất cả các domain truy cập
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization, Cache-Control", // Thêm Authorization để gửi token
};
router.use(cors(corsOptions)); // Áp dụng CORS cho tất cả các route


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dirtycoins_api",
});

// Kết nối MySQL
connection.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối MySQL: " + err.stack);
    return;
  }
  console.log("✅ Đã kết nối MySQL với ID " + connection.threadId);
});

// Sử dụng middleware xác thực JWT ở các route cần bảo vệ
router.use("/secure-route", xacthuc, (req, res) => {
  res.json({ message: "Bạn đã xác thực thành công!", user: req.user });
});


module.exports = router;
