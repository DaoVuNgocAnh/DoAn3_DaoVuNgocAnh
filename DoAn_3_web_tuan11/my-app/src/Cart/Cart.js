import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Image, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (variant_id, amount) => {
    const updatedCart = cartItems.map((item) => {
      if (item.variant_id === variant_id) {
        const newQuantity = item.quantity + amount;

        if (newQuantity < 1) return { ...item, quantity: 1 };

        if (newQuantity > item.stock) {
          alert(`Chỉ còn ${item.stock} sản phẩm size ${item.size}.`);
          return item;
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    updateCartInLocalStorage(updatedCart);
  };

  const handleRemove = (variant_id) => {
    const updatedCart = cartItems.filter((item) => item.variant_id !== variant_id);
    updateCartInLocalStorage(updatedCart);
    setSelectedItems(selectedItems.filter((id) => id !== variant_id));
  };

  const handleSelectItem = (variant_id) => {
    setSelectedItems((prev) =>
      prev.includes(variant_id) ? prev.filter((id) => id !== variant_id) : [...prev, variant_id]
    );
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.variant_id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.variant_id)
    );
    localStorage.setItem("selectedCheckoutItems", JSON.stringify(selectedProducts));
    navigate("/Payment");
  };

  return (
    <Container className="mt-5 cart-page">
      <h4>🛒 GIỎ HÀNG CỦA BẠN</h4>
      <Row className="mt-4">
        <Col lg={9} md={12}>
          {cartItems.length > 0 ? (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Chọn</th>
                  <th>Ảnh</th>
                  <th>Sản phẩm</th>
                  <th>Size</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.variant_id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedItems.includes(item.variant_id)}
                        onChange={() => handleSelectItem(item.variant_id)}
                      />
                    </td>
                    <td>
                      <Image src={item.image_url} alt={item.name} width={70} />
                    </td>
                    <td>{item.product_name}</td>
                    <td>{item.size}</td>
                    <td>{item.price.toLocaleString()} VND</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.variant_id, -1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.variant_id, 1)}
                      >
                        +
                      </Button>
                    </td>
                    <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(item.variant_id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">Giỏ hàng của bạn đang trống.</p>
          )}
        </Col>

        <Col lg={3} md={12} className="cart-summary">
          <div className="summary-box p-3 shadow-sm">
            <h5 className="text-center">Tổng cộng</h5>
            <p className="text-center fw-bold">{totalPrice.toLocaleString()} VND</p>
            <Button
              variant="dark"
              className="w-100"
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              Thanh toán
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
