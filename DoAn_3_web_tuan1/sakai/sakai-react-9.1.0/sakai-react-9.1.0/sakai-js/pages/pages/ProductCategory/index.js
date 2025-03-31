import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const ProductCategoryCRUD = () => {
    const [categories, setCategories] = useState([]);
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [category, setCategory] = useState({ category_name: '', category_description: '', category_banner: '' });
    const [isEdit, setIsEdit] = useState(false);
    const toast = useRef(null);
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtbyoxe5k/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'CLOUDINARY_UPLOAD_URL';

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/ProductCategories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const openNew = () => {
        setCategory({ category_name: '', category_description: '', category_banner: '' });
        setIsEdit(false);
        setCategoryDialog(true);
    };

    const hideDialog = () => {
        setCategoryDialog(false);
    };

    const saveCategory = async () => {
        try {
            if (isEdit) {
                await axios.put(`http://127.0.0.1:3000/ProductCategories/${category.category_id}`, category);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Category Updated', life: 3000 });
            } else {
                await axios.post('http://127.0.0.1:3000/ProductCategories', category);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Category Created', life: 3000 });
            }
            fetchCategories();
            setCategoryDialog(false);
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const editCategory = (cat) => {
        setCategory({ ...cat });
        setIsEdit(true);
        setCategoryDialog(true);
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/ProductCategories/${id}`);
            fetchCategories();
            toast.current.show({ severity: 'warn', summary: 'Deleted', detail: 'Category Deleted', life: 3000 });
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const onUpload = async (event) => {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            setCategory({ ...category, category_banner: response.data.secure_url });
            toast.current.show({ severity: 'info', summary: 'Upload Successful', detail: 'Banner uploaded', life: 3000 });
        } catch (error) {
            console.error('Error uploading banner:', error);
        }
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <Button label="New Category" icon="pi pi-plus" className="p-button-success mb-3" onClick={openNew} />
            <h2>Quản lý loại sản phẩm</h2>
            <DataTable value={categories} responsiveLayout="scroll">
                <Column field="category_name" header="Category Name" sortable></Column>
                <Column field="category_description" header="Description"></Column>
                <Column field="category_banner" header="Banner" body={(rowData) => (
                    rowData.category_banner ? <img src={rowData.category_banner} alt={rowData.category_name} width="50" /> : 'No Image'
                )}></Column>
                <Column header="Actions" body={(rowData) => (
                    <>
                        <Button icon="pi pi-pencil" className="p-button-warning mr-2" onClick={() => editCategory(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteCategory(rowData.category_id)} />
                    </>
                )}></Column>
            </DataTable>

            <Dialog visible={categoryDialog} style={{ width: '450px' }} header="Category Details" modal className="p-fluid" footer={
                <>
                    <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                    <Button label="Save" icon="pi pi-check" className="p-button-primary" onClick={saveCategory} />
                </>
            } onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="category_name">Category Name</label>
                    <InputText id="category_name" value={category.category_name} onChange={(e) => setCategory({ ...category, category_name: e.target.value })} required autoFocus />
                </div>
                <div className="p-field">
                    <label htmlFor="category_description">Description</label>
                    <InputText id="category_description" value={category.category_description} onChange={(e) => setCategory({ ...category, category_description: e.target.value })} required />
                </div>
                <div className="p-field">
                    <label>Banner Upload</label>
                    <FileUpload mode="basic" accept="image/*" maxFileSize={20000000} customUpload uploadHandler={onUpload} auto chooseLabel="Upload Banner" />
                    <InputText id="category_banner" value={category.category_banner} onChange={(e) => setCategory({ ...category, category_banner: e.target.value })} placeholder="Banner URL" />
                    {category.category_banner && <img src={category.category_banner} alt="Category Banner" width="100" className="mt-2" />}
                </div>
            </Dialog>
        </div>
    );
};

export default ProductCategoryCRUD;
