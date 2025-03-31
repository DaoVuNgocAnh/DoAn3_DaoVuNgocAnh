import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutUs/AboutPage';
import ProductPage from './Product/Product';
import ContactPage from './Contact/Contact';
import SigninPage from './sign-in/sign-in';
import ResponsiveNavbar from './ResponsiveNavbar';
import Footer from './Footer';
import ProductDetail from "./ProductDetail/ProductDetail";
import CartPage from './Cart/Cart';
import Profile from './profile/profile';
import Payment from './Payment/Payment';
import EditProfile from './profile/EditProfile';

function App() {
  return (
    <Router> {/* Bọc toàn bộ ứng dụng trong Router */}
      <ResponsiveNavbar />
      <div className="container">
        <Routes> {/* Định nghĩa các route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ProductDetails/:id" element={<ProductDetail />} />
          <Route path="/Product/:categoryId" element={<ProductPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/sign_in' element={<SigninPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/Payment' element={<Payment />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
