const jwt = require("jsonwebtoken");

const SECRET_KEY = "my_super_secret_key_123"; // Khóa bí mật JWT

// Middleware xác thực JWT
const xacthuc = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res.status(401).json({ error: "Bạn chưa đăng nhập!" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token không hợp lệ!" });
    }
    req.user = user; // Lưu thông tin user vào request
    next();
  });
};

module.exports = xacthuc; // Xuất middleware để sử dụng lại
