import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Phone, MapPin, Mail } from "lucide-react";
import emailjs from "@emailjs/browser"; // Import EmailJS
import { jwtDecode } from "jwt-decode";
import "./Contact.css";

const storeBranches = [
  {
    city: "Hồ Chí Minh",
    stores: [
      "Tầng 2 TTTM Vincom Mega Mall Vinhomes Grand Park, Quận 9, TP. Thủ Đức",
      "160 Nguyễn Cư Trinh, Phường Nguyễn Cư Trinh, Quận 1",
      "561 Sư Vạn Hạnh, Phường 13, Quận 10",
      "The New Playground 26 Lý Tự Trọng, Phường Bến Nghé, Quận 1",
      "326 Quang Trung, Phường 10, Quận Gò Vấp",
    ],
  },
  {
    city: "Hà Nội",
    stores: [
      "49-51 Hồ Đắc Di, Phường Nam Đồng, Quận Đống Đa",
      "Tầng 2 TTTM Aeon Mall Hà Đông Khu dân cư Hoàng Văn Thụ, Phường Dương Nội, Quận Hà Đông",
    ],
  },
  {
    city: "Hải Phòng",
    stores: [
      "Tầng 2 TTTM Aeon Mall Hải Phòng Lê Chân số 10 Võ Nguyên Giáp, Phường Kênh Dương, Quận Lê Chân",
    ],
  },
  {
    city: "Hưng Yên",
    stores: ["PT.TV 136 - Mega Grand World - Ocean Park, Quận Văn Giang"],
  },
  {
    city: "Biên Hòa",
    stores: ["151A Phan Trung, Phường Tân Mai, Tp. Biên Hòa, Tỉnh Đồng Nai"],
  },
  {
    city: "Bình Dương",
    stores: ["28 Yersin, Phường Hiệp Thành, TP. Thủ Dầu Một, Tỉnh Bình Dương"],
  },
  {
    city: "Cần Thơ",
    stores: ["52 Mậu Thân, Phường An Phú, Quận Ninh Kiều, Tp. Cần Thơ"],
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let image_user = null;

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Giải mã token
        image_user = decoded.image_user;
      } catch (error) {
        console.error("Lỗi giải mã token:", error.message);
      }
    }

    // Thông tin gửi email
    const emailParams = {
      name: formData.name,
      title: formData.email,
      time: formData.phone,
      message: formData.message,
      img:
        image_user && image_user.trim() !== ""
          ? image_user
          : "https://res.cloudinary.com/dtbyoxe5k/image/upload/v1742530169/cyiacudukjzso3ys5krs.png",
    };

    // Gửi email qua EmailJS
    emailjs
      .send(
        "service_ngocanh", // Thay bằng Service ID
        "template_ngocanh", // Thay bằng Template ID
        emailParams,
        "RC2qVq8YNBbA2paJB" // Thay bằng User ID
      )
      .then(
        (response) => {
          alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error) => {
          alert("Gửi thất bại, vui lòng thử lại.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <Container className="contact-page py-5">
      <img className="d-block w-100" src="/picture/bannerHot.png" alt="Third slide" />
      <h2 className="text-center mb-4">Hệ Thống Cửa Hàng</h2>

      {/* Danh sách cửa hàng */}
      {storeBranches.map((branch, index) => (
        <div key={index} className="mb-4">
          <h4 className="branch-title">{branch.city}</h4>
          {branch.stores.map((store, idx) => (
            <p key={idx}>
              <MapPin size={16} /> {store}
            </p>
          ))}
          <hr />
        </div>
      ))}

      {/* Thông tin liên hệ */}
      <div className="text-center mb-5">
        <p>
          <Phone size={18} /> <strong>0933 800 190 - 1900252557</strong>
        </p>
        <p>
          <Mail size={18} /> <strong>thang2006ss@gmail.com</strong>
        </p>
      </div>

      <h2 className="text-center mb-4">Liên Hệ Với Chúng Tôi</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Họ và Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Số Điện Thoại</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nội Dung</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100">
                Gửi Liên Hệ
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
