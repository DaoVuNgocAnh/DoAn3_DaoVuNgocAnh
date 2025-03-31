import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Card, InputGroup, FormControl } from "react-bootstrap";

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [quantity, setQuantity] = useState(1);

  // Nếu không có product trong state, gọi API để lấy dữ liệu
  useEffect(() => {
    if (!product) {
      fetch(`http://localhost:3000/Products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Lỗi khi tải sản phẩm:", error));
    }
  }, [id, product]);

  // Xử lý tăng/giảm số lượng
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Xử lý thêm vào giỏ hàng
  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingProductIndex = cart.findIndex((item) => item.id === product.product_id);

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có, cập nhật số lượng
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Nếu chưa có, thêm mới vào giỏ hàng
      cart.push({ ...product, quantity });
    }

    // Lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  return (
    <Container className="mt-5">
      {product ? (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img variant="top" src={product.image_url} alt={product.product_name} />
            </Card>
          </Col>
          <Col md={6}>
            <h2>{product.product_name}</h2>
            <p className="product-price">{product.price.toLocaleString()} VND</p>
            <p>{product.description}</p>

            {/* Bộ điều chỉnh số lượng */}
            <InputGroup className="mb-3" style={{ width: "150px" }}>
              <Button variant="outline-dark" onClick={decreaseQuantity}>-</Button>
              <FormControl className="text-center" value={quantity} readOnly />
              <Button variant="outline-dark" onClick={increaseQuantity}>+</Button>
            </InputGroup>

            {/* Nút thêm vào giỏ hàng */}
            <Button variant="dark" onClick={addToCart}>🛒 Thêm vào giỏ hàng</Button>
          </Col>
        </Row>
      ) : (
        <p className="text-center">Đang tải sản phẩm...</p>
      )}
    </Container>
  );
}

export default ProductDetail;
