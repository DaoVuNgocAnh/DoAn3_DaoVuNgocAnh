import React, { useEffect, useState } from "react";
import { Container, Table, Button, Image, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  
import axios from "axios";  // Import axios

const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ email: "", name: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);  

  useEffect(() => {
    const storedCart = localStorage.getItem("selectedCheckoutItems");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // Lấy token từ localStorage
    var token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);  
        setFormData({
          email: decodedToken.email || "",
          name: decodedToken.fullname || "",
          phone: decodedToken.phone_number || "",
          address: decodedToken.address || "",
        });
      } catch (error) {
        console.error("Token không hợp lệ", error);
      }
    }
  }, []);

  useEffect(() => {
    // Kiểm tra tính hợp lệ của form
    const { email, name, phone, address } = formData;
    if (email && name && phone && address) {
      setIsFormValid(true);  
    } else {
      setIsFormValid(false);  
    }
  }, [formData]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0) - discountAmount;
  };

  const applyDiscount = () => {
    if (discountCode === "SALE10") {
      setDiscountAmount(10000);
    } else {
      setDiscountAmount(0);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    const orderData = {
      cart,
      formData,
      paymentMethod,
      total: calculateTotal(),
    };

    var token = localStorage.getItem("token");
    // Nếu phương thức thanh toán là COD, gửi yêu cầu lưu đơn hàng vào cơ sở dữ liệu
    if (paymentMethod === "COD") {
      try {
        const decodedToken = jwtDecode(token); 
        const response = await axios.post("http://127.0.0.1:3000/Orders", {
          user_id: decodedToken.user_id,  // Thêm thông tin người dùng
          total_amount: calculateTotal(),
          status: "pending",  // Trạng thái đơn hàng là 'pending'
          order_date: new Date(),
        });

        if (response.status === 200) {
          alert("Đơn hàng của bạn đã được xác nhận! Nhân viên sẽ liên hệ để giao hàng.");
          navigate("/");  // Dẫn tới trang cảm ơn
        }
      } catch (error) {
        console.error("Lỗi khi đặt hàng:", error);
        alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
      }
    } 
    // Nếu phương thức thanh toán là VNPAY, chuyển hướng đến trang VNPAY
    else if (paymentMethod === "VNPAY") {
      navigate("/vnpay", { state: orderData });
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Thanh toán</h2>
      <Row>
        <Col md={7}>
          <Card className="p-4">
            <h4>Thông tin nhận hàng</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Họ và Tên</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số Điện Thoại</Form.Label>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
              </Form.Group>
            </Form>
          </Card>

          <Card className="p-4 mt-3">
            <h4>Phương thức thanh toán</h4>
            <Form.Check type="radio" label="Thanh toán qua VNPAY-QR" name="payment" value="VNPAY" checked={paymentMethod === "VNPAY"} onChange={(e) => setPaymentMethod(e.target.value)} />
            <Form.Check type="radio" label="Thanh toán khi giao hàng (COD)" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
          </Card>
        </Col>

        <Col md={5}>
          <Card className="p-4">
            <h4>Đơn hàng ({cart.length} sản phẩm)</h4>
            <Table striped>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td><Image src={item.image_url || "https://via.placeholder.com/50"} width={50} height={50} rounded /></td>
                    <td>{item.product_name} (x{item.quantity || 1})</td>
                    <td>{(item.price * (item.quantity || 1)).toLocaleString()} VNĐ</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Nhập mã giảm giá" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
              <Button variant="primary" className="mt-2" onClick={applyDiscount}>Áp dụng</Button>
            </Form.Group>
            <h5>Tạm tính: {cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toLocaleString()} VNĐ</h5>
            <h5>Giảm giá: {discountAmount.toLocaleString()} VNĐ</h5>
            <h4>Tổng cộng: {calculateTotal().toLocaleString()} VNĐ</h4>
            <Button 
              variant="success" 
              size="lg" 
              className="w-100 mt-3" 
              onClick={handleOrder} 
              disabled={!isFormValid}  // Disable nút nếu form không hợp lệ
            >
              Đặt Hàng
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
