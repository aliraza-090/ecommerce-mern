import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';

const Admin = () => {
  return (
    <div className="admin">
      {/* Sidebar on the left */}
      <Sidebar />
    <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
    </Routes>

      {/* Main Admin Content */}
      <div className="admin-content">
        <h1>Welcome to Admin Panel</h1>
        {/* You can add other admin content here */}
      </div>
    </div>
  );
};

export default Admin;
