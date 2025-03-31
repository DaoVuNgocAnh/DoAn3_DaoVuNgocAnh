import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load giỏ hàng từ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Hàm cập nhật giỏ hàng vào localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Xử lý tăng/giảm số lượng
  const handleQuantityChange = (id, amount) => {
    const updatedCart = cartItems.map((item) =>
      item.product_id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    );
    updateCartInLocalStorage(updatedCart);
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.product_id !== id);
    updateCartInLocalStorage(updatedCart);
  };

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="mt-5 cart-page">
      <h4>🛒 GIỎ HÀNG CỦA BẠN</h4>
      <Row className="mt-4">
        {/* Danh sách sản phẩm trong giỏ hàng */}
        <Col lg={9} md={12}>
          {cartItems.length > 0 ? (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product_id}>
                    <td>
                      <Image src={item.image_url} alt={item.product_name} width={70} />
                    </td>
                    <td>{item.product_name}</td>
                    <td>{item.price.toLocaleString()} VND</td>
                    <td>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.product_id, -1)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.product_id, 1)}>+</Button>
                    </td>
                    <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleRemove(item.product_id)}>Xóa</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">Giỏ hàng của bạn đang trống.</p>
          )}
        </Col>

        {/* Tổng tiền và Thanh toán */}
        <Col lg={3} md={12} className="cart-summary">
          <div className="summary-box p-3 shadow-sm">
            <h5 className="text-center">Tổng cộng</h5>
            <p className="text-center fw-bold">{totalPrice.toLocaleString()} VND</p>
            <Button variant="dark" className="w-100" onClick={() => navigate("/Payment")} disabled={cartItems.length === 0}>
              Thanh toán
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
