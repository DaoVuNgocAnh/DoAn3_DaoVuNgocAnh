import React, { useEffect, useState } from "react";
import { Container, Table, Image, Card, Button, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.user_id;

      const response = await axios.get(`http://127.0.0.1:3000/Orders/User/${userId}`);
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng:", error);
    }
  };

  const handleShowDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/OrderDetails/Order/${orderId}`);
      if (response.status === 200) {
        const detailItems = response.data;

        const productRequests = detailItems.map(item =>
          axios.get(`http://127.0.0.1:3000/Products/${item.product_id}`)
        );

        const productResponses = await Promise.all(productRequests);
        const products = productResponses.map(res => res.data[0]);

        const enrichedDetails = detailItems.map((item, index) => ({
          ...item,
          product_name: products[index]?.product_name || "Không rõ",
          image_url: products[index]?.image_url || "https://via.placeholder.com/50",
        }));

        const order = orders.find((o) => o.order_id === orderId);
        setOrderDetails(enrichedDetails);
        setSelectedOrder(order);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Lỗi khi tải chi tiết đơn hàng hoặc sản phẩm:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setOrderDetails([]);
  };

  const handleCancelOrder = async (orderId) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");
    if (!confirm) return;

    try {
      const response = await axios.delete(`http://127.0.0.1:3000/Orders/${orderId}`);
      if (response.status === 200) {
        alert("Đơn hàng đã được hủy.");
        // Cập nhật lại danh sách đơn
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.order_id !== orderId)
        );
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn:", error);
      alert("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
    }
  };

  const formatDate = (dateObj) => {
    const date = new Date(dateObj);
    date.setHours(date.getHours());
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Hóa đơn của bạn</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có hóa đơn nào.</p>
      ) : (
        orders.map((order, index) => (
          <Card className="mb-4 p-3" key={index}>
            <h5>Mã đơn hàng: {order.order_id}</h5>
            <p>Ngày đặt: {formatDate(order.order_date)}</p>
            <p>Trạng thái: {order.status}</p>
            <h5>Tổng tiền: {order.total_amount.toLocaleString()} VNĐ</h5>

            <div className="d-flex gap-2 mt-2">
              <Button
                variant="info"
                onClick={() => handleShowDetails(order.order_id)}
              >
                Xem chi tiết
              </Button>

              {order.status === "pending" && (
                <Button
                  variant="danger"
                  onClick={() => handleCancelOrder(order.order_id)}
                >
                  Hủy đơn
                </Button>
              )}
            </div>
          </Card>
        ))
      )}

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng #{selectedOrder?.order_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Ngày đặt:</strong> {formatDate(selectedOrder?.order_date)}</p>
          <p><strong>Trạng thái:</strong> {selectedOrder?.status}</p>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <Image
                      src={item.image_url}
                      width={50}
                      height={50}
                      rounded
                    />
                  </td>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()} VNĐ</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5 className="text-end">
            Tổng tiền: {selectedOrder?.total_amount.toLocaleString()} VNĐ
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserOrders;
