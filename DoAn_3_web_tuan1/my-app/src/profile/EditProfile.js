import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dtbyoxe5k/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "CLOUDINARY_UPLOAD_URL"; // Thay bằng upload preset của bạn

function EditProfile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    user_id: "",
    fullname: "",
    username: "",
    email: "",
    phone_number: "",
    image_user: "", // Avatar dưới dạng URL
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false); // Trạng thái tải ảnh

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Không tìm thấy token, vui lòng đăng nhập.");
      navigate("/sign_in");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.user_id;

      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:3000/Users/${userId}`);
          if (!response.ok) {
            throw new Error("Không thể tải thông tin người dùng");
          }
          const data = await response.json();
          setUserProfile(data[0]);
          setLoading(false);
        } catch (error) {
          console.error("Lỗi khi tải thông tin người dùng:", error);
          setLoading(false);
        }
      };

      fetchUser();
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
      localStorage.removeItem("token");
      navigate("/sign_in");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  // ✅ Xử lý tải ảnh lên Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true); // Hiển thị loading khi tải ảnh

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setUserProfile({ ...userProfile, image_user: data.secure_url }); // Cập nhật URL ảnh
      }
    } catch (error) {
      console.error("Lỗi tải ảnh lên Cloudinary:", error);
      setMessage({ type: "danger", text: "Lỗi tải ảnh. Vui lòng thử lại!" });
    } finally {
      setUploading(false); // Tắt trạng thái tải ảnh
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/Users/${userProfile.user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfile),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Cập nhật thành công!" });
        setTimeout(() => {
          window.location.href = "/profile";
        }, 1000);
      } else {
        const data = await response.json();
        setMessage({ type: "danger", text: data.message || "Cập nhật thất bại." });
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setMessage({ type: "danger", text: "Đã xảy ra lỗi, vui lòng thử lại." });
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="dark" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h3>Chỉnh Sửa Thông Tin</h3>
      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Avatar */}
        <div className="text-center mb-3 position-relative">
          <Image
            src={userProfile.image_user || "public/logo192.png"}
            roundedCircle
            width={150}
            height={150}
            alt="Avatar"
            className="border"
          />
          {/* Nút thêm ảnh */}
          <label
            className="position-absolute bottom-0 end-0 bg-dark text-white rounded-circle p-2"
            style={{ cursor: "pointer", transform: "translate(30%, 30%)" }}
          >
            📷
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
          </label>
        </div>

        {uploading && <Spinner animation="border" variant="dark" size="sm" className="d-block mx-auto" />}

        <Form.Group controlId="fullname" className="mt-3">
          <Form.Label>Họ và Tên</Form.Label>
          <Form.Control type="text" name="fullname" value={userProfile.fullname} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={userProfile.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="phone_number" className="mt-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="text" name="phone_number" value={userProfile.phone_number} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="username" className="mt-3">
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control type="text" name="username" value={userProfile.username} onChange={handleChange} />
        </Form.Group>

        <Button variant="dark" type="submit" className="mt-4">
          Lưu Thay Đổi
        </Button>
      </Form>
    </Container>
  );
}

export default EditProfile;
