import React, { useEffect, useState } from "react";
import { Container, Table, Button, Image, Form, Row, Col, Card } from "react-bootstrap";

const Payment = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ email: "", name: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

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
                    <td>{item.product_name}</td>
                    <td>{item.price.toLocaleString()} VNĐ</td>
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
            <Button variant="success" size="lg" className="w-100 mt-3">Đặt Hàng</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
