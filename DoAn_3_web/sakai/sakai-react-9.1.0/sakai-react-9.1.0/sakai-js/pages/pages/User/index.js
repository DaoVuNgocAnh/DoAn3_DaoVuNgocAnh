import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtbyoxe5k/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'CLOUDINARY_UPLOAD_URL';

const UserCRUD = () => {
    const [users, setUsers] = useState([]);
    const [userDialog, setUserDialog] = useState(false);
    const [user, setUser] = useState({ fullname: '', username: '', email: '', phone_number: '', image_user: '' });
    const toast = useRef(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/Users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const openNew = () => {
        setUser({ fullname: '', username: '', email: '', phone_number: '', image_user: '' });
        setUserDialog(true);
    };

    const hideDialog = () => {
        setUserDialog(false);
    };

    const saveUser = async () => {
        try {
            await axios.post('http://127.0.0.1:3000/Users/register', user);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User Created', life: 3000 });
            fetchUsers();
            setUserDialog(false);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/Users/${id}`);
            fetchUsers();
            toast.current.show({ severity: 'warn', summary: 'Deleted', detail: 'User Deleted', life: 3000 });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const onUpload = async (event) => {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            setUser({ ...user, image_user: response.data.secure_url });
            toast.current.show({ severity: 'info', summary: 'Upload Successful', detail: 'Image uploaded to Cloudinary', life: 3000 });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.current.show({ severity: 'error', summary: 'Upload Failed', detail: 'Error uploading image', life: 3000 });
        }
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <Button label="New User" icon="pi pi-plus" className="p-button-success mb-3" onClick={openNew} />
            <h2>Quản lí người dùng</h2>
            <DataTable value={users} responsiveLayout="scroll">
                <Column field="fullname" header="FullName" sortable></Column>
                <Column field="username" header="UserName"></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="phone_number" header="PhoneNumber" sortable></Column>
                <Column field="image_user" header="Image" body={(rowData) => (rowData.image_user ? <img src={rowData.image_user} alt={rowData.fullname} width="50" /> : 'No Image')}></Column>
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <>
                            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteUser(rowData.user_id)} />
                        </>
                    )}
                ></Column>
            </DataTable>

            <Dialog
                visible={userDialog}
                style={{ width: '450px' }}
                header="Product Details"
                modal
                className="p-fluid"
                footer={
                    <>
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                        <Button label="Save" icon="pi pi-check" className="p-button-primary" onClick={saveUser} />
                    </>
                }
                onHide={hideDialog}
            >
                <div className="p-field">
                    <label htmlFor="fullname">FullName</label>
                    <InputText id="FullName" value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} required autoFocus />
                </div>
                <div className="p-field">
                    <label htmlFor="username">UserName</label>
                    <InputText id="UserName" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
                </div>
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText id="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                </div>
                <div className="p-field">
                    <label htmlFor="phone_number">PhoneNumber</label>
                    <InputText id="PhoneNumber" value={user.phone_number} onChange={(e) => setUser({ ...user, phone_number: e.target.value })} required />
                </div>
                <div className="p-field">
                    <label>Image Upload</label>
                    <FileUpload mode="basic" accept="image/*" maxFileSize={20000000} customUpload uploadHandler={onUpload} auto chooseLabel="Upload Image" />
                    <InputText id="image_user" value={user.image_user || ''} onChange={(e) => setUser({ ...user, image_user: e.target.value })} placeholder="Image URL" />
                    {user.image_user && <img src={user.image_user} alt="User" width="100" className="mt-2" />}
                </div>
            </Dialog>
        </div>
    );
};

export default UserCRUD;
