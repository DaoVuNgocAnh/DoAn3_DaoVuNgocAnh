import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css"; // Đảm bảo bạn có file CSS phù hợp

function Footer() {
  return (
    <footer className="Footer py-5">
      <section>
        {/* Phần trên */}
        <div className="Footer_top py-3">
          <h5 className="ps-4">
            <i className="fa-solid fa-phone-volume"></i> Hỗ trợ / Mua hàng: 
            <span className="text-danger"> 0933 800 190</span>
          </h5>
        </div>

        {/* Nội dung chính */}
        <Row className="Footer_mid mt-4 ms-3">
          <Col lg={6} md={12} sm={12} className="mb-4">
            <h5 className="mb-3">HỆ THỐNG CỬA HÀNG</h5>
            <ul className="list-unstyled">
              <li><i className="fa-solid fa-location-dot"></i> Chi nhánh TP. Hồ Chí Minh</li>
              <li>TP. Thủ Đức - Quận 9 - Tầng 2 TTTM Vincom Mega Mall Vinhomes Grand Park.</li>
              <li>Quận 1 - 160 Nguyễn Cư Trinh, Phường Nguyễn Cư Trinh.</li>
              <li>Quận 10 - 561 Sư Vạn Hạnh, Phường 13.</li>
              <li>Quận 1 - The New Playground 26 Lý Tự Trọng, Phường Bến Nghé.</li>
              <li>Quận Gò Vấp - 326 Quang Trung, Phường 10.</li>
              <li><i className="fa-solid fa-location-dot"></i> Chi nhánh Biên Hòa</li>
              <li>TP. Biên Hòa - 151A Phan Trung, Phường Tân Mai.</li>
              <li><i className="fa-solid fa-location-dot"></i> Chi nhánh Bình Dương</li>
              <li>TP. Thủ Dầu Một - 28 Yersin, Phường Hiệp Thành.</li>
              <li><i className="fa-solid fa-location-dot"></i> Chi nhánh Hà Nội</li>
              <li>Đống Đa - 49-51 Hồ Đắc Di, Phường Nam Đồng.</li>
              <li>Hà Đông - Tầng 2 TTTM Aeon Mall Hà Đông Khu dân cư Hoàng Văn Thụ, phường Dương Nội</li>
              <li><i className="fa-solid fa-location-dot"></i> Chi nhánh Hải Phòng</li>
              <li>Lê Chân - Tầng 2 TTTM Aeon Mall Hải Phòng Lê Chân số 10 Võ Nguyên Giáp, Phường Kênh Dương</li>
              <li><i className="fa-solid fa-location-dot"></i> Chi nhánh Hưng Yên</li>
              <li>Văn Giang - PT.TV 136 - Mega Grand World - Ocean Park</li>
              <li><i className="fa-solid fa-location-dot"></i> Chi nhánh Cần Thơ</li>
              <li>Quận Ninh Kiều - 52 Mậu Thân, Phường An Phú.</li>
              <li><i className="fa-solid fa-phone"></i> 0339706393 - 0123456789</li>
              <li><i className="fa-solid fa-envelope"></i> ngocanhdaovu1709@gmail.com</li>
            </ul>
          </Col>

          <Col lg={3} md={6} sm={6} className="mb-4">
            <h5 className="mb-3">MẠNG XÃ HỘI</h5>
            <ul className="list-unstyled d-flex gap-3">
              <li>
                <Link to="#">
                  <i className="fab fa-facebook-f fa-2x"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fab fa-instagram fa-2x"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fab fa-tiktok fa-2x"></i>
                </Link>
              </li>
            </ul>
            <h5 className="mt-4">CHÍNH SÁCH</h5>
            <ul className="list">
              <li>Chính sách bảo mật</li>
              <li>Chính sách đổi trả</li>
              <li>Chính sách vận chuyển</li>
            </ul>
          </Col>

          <Col lg={3} md={6} sm={6} className="mb-4 text-center">
            <h5 className="mb-3">FANPAGE</h5>
            <iframe 
              title="Fanpage"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDirtyCoins.VN&tabs=timeline&width=300&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="300"
              height="130"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </Col>
        </Row>

        {/* Phần dưới */}
        <div className="Footer_bot mt-4">
          <h5 className="py-4 text-center">
            Copyright © 2025 Dirty Coins Studio. Powered by Đào Vũ Ngọc Anh
          </h5>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
