import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

const Dashboard = () => {
    const [orders, setOrders] = useState(0);
    const [revenue, setRevenue] = useState({});
    const [customers, setCustomers] = useState({});
    const [comments, setComments] = useState({});
    const [bestSelling, setBestSelling] = useState([]);
    const [chartData, setChartData] = useState(null);

    const formatCurrencyVND = (value) => {
        return Number(value).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    };

    const fetchData = async () => {
        try {
            const [ordersRes, productsRes, categoriesRes, orderDetailsRes, usersRes, guestsRes] = await Promise.all([
                axios.get('http://127.0.0.1:3000/Orders'),
                axios.get('http://127.0.0.1:3000/Products'),
                axios.get('http://127.0.0.1:3000/ProductCategories'),
                axios.get('http://127.0.0.1:3000/OrderDetails'),
                axios.get('http://127.0.0.1:3000/Users'),
                axios.get('http://127.0.0.1:3000/Guest')
            ]);
            // Tổng đơn hàng
            setOrders({ total: ordersRes.data.length });

            // Lọc đơn hàng đã hoàn thành
            const completedOrders = ordersRes.data.filter((order) => order.status === 'completed');

            // Tổng đơn hàng = tổng tiền từ đơn hoàn thành
            const totalOrderAmount = completedOrders.reduce((sum, order) => sum + order.total_amount, 0);

            // Tổng doanh thu cũng = tổng tiền từ đơn hoàn thành (giả định luôn là completed mới tính doanh thu)
            setRevenue({
                total: totalOrderAmount.toFixed(2), // định dạng 2 chữ số thập phân
                change: 15 // giả định tăng 15%
            });

            // Tổng khách hàng
            setCustomers({ total: guestsRes.data.length + usersRes.data.length, new: 12 }); // giả định 12 mới

            // Bình luận (giả lập)
            setComments({ unread: 5, responded: 8 });

            // Top sản phẩm bán chạy (giả lập)
            const bestSellingMock = productsRes.data.slice(0, 3).map((p, index) => ({
                name: p.name,
                category: categoriesRes.data.find((cat) => cat.id === p.category_id)?.name || 'Không rõ',
                percentage: 30 - index * 10
            }));
            setBestSelling(bestSellingMock);

            // Dữ liệu biểu đồ doanh thu giả lập
            const mockChartData = {
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
                datasets: [
                    {
                        label: 'Doanh thu',
                        data: [500, 800, 1200, 1000, 1400],
                        fill: false,
                        borderColor: '#42A5F5',
                        tension: 0.4
                    }
                ]
            };
            setChartData(mockChartData);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu dashboard:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(orders.total);
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Tổng đơn hàng */}
            <Card>
                <div className="p-4 flex items-center gap-4">
                    <i className="pi pi-shopping-cart text-blue-500"></i> {/* PrimeIcons: Giỏ hàng */}
                    <div>
                        <div className="text-900 font-medium text-xl">{orders.total || 0}</div>
                        <span className="text-500 text-sm">Tổng đơn hàng</span>
                    </div>
                </div>
            </Card>

            {/* Doanh thu */}
            <Card>
                <div className="p-4 flex items-center gap-4">
                    <i className="pi pi-dollar text-green-500"></i> {/* PrimeIcons: Đồng tiền */}
                    <div>
                        <div className="text-900 font-medium text-xl">{formatCurrencyVND(revenue.total)}</div>
                        <span className="text-500 text-sm">Tổng doanh thu</span>
                        <div className="text-green-500 text-sm">+{revenue.change || 0}%</div>
                    </div>
                </div>
            </Card>

            {/* Khách hàng */}
            <Card>
                <div className="p-4 flex items-center gap-4">
                    <i className="pi pi-users text-orange-500"></i> {/* PrimeIcons: Người dùng */}
                    <div>
                        <div className="text-900 font-medium text-xl">{customers.total || 0}</div>
                        <span className="text-500 text-sm">Tổng khách hàng</span>
                        <div className="text-green-500 text-sm">+{customers.new || 0} mới</div>
                    </div>
                </div>
            </Card>

            {/* Bình luận */}
            <Card>
                <div className="p-4 flex items-center gap-4">
                    <i className="pi pi-comment text-purple-500"></i> {/* PrimeIcons: Bình luận */}
                    <div>
                        <div className="text-900 font-medium text-xl">{comments.unread || 0}</div>
                        <span className="text-500 text-sm">Bình luận chưa đọc</span>
                        <div className="text-green-500 text-sm">+{comments.responded || 0} đã phản hồi</div>
                    </div>
                </div>
            </Card>

            {/* Sản phẩm bán chạy */}
            <Card className="col-span-1 md:col-span-2">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Top sản phẩm bán chạy</h2>
                    <ul className="space-y-2">
                        {bestSelling.map((item, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-gray-500">{item.category}</div>
                                </div>
                                <Badge>{item.percentage}%</Badge>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>

            {/* Biểu đồ */}
            <Card className="col-span-1 md:col-span-2">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Tổng quan doanh thu</h2>
                    {chartData ? <Chart type="line" data={chartData} /> : <p>Đang tải biểu đồ...</p>}
                </div>
            </Card>

            {/* CTA */}
            <div className="col-span-1 md:col-span-2 flex justify-end">
                <Button className="flex items-center gap-2">
                    <i className="pi pi-plus"></i> {/* PrimeIcons: Thêm */}
                    Tạo đơn hàng mới
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
