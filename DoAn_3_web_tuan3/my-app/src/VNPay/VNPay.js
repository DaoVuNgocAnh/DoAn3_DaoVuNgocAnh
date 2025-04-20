import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Table, Button } from "react-bootstrap";

const VNPay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  if (!orderData) {
    return (
      <Container className="py-5 text-center">
        <h2>Không có đơn hàng để thanh toán</h2>
        <Button onClick={() => navigate("/")}>Quay lại trang chủ</Button>
      </Container>
    );
  }

  const handleConfirmPayment = () => {
    alert("Thanh toán thành công qua VNPay!");
    navigate("/");
  };

  return (
    <Container className="py-5">
      <Card className="p-4">
        <h2 className="text-center mb-4">Thanh toán VNPay</h2>
        <h4>Thông tin đơn hàng</h4>
        <Table striped>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {orderData.cart.map((item, index) => (
              <tr key={index}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{(item.price * item.quantity).toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h4>Tổng tiền: {orderData.total.toLocaleString()} VNĐ</h4>
        <Button variant="success" className="w-100 mt-3" onClick={handleConfirmPayment}>
          Xác nhận thanh toán
        </Button>
      </Card>
    </Container>
  );
};

export default VNPay;
