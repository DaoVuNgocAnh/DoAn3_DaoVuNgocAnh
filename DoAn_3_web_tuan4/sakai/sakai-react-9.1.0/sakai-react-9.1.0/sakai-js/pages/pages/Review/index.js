import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const ProductReviewCRUD = () => {
    const [reviews, setReviews] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/Reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const deleteReview = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/Reviews/${id}`);
            fetchReviews();
            toast.current.show({ severity: 'warn', summary: 'Deleted', detail: 'Review Deleted', life: 3000 });
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const formatDate = (dateObj) => {
        const date = new Date(dateObj);
        date.setHours(date.getHours()); // Cộng thêm 7 tiếng cho giờ Việt Nam
      
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
      
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <h2>Quản lý đánh giá sản phẩm</h2>
            <DataTable value={reviews} responsiveLayout="scroll">
                <Column field="product_id" header="Product ID" sortable></Column>
                <Column field="user_id" header="User ID" sortable></Column>
                <Column field="rating" header="Rating" sortable></Column>
                <Column field="comment" header="Comment"></Column>
                <Column field="review_date" header="Review Date" body={(rowData) => formatDate(rowData.review_date)} sortable></Column>
                <Column header="Actions" body={(rowData) => (
                    <>
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteReview(rowData.review_id)} />
                    </>
                )}></Column>
            </DataTable>
        </div>
    );
};

export default ProductReviewCRUD;
