# MERN E-Commerce Platform

**Developer:** Ali Raza Chakrani  
**Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js)  

## Project Overview

Full-stack MERN e-commerce platform with integrated customer storefront and admin dashboard. Single frontend application serves both customer and admin interfaces, and a single backend serves all APIs.

## Features

### Customer Features
- Home page with banners, popular products, and new collections
- Product listing by category (Men/Women/Kids)
- Product details page with image, price, and related products
- Shopping cart
- User registration and login (JWT-based authentication)
- Order/cart sync with backend for authenticated users
- Responsive UI

### Admin Features
- Admin dashboard
- Add new products (with image upload)
- List/manage products
- Routes: /admin, /admin/addproduct, /admin/listproduct

### Backend
- REST APIs for products, users, cart
- JWT authentication
- Image upload with Multer
- MongoDB with Mongoose
- CORS enabled

## Project Structure

``text

ecommerce-mern/
+-- frontend/        # React + Vite app (customer + admin)
¦   +-- src/
¦   ¦   +-- components/ (customer + admin components)
¦   ¦   +-- pages/      (customer + admin pages)
¦   ¦   +-- contexts/
¦   ¦   +-- App.jsx
¦   +-- package.json
+-- backend/         # Express + Node.js API
¦   +-- index.js
¦   +-- upload/
¦   +-- package.json
+-- README.md
``n
## Installation

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas/local instance

### Backend Setup
`ash
cd backend
npm install
# Copy .env.example to .env and update values
npm run dev
` 

### Frontend Setup
`ash
cd frontend
npm install
# Copy .env.example to .env if needed
npm run dev
` 

## Environment Variables

**backend/.env**
`env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
` 

**frontend/.env.example**
`env
VITE_API_URL=http://localhost:4000
` 

## Running the App
- Frontend: http://localhost:5173 (default Vite port)
- Backend: http://localhost:4000
- Admin: accessible via /admin in the frontend app

## Authentication
- Customers can register/login via /login
- JWT token stored in localStorage as auth-token
- Admin routes are under /admin

