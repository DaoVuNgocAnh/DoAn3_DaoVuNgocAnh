import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtbyoxe5k/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'CLOUDINARY_UPLOAD_URL';

const ProductCRUD = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState({ product_name: '', description: '', price: 0, stock: 0, image_url: '', category_id: '' });
    const [isEdit, setIsEdit] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/Products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/ProductCategories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const openNew = () => {
        setProduct({ product_name: '', description: '', price: 0, stock: 0, image_url: '', category_id: '' });
        setIsEdit(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setProductDialog(false);
    };

    const saveProduct = async () => {
        try {
            if (isEdit) {
                await axios.put(`http://127.0.0.1:3000/Products/${product.product_id}`, product);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product Updated', life: 3000 });
            } else {
                await axios.post('http://127.0.0.1:3000/Products', product);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product Created', life: 3000 });
            }
            fetchProducts();
            setProductDialog(false);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const editProduct = (prod) => {
        setProduct({ ...prod });
        setIsEdit(true);
        setProductDialog(true);
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/Products/${id}`);
            fetchProducts();
            toast.current.show({ severity: 'warn', summary: 'Deleted', detail: 'Product Deleted', life: 3000 });
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const onUpload = async (event) => {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            setProduct({ ...product, image_url: response.data.secure_url });
            toast.current.show({ severity: 'info', summary: 'Upload Successful', detail: 'Image uploaded to Cloudinary', life: 3000 });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.current.show({ severity: 'error', summary: 'Upload Failed', detail: 'Error uploading image', life: 3000 });
        }
    };

    const formatCurrencyVND = (value) => {
        return value?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <Button label="New Product" icon="pi pi-plus" className="p-button-success mb-3" onClick={openNew} />
            <h2>Quản lí sản phẩm</h2>
            <DataTable value={products} responsiveLayout="scroll">
                <Column field="product_id" header="id" sortable></Column>
                <Column field="product_name" header="Name" sortable></Column>
                <Column field="description" header="Description"></Column>
                <Column field="price" header="Price" sortable body={(rowData) => formatCurrencyVND(rowData.price)} />
                <Column field="stock" header="Stock" sortable></Column>
                <Column field="category_id" header="Category"></Column>
                <Column field="image_url" header="Image" body={(rowData) => (rowData.image_url ? <img src={rowData.image_url} alt={rowData.product_name} width="50" /> : 'No Image')}></Column>
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <>
                            <Button icon="pi pi-pencil" className="p-button-warning mr-2" onClick={() => editProduct(rowData)} />
                            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteProduct(rowData.product_id)} />
                        </>
                    )}
                ></Column>
            </DataTable>

            <Dialog
                visible={productDialog}
                style={{ width: '450px' }}
                header="Product Details"
                modal
                className="p-fluid"
                footer={
                    <>
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                        <Button label="Save" icon="pi pi-check" className="p-button-primary" onClick={saveProduct} />
                    </>
                }
                onHide={hideDialog}
            >
                <div className="p-field">
                    <label htmlFor="category_id">Category</label>
                    <Dropdown
                        id="category_id"
                        value={product.category_id}
                        options={categories}
                        onChange={(e) => setProduct({ ...product, category_id: e.value })}
                        optionLabel="category_name"
                        placeholder="Select a Category"
                        optionValue="category_id"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="product_name">Name</label>
                    <InputText id="product_name" value={product.product_name} onChange={(e) => setProduct({ ...product, product_name: e.target.value })} required autoFocus />
                </div>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputText id="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
                </div>
                <div className="p-field">
                    <label htmlFor="price">Price</label>
                    <InputText id="price" type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
                </div>
                <div className="p-field">
                    <label htmlFor="stock">Stock</label>
                    <InputText id="stock" type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} required />
                </div>
                <div className="p-field">
                    <label>Image Upload</label>
                    <FileUpload mode="basic" accept="image/*" maxFileSize={40000000} customUpload uploadHandler={onUpload} auto chooseLabel="Upload Image" />
                    <InputText id="image_url" value={product.image_url} onChange={(e) => setProduct({ ...product, image_url: e.target.value })} placeholder="Image URL" />
                    {product.image_url && <img src={product.image_url} alt="Product" width="100" className="mt-2" />}
                </div>
            </Dialog>
        </div>
    );
};

export default ProductCRUD;
