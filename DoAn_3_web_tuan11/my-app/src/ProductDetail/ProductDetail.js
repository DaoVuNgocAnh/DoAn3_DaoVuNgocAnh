import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  InputGroup,
  FormControl,
  ProgressBar,
} from "react-bootstrap";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  // Fetch product info
  useEffect(() => {
    if (!product) {
      fetch(`http://localhost:3000/Products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data[0]))
        .catch((error) => console.error("Lỗi khi tải sản phẩm:", error));
    }
  }, [id, product]);

  useEffect(() => {
    fetch(`http://localhost:3000/Reviews/Product/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Lỗi khi tải đánh giá:", error));
  }, [id]);

  // Fetch size variants
  useEffect(() => {
    fetch(`http://localhost:3000/ProductVariants/product/${id}`)
      .then((response) => response.json())
      .then((data) => setVariants(data))
      .catch((error) => console.error("Lỗi khi tải size:", error));
  }, [id]);

  // Update variant when size changes
  useEffect(() => {
    setSelectedVariant(variants.find((v) => v.size === selectedSize) || null);
    setQuantity(1);
  }, [selectedSize, variants]);

  const increase = () => {
    if (selectedVariant && quantity < selectedVariant.stock)
      setQuantity((q) => q + 1);
  };
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const addToCart = () => {
    if (!selectedVariant) {
      return alert("Vui lòng chọn size còn hàng.");
    }
    if (quantity > selectedVariant.stock) {
      return alert(`Chỉ còn ${selectedVariant.stock} sản phẩm.`);
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const idx = cart.findIndex(
      (item) => item.variant_id === selectedVariant.variant_id
    );
    if (idx >= 0) {
      const newQ = cart[idx].quantity + quantity;
      if (newQ > selectedVariant.stock) return alert("Vượt quá tồn kho!");
      cart[idx].quantity = newQ;
    } else {
      cart.push({
        product_id: product.product_id,
        product_name: product.product_name,
        price: product.price,
        image_url: product.image_url,
        variant_id: selectedVariant.variant_id,
        size: selectedVariant.size,
        quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => ratingCounts[r.rating - 1]++);

  if (!product) return <div>Đang tải...</div>;

  return (
    <Container className="mt-5">
      <Row>
        {/* Ảnh & nội dung chính */}
        <Col md={6}>
          <Card>
            <Card.Img src={product.image_url} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.product_name}</h2>
          <p className="text-danger">
            {product.price
              ? `${product.price.toLocaleString()} VND`
              : "Đang cập nhật giá"}
          </p>

          <p>{product.description}</p>

          <Form.Group className="mb-3">
            <Form.Label>Size:</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {[...variants]
                .sort((a, b) => {
                  const order = ["XS", "S", "M", "L", "XL"];
                  return order.indexOf(a.size) - order.indexOf(b.size);
                })
                .reverse()
                .map((v) => (
                  <Button
                    key={v.variant_id}
                    variant={v.size === selectedSize ? "dark" : "outline-dark"}
                    disabled={v.stock === 0}
                    onClick={() => setSelectedSize(v.size)}
                    style={{ minWidth: "60px" }}
                  >
                    {v.size}
                    {v.stock === 0 && (
                      <small className="text-danger ms-1">(Hết)</small>
                    )}
                  </Button>
                ))}
            </div>

            {/* Hiển thị số lượng còn lại */}
            {selectedSize && (
              <p className="mt-2 text-muted">
                Số lượng còn lại:{" "}
                {variants.find((v) => v.size === selectedSize)?.stock ?? 0}
              </p>
            )}
          </Form.Group>

          {/* Số lượng với +/- */}
          <InputGroup className="mb-3" style={{ width: "140px" }}>
            <Button
              onClick={decrease}
              disabled={!selectedVariant || quantity <= 1}
            >
              –
            </Button>
            <FormControl className="text-center" value={quantity} readOnly />
            <Button
              onClick={increase}
              disabled={
                !selectedVariant || quantity >= (selectedVariant?.stock || 1)
              }
            >
              +
            </Button>
          </InputGroup>

          <Button
            variant="dark"
            onClick={addToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
          >
            🛒 Thêm vào giỏ hàng
          </Button>
          <br></br>
          <br></br>
          <Card>
            <Card.Img
              variant="top"
              src="\picture\size áo.png"
              alt={product.product_name}
            />
          </Card>
        </Col>
      </Row>

      {/* Phần đánh giá */}
      <div className="mt-5">
        <h3>Đánh giá sản phẩm</h3>
        <p>
          <strong>{totalReviews}</strong> lượt – Trung bình:{" "}
          <strong>{averageRating} ⭐</strong>
        </p>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="d-flex align-items-center mb-2">
            <span style={{ width: "40px" }}>{star}⭐</span>
            <ProgressBar
              now={(ratingCounts[star - 1] / totalReviews) * 100 || 0}
              label={ratingCounts[star - 1]}
              style={{ flex: 1, marginLeft: "10px" }}
              variant="warning"
            />
          </div>
        ))}

        {/* Dánh sách đánh giá */}
        {reviews.map((r) => (
          <Card key={r.review_id} className="mb-3">
            <Card.Body>
              <p>Ngọc Anh</p>
              <strong>{"⭐".repeat(r.rating)}</strong>
              <p>{r.comment}</p>
              <small>{new Date(r.review_date).toLocaleString()}</small>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default ProductDetail;
