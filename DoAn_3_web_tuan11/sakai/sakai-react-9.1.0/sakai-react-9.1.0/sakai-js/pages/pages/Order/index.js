import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:3000';

const OrderAdmin = () => {
    const toast = useRef(null);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [detailDialog, setDetailDialog] = useState(false);
    const [statusDialog, setStatusDialog] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [shippingStatus, setShippingStatus] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_BASE}/Orders`);
            setOrders(res.data);
        } catch (err) {
            console.error('Lỗi lấy đơn hàng:', err);
        }
    };

    const fetchOrderDetails = async (orderId) => {
        try {
            const [detailsRes, productsRes, orderRes, paymentRes] = await Promise.all([
                axios.get(`${API_BASE}/OrderDetails/Order/${orderId}`),
                axios.get(`${API_BASE}/Products`),
                axios.get(`${API_BASE}/Orders/${orderId}`),
                axios.get(`${API_BASE}/Payments/Order/${orderId}`)
            ]);

            const order = orderRes.data[0];
            const userId = order?.user_id;
            const payment = paymentRes.data[0];

            setSelectedOrder(order);
            setPaymentInfo(payment);

            // Lấy thông tin người đặt (user hoặc guest)
            if (userId) {
                const userRes = await axios.get(`${API_BASE}/Users/${userId}`);
                setCustomerInfo(userRes.data[0]);
            } else {
                const guestRes = await axios.get(`${API_BASE}/Guest/${order?.guest_id}`);
                setCustomerInfo(guestRes.data[0]);
            }

            const productMap = Object.fromEntries(productsRes.data.map((p) => [p.product_id, p]));

            const enriched = detailsRes.data.map((detail) => {
                const product = productMap[detail.product_id] || {};
                const totalPrice = detail.quantity * detail.price * (1 - (detail.discount || 0) / 100);
                return {
                    ...detail,
                    product_name: product.product_name || 'Không rõ',
                    image_url: product.image_url || '',
                    totalPrice
                };
            });

            setOrderDetails(enriched);
            setDetailDialog(true);
        } catch (err) {
            console.error('Lỗi lấy chi tiết đơn hàng:', err);
        }
    };

    const fetchStatuses = async (order) => {
        setSelectedOrder(order);
        try {
            const [payRes, shipRes] = await Promise.all([axios.get(`${API_BASE}/Payments/Order/${order.order_id}`), axios.get(`${API_BASE}/Shipping/Order/${order.order_id}`)]);

            setPaymentStatus(payRes.data?.[0]?.payment_status || 'pending');
            setShippingStatus(shipRes.data?.[0]?.shipping_status || 'pending');
        } catch (err) {
            console.error('Lỗi lấy trạng thái:', err);
        }
        setStatusDialog(true);
    };


    const handleUpdateStatus = async (type) => {
    try {
        if (!selectedOrder) return;

        // ✅ 1. Cập nhật trạng thái thanh toán nếu chưa 'completed'
        if (type === 'payment') {
            const res = await axios.get(`${API_BASE}/Payments/Order/${selectedOrder.order_id}`);
            const payment = res.data[0];
            if (payment?.payment_status !== 'completed') {
                await axios.put(`${API_BASE}/Payments/${selectedOrder.order_id}`, {
                    ...payment,
                    payment_status: 'completed',
                    payment_date: new Date()
                });
                setPaymentStatus('completed');
                toast.current.show({
                    severity: 'success',
                    summary: 'Thanh toán',
                    detail: 'Đã cập nhật trạng thái thanh toán.',
                    life: 3000
                });
            }
        }

        // ✅ 2. Cập nhật trạng thái giao hàng nếu chưa 'delivered'
        if (type === 'shipping') {
            const res = await axios.get(`${API_BASE}/Shipping/Order/${selectedOrder.order_id}`);
            const shipping = res.data[0];
            if (shipping?.shipping_status !== 'delivered') {
                await axios.put(`${API_BASE}/Shipping/${selectedOrder.order_id}`, {
                    ...shipping,
                    shipping_status: 'delivered',
                    shipping_date: new Date()
                });
                setShippingStatus('delivered');
                toast.current.show({
                    severity: 'success',
                    summary: 'Giao hàng',
                    detail: 'Đã cập nhật trạng thái giao hàng.',
                    life: 3000
                });
            }
        }

        // ✅ 3. Kiểm tra nếu cả thanh toán và giao hàng đều hoàn tất thì hoàn tất đơn hàng
        const isPaymentDone = type === 'payment' ? 'completed' : paymentStatus;
        const isShippingDone = type === 'shipping' ? 'delivered' : shippingStatus;

        if (isPaymentDone === 'completed' && isShippingDone === 'delivered') {
            // ✅ 4. Cập nhật trạng thái đơn hàng thành 'completed'
            await axios.put(`${API_BASE}/Orders/${selectedOrder.order_id}`, {
                ...selectedOrder,
                status: 'completed'
            });

            // ✅ 5. Lấy chi tiết đơn hàng
            const detailsRes = await axios.get(`${API_BASE}/OrderDetails/Order/${selectedOrder.order_id}`);

            // ✅ 6. Gom số lượng theo từng product_id + size
            const grouped = {};
            for (const detail of detailsRes.data) {
                const key = `${detail.product_id}_${detail.size}`;
                if (!grouped[key]) {
                    grouped[key] = {
                        product_id: detail.product_id,
                        size: detail.size,
                        quantity: detail.quantity
                    };
                } else {
                    grouped[key].quantity += detail.quantity;
                }
            }

            //7. Kiểm tra tồn kho & cập nhật lại stock
            for (const key in grouped) {
                const { product_id, size, quantity } = grouped[key];

                const variantRes = await axios.get(`${API_BASE}/ProductVariants/${product_id}/${size}`);
                const variant = variantRes.data;

                console.log(`Kiểm tra tồn kho: SP ${product_id}, size ${size} | Cần: ${quantity} | Có: ${variant?.stock}`);

                if (!variant || variant.stock < quantity) {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Thiếu hàng',
                        detail: `Không đủ tồn kho cho sản phẩm ID ${product_id} - size ${size}. Đơn hàng bị huỷ.`,
                        life: 4000
                    });

                    //Huỷ đơn hàng nếu thiếu hàng
                    await axios.delete(`${API_BASE}/Orders/${selectedOrder.order_id}`);
                    setStatusDialog(false);
                    fetchOrders();
                    return;
                }

                //Trừ kho
                const newStock = variant.stock - quantity;
                await axios.put(`${API_BASE}/ProductVariants/${product_id}/${size}`, {
                    ...variant,
                    stock: newStock
                });
            }

            toast.current.show({
                severity: 'success',
                summary: 'Hoàn tất',
                detail: 'Đơn hàng đã hoàn tất và trừ kho theo từng size.',
                life: 3000
            });

            fetchOrders();
            setStatusDialog(false);
        }
    } catch (err) {
        console.error('Lỗi cập nhật trạng thái hoặc trừ kho:', err);
        toast.current.show({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Không thể cập nhật trạng thái hoặc trừ kho.',
            life: 3000
        });
    }
};


    const formatCurrency = (value) => value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    };

    const totalAmount = () => formatCurrency(orderDetails.reduce((acc, cur) => acc + cur.totalPrice, 0));

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <h2>Quản lí đơn hàng</h2>

            <DataTable value={orders} responsiveLayout="scroll">
                <Column field="order_id" header="ID" sortable />
                <Column field="user_id" header="User ID" />
                <Column field="order_date" header="Ngày đặt" body={(row) => formatDate(row.order_date)} />
                <Column field="total_amount" header="Tổng tiền" body={(row) => formatCurrency(row.total_amount)} />
                <Column field="status" header="Trạng thái" />
                <Column
                    header="Thao tác"
                    body={(row) => (
                        <>
                            <Button label="Chi tiết" icon="pi pi-eye" className="p-button-info mr-2" onClick={() => fetchOrderDetails(row.order_id)} />
                            <Button label="Trạng thái" icon="pi pi-pencil" className="p-button-warning" onClick={() => fetchStatuses(row)} disabled={row.status === 'completed'} />
                        </>
                    )}
                />
            </DataTable>

            <Dialog visible={detailDialog} header="Chi tiết đơn hàng" style={{ width: '800px' }} modal onHide={() => setDetailDialog(false)}>
                <div className="mb-4">
                    <h5>Thông tin người đặt:</h5>
                    {customerInfo ? (
                        <div>
                            <p>
                                <strong>Họ tên:</strong> {customerInfo.fullname || 'N/A'}
                            </p>
                            <p>
                                <strong>Email:</strong> {customerInfo.email || 'N/A'}
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong> {customerInfo.phone_number || 'N/A'}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {customerInfo.address || 'N/A'}
                            </p>
                        </div>
                    ) : (
                        <p>Không có thông tin người đặt.</p>
                    )}

                    <h5 className="mt-3">Trạng thái thanh toán:</h5>
                    <p>{paymentInfo?.payment_status === 'completed' ? <span className="text-green-600 font-semibold">Đã thanh toán</span> : <span className="text-red-600 font-semibold">Chưa thanh toán</span>}</p>
                </div>

                <DataTable value={orderDetails} responsiveLayout="scroll">
                    <Column field="product_name" header="Tên sản phẩm" />
                    <Column header="Hình ảnh" body={(row) => (row.image_url ? <img src={row.image_url} width={50} alt="product" /> : 'No image')} />
                    <Column field="size" header="Kích cỡ" />
                    <Column field="quantity" header="Số lượng" />
                    <Column field="price" header="Thành tiền" body={(row) => formatCurrency(row.price)} />
                </DataTable>

                <div className="text-right mt-3">
                    <strong>Tổng tiền: {totalAmount()}</strong>
                </div>
            </Dialog>

            <Dialog
                visible={statusDialog}
                header="Cập nhật trạng thái"
                style={{ width: '400px' }}
                modal
                onHide={() => setStatusDialog(false)}
                footer={<Button label="Đóng" icon="pi pi-times" className="p-button-text" onClick={() => setStatusDialog(false)} />}
            >
                <div className="p-field mb-3">
                    <Button label="Cập nhật thanh toán" className="p-button-success mb-2" onClick={() => handleUpdateStatus('payment')} disabled={paymentStatus === 'completed'} />
                </div>
                <div className="p-field">
                    <Button label="Cập nhật giao hàng" className="p-button-info" onClick={() => handleUpdateStatus('shipping')} disabled={shippingStatus === 'delivered'} />
                </div>
            </Dialog>
        </div>
    );
};

export default OrderAdmin;
