import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "./Product.css";

function Product() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/ProductCategories");
        const data = await response.json();
        setCategories(data);

        if (categoryId) {
          const selected = data.find((cat) => cat.category_id?.toString() === categoryId);
          setSelectedCategory(selected || null);
        }
      } catch (error) {
        console.error("Lỗi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, [categoryId]);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/Products/Category/${categoryId}`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  // Hàm lọc theo giá
  const filterByPrice = (products, priceRange) => {
    switch (priceRange) {
      case "<300k":
        return products.filter((p) => p.price < 300000);
      case "300-600k":
        return products.filter((p) => p.price >= 300000 && p.price <= 600000);
      case "600-1tr":
        return products.filter((p) => p.price > 600000 && p.price <= 1000000);
      case ">1tr":
        return products.filter((p) => p.price > 1000000);
      default:
        return products;
    }
  };

  // Cập nhật danh sách sản phẩm khi thay đổi bộ lọc
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter) {
      filtered = filterByPrice(filtered, priceFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, priceFilter, products]);

  return (
    <Container className="product-page">
      {selectedCategory?.category_banner && (
        <img src={selectedCategory.category_banner} alt="Category Banner" className="banner-img" />
      )}

      <Row className="mt-4">
        {/* Sidebar Bộ Lọc */}
        <Col lg={3} md={4} sm={12} className="sidebar">
          <Card className="p-3 shadow-sm">
            <h5 className="fw-bold">Bộ lọc sản phẩm</h5>

            {/* Thanh tìm kiếm */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>

            {/* Bộ lọc giá */}
            <h5>Khoảng giá</h5>
            {["<300k", "300-600k", "600-1tr", ">1tr"].map((range, index) => (
              <Form.Check
                className="mb-2"
                key={index}
                type="radio"
                label={
                  range === "<300k"
                    ? "< 300.000đ"
                    : range === "300-600k"
                    ? "300.000đ - <600.000đ"
                    : range === "600-1tr"
                    ? "600.000đ - <1.000.000đ"
                    : "> 1.000.000đ"
                }
                name="priceFilter"
                value={range}
                checked={priceFilter === range}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
            ))}

            {/* Nút xóa bộ lọc */}
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={() => {setPriceFilter(""); setSearchTerm("");}}
            >
              Xóa bộ lọc
            </Button>
          </Card>
        </Col>

        {/* Lưới sản phẩm */}
        <Col lg={9} md={8} sm={12}>
          <Row className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col key={product.product_id} lg={4} md={6} sm={12} className="mb-4">
                  <Card className="product-card shadow-lg">
                    <div className="product-img-container">
                      <Card.Img variant="top" src={product.image_url} className="product-image" />
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title className="product-title">{product.product_name}</Card.Title>
                      <p className="product-price">{product.price.toLocaleString()} VND</p>
                      <Button
                        variant="dark"
                        className="buy-button w-100"
                        onClick={() => navigate(`/ProductDetails/${product.product_id}`, { state: { product } })}
                      >
                        Xem chi tiết
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center w-100">Không có sản phẩm nào!</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;
