const jwt = require("jsonwebtoken");
const users = require("../models/users.model");

const SECRET_KEY = "my_super_secret_key_123"; // Khóa bí mật JWT

module.exports = {
  getAll: (req, res) => {
    users.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    users.getById(id, (result) => {
      res.send(result);
    });
  },

  getByUsernamePass: (req, res) => {
    const { username, password } = req.body;

    users.getByUsernamePass(username, password, (result) => {
      if (result) {
        // Tạo JWT token khi đăng nhập thành công
        const token = jwt.sign(
          { user_id: result.user_id, fullname: result.fullname, username: result.username, email: result.email, phone_number: result.phone_number, image_user: result.image_user },
          SECRET_KEY,
          { expiresIn: "1h" } // Token hết hạn sau 1 giờ
        );

        res.json({ message: "Đăng nhập thành công", token });
      } else {
        res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
      }
    });
  },

  insert: (req, res) => {
    const newData = req.body;
    users.insert(newData, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const newData = req.body;
    const id = req.params.id;
  
    // Kiểm tra xem user đang đăng nhập có đúng là chủ tài khoản không
    if (req.user.user_id !== parseInt(id)) {
      return res.status(403).json({ message: "Forbidden - Bạn không có quyền cập nhật tài khoản này" });
    }
  
    users.update(newData, id, (result) => {
      res.send(result);
    });
  },
  

  delete: (req, res) => {
    const id = req.params.id;
    users.delete(id, (result) => {
      res.send(result);
    });
  },
};
