import React from 'react';
import './Admin.css';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../components/Admin/AddProduct/AddProduct';
import ListProduct from '../../components/Admin/ListProduct/ListProduct';

const Admin = () => {
  return (
    <div className="admin">
      {/* Sidebar on the left */}
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route path='/' element={<h1>Welcome to Admin Panel</h1>} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
