import React, { useEffect, useState } from "react";
import { Container, Table, Button, Image, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

    const token = localStorage.getItem("token");
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
    const { email, name, phone, address } = formData;
    setIsFormValid(email && name && phone && address);
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

  const formatVNDate = () => {
    const now = new Date();
    now.setHours(now.getHours()); // Cộng thêm 7 giờ để chuyển sang giờ Việt Nam (UTC+7)
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
  
    if (paymentMethod === "COD") {
      try {
        let orderPayload = {
          total_amount: calculateTotal(),
          status: "pending",
          order_date: formatVNDate(),
        };
  
        let orderId;
  
        if (token) {
          const decodedToken = jwtDecode(token);
          orderPayload.user_id = decodedToken.user_id;
        } else {
          const guestResponse = await axios.post("http://127.0.0.1:3000/Guest", {
            email: formData.email,
            fullname: formData.name,
            phone_number: formData.phone,
            address: formData.address,
          });
  
          if (guestResponse.status === 200 && guestResponse.data.guest_id) {
            orderPayload.guest_id = guestResponse.data.guest_id;
          } else {
            alert("Không thể lưu thông tin khách hàng. Vui lòng thử lại!");
            return;
          }
        }
  
        const orderResponse = await axios.post("http://127.0.0.1:3000/Orders", orderPayload);
  
        if (orderResponse.status === 200 && orderResponse.data.order_id) {
          orderId = orderResponse.data.order_id;
  
          // Gửi từng sản phẩm vào OrderDetails
          for (const item of cart) {
            await axios.post("http://127.0.0.1:3000/OrderDetails", {
              order_id: orderId,
              product_id: item.product_id,
              quantity: item.quantity || 1,
              price: item.price * (item.quantity || 1),
            });
          }
  
          // Tạo thông tin giao hàng
          await axios.post("http://127.0.0.1:3000/Shipping", {
            order_id: orderId,
            shipping_address: formData.address,
            shipping_status: "pending",
          });
  
          // Tạo thông tin thanh toán
          await axios.post("http://127.0.0.1:3000/Payments", {
            order_id: orderId,
            payment_date: formatVNDate(),
            payment_method: "thanh toán tiền mặt khi nhận hàng",
            payment_status: "pending",
          });
  
          alert("Đơn hàng của bạn đã được xác nhận! Nhân viên sẽ liên hệ để giao hàng.");
          localStorage.removeItem("selectedCheckoutItems");
          navigate("/");
        } else {
          alert("Không thể tạo đơn hàng. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Lỗi khi đặt hàng:", error);
        alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
      }
    } else if (paymentMethod === "VNPAY") {
      const orderData = {
        cart,
        formData,
        paymentMethod,
        total: calculateTotal(),
      };
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
              disabled={!isFormValid}
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
