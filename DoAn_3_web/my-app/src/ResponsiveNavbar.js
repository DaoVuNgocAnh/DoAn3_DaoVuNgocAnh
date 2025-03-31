import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Import đúng
import "./Navbar.css";

function ResponsiveNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    fetch("http://localhost:3000/ProductCategories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi khi tải danh mục:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Giải mã token
        const userId = decoded.user_id;

        fetch(`http://localhost:3000/Users/${userId}`)
          .then((res) => {
            if (!res.ok) throw new Error("Không thể lấy thông tin người dùng");
            return res.json();
          })
          .then((data) => setUser(data))
          .catch((error) => {
            console.error("Lỗi khi tải thông tin người dùng:", error);
            localStorage.removeItem("token");
            setUser(null);
          });
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTimeout(() => {
      window.location.href = "/"; // Chuyển hướng sau khi đăng nhập
    }, 1000);
  };

  return (
    <Navbar expand="lg" className={`custom-navbar ${scrolled ? "scrolled" : ""}`} sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <img src="picture/DirtyCoins_LOGO.png" alt="Dirty Coins" className="logo-img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Shop" id="shop-dropdown">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <NavDropdown.Item key={category.category_id} as={Link} to={`/Product/${category.category_id}`}>
                    {category.category_name}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item disabled>Đang tải...</NavDropdown.Item>
              )}
            </NavDropdown>
            <Nav.Link as={Link} to="/collabs">Collab's</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav className="auth-links">
            {user ? (
              <NavDropdown title={`Xin chào, ${user[0]?.fullname || "Người dùng"}`} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Hồ sơ</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/order">Đơn hàng</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/sign_in" className="auth-btn">
                <i className="fa-solid fa-user"></i>
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/cart" className="auth-btn">
              <i className="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ResponsiveNavbar;
