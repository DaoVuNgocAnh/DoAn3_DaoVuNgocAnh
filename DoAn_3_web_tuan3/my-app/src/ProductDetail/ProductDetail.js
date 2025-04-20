import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  InputGroup,
  FormControl,
  Form,
  ProgressBar,
} from "react-bootstrap";
import "./ProductDetail.css"

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  // Lấy user_id từ token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user_id;
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!product) {
      fetch(`http://localhost:3000/Products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Lỗi khi tải sản phẩm:", error));
    }
  }, [id, product]);

  useEffect(() => {
    fetch(`http://localhost:3000/Reviews/Product/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Lỗi khi tải đánh giá:", error));
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    if (!product) return;
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.product_id === product.product_id
    );
  
    let currentQuantity = 0;
    if (existingProductIndex !== -1) {
      currentQuantity = cart[existingProductIndex].quantity;
    }
  
    // Kiểm tra tổng số lượng sau khi thêm có vượt quá stock không
    if (currentQuantity + quantity > product.stock) {
      alert(`Chỉ còn lại ${product.stock - currentQuantity} sản phẩm trong kho.`);
      return;
    }
  
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
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
  

  const submitReview = () => {
    const user_id = getUserIdFromToken();
    if (!user_id) {
      alert("Bạn cần đăng nhập để gửi đánh giá.");
      return;
    }

    const reviewData = {
      product_id: parseInt(id),
      user_id: user_id,
      rating: newReview.rating,
      comment: newReview.comment,
      review_date: formatVNDate(),
    };

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews([...reviews, data]);
        setNewReview({ rating: 5, comment: "" });
      })
      .catch((error) => console.error("Lỗi khi gửi đánh giá:", error));
  };

  // Tính tổng số lượt đánh giá và mức trung bình đánh giá
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
      : 0;

  // Đếm số lượng đánh giá theo từng mức
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  return (
    <Container className="mt-5">
      {product ? (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={product.image_url}
                alt={product.product_name}
              />
            </Card>
          </Col>
          <Col md={6}>
            <h2>{product.product_name}</h2>
            <p className="product-price">
              {product.price.toLocaleString()} VND
            </p>
            <p>{product.description}</p>
            <p>Số lượng còn lại: {product.stock}</p>

            <InputGroup className="mb-3" style={{ width: "150px" }}>
              <Button variant="outline-dark" onClick={decreaseQuantity}>
                -
              </Button>
              <FormControl className="text-center" value={quantity} readOnly />
              <Button variant="outline-dark" onClick={increaseQuantity}>
                +
              </Button>
            </InputGroup>

            <Button variant="dark" onClick={addToCart}>
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
      ) : (
        <p className="text-center">Đang tải sản phẩm...</p>
      )}

      <h3 className="mt-5">Đánh giá sản phẩm</h3>

      {/* Hiển thị tổng số lượt đánh giá và mức trung bình đánh giá */}
      <p><strong>{totalReviews}</strong> lượt đánh giá</p>
      <p>Đánh giá trung bình: <strong>{averageRating}</strong> ⭐</p>

      {/* Hiển thị thanh đánh giá */}
      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} className="d-flex align-items-center mb-2">
          <span style={{ width: "40px" }}>{star} ⭐</span>
          <ProgressBar
            now={(ratingCounts[star - 1] / totalReviews) * 100 || 0}
            label={ratingCounts[star - 1]}
            variant="warning"
            style={{ flex: 1, marginLeft: "10px" }}
          />
        </div>
      ))}

      {reviews.map((review) => (
        <Card key={review.review_id} className="mb-3">
          <Card.Body>
            <strong>Rating: {"⭐".repeat(review.rating)}</strong>
            <p>{review.comment}</p>
            <small>{new Date(review.review_date).toLocaleString()}</small>
          </Card.Body>
        </Card>
      ))}

      <h4>Viết đánh giá</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Đánh giá (1-5 sao)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="5"
            value={newReview.rating}
            onChange={(e) => {
              let value = parseInt(e.target.value);
              if (value < 1) value = 1;
              if (value > 5) value = 5;
              setNewReview({ ...newReview, rating: value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bình luận (tối đa 500 ký tự)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            maxLength={500}
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({
                ...newReview,
                comment: e.target.value.slice(0, 500),
              })
            }
          />
          <small>{newReview.comment.length}/500 ký tự</small>
        </Form.Group>
        <Button variant="primary" onClick={submitReview}>
          Gửi đánh giá
        </Button>
      </Form>
      <h3 className="mt-5">Các sản phẩm khác</h3>
    </Container>
  );
}

export default ProductDetail;
