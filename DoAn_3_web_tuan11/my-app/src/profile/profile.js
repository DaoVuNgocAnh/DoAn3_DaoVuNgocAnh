import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Đảm bảo import đúng

function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Không tìm thấy token, vui lòng đăng nhập.");
      navigate("/sign_in");
      return;
    }

    try {
      const decoded = jwtDecode(token); // Giải mã token
      const userId = decoded.user_id;

      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:3000/Users/${userId}`);
          if (!response.ok) {
            throw new Error("Không thể tải thông tin người dùng");
          }
          const data = await response.json();
          setUserProfile(data[0]); // Giả định API trả về mảng
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

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="dark" />
      </Container>
    );
  }

  if (!userProfile) {
    return (
      <Container className="text-center mt-5">
        <p>Không tìm thấy thông tin người dùng.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h3>THÔNG TIN CÁ NHÂN</h3>
      <Card className="shadow-sm p-4">
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <Image
              src={userProfile.image_user || "public/logo192.png"}
              roundedCircle
              width={150}
              height={150}
              alt="Avatar"
              className="border"
            />
          </Col>
          <Col md={8}>
            <h3 className="fw-bold">{userProfile.fullname}</h3>
            <p>Email: {userProfile.email}</p>
            <p>Số điện thoại: {userProfile.phone_number || "Chưa cập nhật"}</p>
            <p>Tên tài khoản: {userProfile.username || "Chưa cập nhật"}</p>
            <Button variant="dark" onClick={() => navigate("/edit-profile")}>
              Chỉnh sửa thông tin
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Profile;
