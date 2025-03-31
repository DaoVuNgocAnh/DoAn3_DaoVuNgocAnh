import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // react-paginate dùng chỉ mục từ 0
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/Products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
  
    fetchProducts();
  }, []);
  

  // Lấy sản phẩm cho trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentProducts = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Xử lý chuyển trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Carousel className="banner-carousel" interval={3000} controls={false} indicators={true} pause={false}>
        <Carousel.Item>
          <img className="d-block w-100" src="/picture/banner1.png" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/picture/banner2.png" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/picture/banner3.png" alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      <Container className="product-section mt-5">
        <h1 className="text-center title">TẤT CẢ SẢN PHẨM</h1>
        <Row>
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <Col key={index} lg={3} md={6} sm={6} xs={12} className="product-col">
                <Card className="product-card">
                  <Card.Img variant="top" src={product.image_url} className="product-image" alt={product.name} />
                  <Card.Body>
                    <Card.Title className="product-title">{product.product_name}</Card.Title>
                    <p className="product-price">{product.price} VND</p>
                    <Button
                      variant="dark"
                      className="buy-button"
                      onClick={() => navigate(`/ProductDetails/${product.product_id}`, { state: { product } })}
                    >Xem chi tiết</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">Đang tải sản phẩm...</p>
          )}
        </Row>
        
        {/* Phân trang */}
        {products.length > itemsPerPage && (
          <ReactPaginate
            previousLabel="«"
            nextLabel="»"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        )}
      </Container>

      {/* Banner phụ */}
      <Container className="banner_end">
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <img className="d-block w-100" src="/picture/banner5.png" alt="banner5" />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <img className="d-block w-100" src="/picture/banner6.png" alt="banner6" />
          </Col>
        </Row>
      </Container>

      {/* Logo thương hiệu */}
      <Container className="brand_img mt-5">
        <h1 className="text-center title">THƯƠNG HIỆU</h1>
        <Row>
          <Col lg={3} md={3} sm={3} xs={3}>
            <img className="d-block w-100" src="/picture/logo1.png" alt="logo1" />
          </Col>
          <Col lg={3} md={3} sm={3} xs={3}>
            <img className="d-block w-100" src="/picture/logo2.png" alt="logo2" />
          </Col>
          <Col lg={3} md={3} sm={3} xs={3}>
            <img className="d-block w-100" src="/picture/logo3.png" alt="logo3" />
          </Col>
          <Col lg={3} md={3} sm={3} xs={3}>
            <img className="d-block w-100" src="/picture/logo4.png" alt="logo4" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
