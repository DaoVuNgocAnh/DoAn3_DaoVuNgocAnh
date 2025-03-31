import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function SignIn() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone_number: "",
    role: "user",
  });
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        // ✅ Lưu token vào localStorage (hoặc sessionStorage)
        localStorage.setItem("token", data.token); // Hoặc sessionStorage.setItem("token", data.token);

        setMessage({ type: "success", text: "Đăng nhập thành công!" });

        setTimeout(() => {
          window.location.href = "/"; // Chuyển hướng sau khi đăng nhập
        }, 1000);
      } else {
        setMessage({ type: "danger", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Lỗi kết nối đến server!" });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/Users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: "Đăng ký thành công!" });
        setTimeout(() => {
          window.location.href = "/sign_in"; // Chuyển hướng sau khi đăng nhập
        }, 1000);
      } else {
        setMessage({ type: "danger", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Lỗi kết nối đến server!" });
    }
  };

  return (
    <Container className="signin-container mt-5">
      <Row>
        <Col lg={6} md={6} sm={12} className="login-section">
          <h2>Đăng nhập</h2>
          {message && <Alert variant={message.type}>{message.text}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>Tài khoản</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tài khoản"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Đăng nhập
            </Button>
          </Form>
        </Col>

        <Col lg={6} md={6} sm={12} className="register-section">
          <h2>Đăng ký</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formRegisterName">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={registerData.fullname}
                onChange={(e) => setRegisterData({ ...registerData, fullname: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterUserName">
              <Form.Label>Tài khoản</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tài khoản"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterPhoneNumber">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Nhập số điện thoại"
                pattern="[0-9]{10,11}"
                value={registerData.phone_number}
                onChange={(e) => setRegisterData({ ...registerData, phone_number: e.target.value.replace(/[^0-9]/g, "") })}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Đăng ký
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
