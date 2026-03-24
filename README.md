# VibeVault E-Commerce App

VibeVault is a full-stack e-commerce web application for a modern menswear store. It includes a React frontend, an Express/MongoDB backend, user authentication, protected cart access, and a dedicated collections page.

## Overview

This project is split into two parts:

- `frontend` - React + Vite client application
- `backend` - Express + MongoDB API server

The frontend provides:

- home page with hero, trends, and new arrivals
- dedicated `Collection` page with 40 catalogue cards
- protected cart page
- login and register flow
- mobile hamburger navigation
- custom favicon and branded UI

The backend provides:

- user registration
- user login with JWT
- product listing API
- product creation API

## Tech Stack

### Frontend

- React 19
- React Router
- Vite
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
E - commerce App/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── Images/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## Features

- Responsive menswear storefront
- Mobile hamburger menu
- New arrivals section on home page
- Separate collections page
- Add to cart with local storage persistence
- Protected cart route using login token
- User registration and login
- JWT-based authentication
- Product fetch from backend API
- Fallback showcase catalogue when database has fewer products

## Environment Variables

Create a `.env` file inside [backend](C:\Users\MARIAPPAN\OneDrive\Desktop\E - commerce App\backend) with:

```env
DB=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Notes:

- `DB` is required by [server.js](C:\Users\MARIAPPAN\OneDrive\Desktop\E - commerce App\backend\server.js)
- `JWT_SECRET` is optional in the current code, but recommended

## Installation

### 1. Clone or open the project

```bash
cd "E - commerce App"
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

## Run the Project

Open two terminals.

### Start backend

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Start frontend

```bash
cd frontend
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
npm run dev
npm start
```

## API Endpoints

### User Routes

Base URL:

```text
/api/users
```

- `POST /register` - create a new user
- `POST /login` - login user and return JWT token

### Product Routes

Base URL:

```text
/api/products
```

- `GET /` - fetch all products
- `POST /add` - add a new product

## Sample Request Bodies

### Register

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Add Product

```json
{
  "name": "Classic Shirt",
  "price": 1499
}
```

## Frontend Pages

- `/` - Home page
- `/collections` - Full collection page with 40 product cards
- `/cart` - Protected cart page
- `/login` - Login and register page

## Current Behavior

- Home page shows 12 `New Arrivals`
- Collection page shows 40 items
- Cart is stored in local storage
- Authentication token is stored in local storage
- If MongoDB has only a few products, showcase items are used to fill the UI

## Important Notes

- The frontend currently fetches products from `http://localhost:5000/api/products`
- The cart is client-side only
- The collection page uses curated image data for display
- Payment flow is not implemented yet
- Order placement is not implemented yet

## Future Improvements

- Add admin dashboard for product management
- Add order placement and checkout
- Add payment gateway integration
- Add image upload for products
- Add user profile page
- Add product details page
- Add search and filtering

## Branding

- Site name: `VibeVault`
- Favicon uses the project logo from:
  [logo-image 01.png](C:\Users\MARIAPPAN\OneDrive\Desktop\E - commerce App\frontend\public\Images\logo-image 01.png)

## Author

Created as a full-stack e-commerce project using React, Node, Express, and MongoDB.
