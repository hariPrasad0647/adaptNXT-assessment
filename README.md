# 🛒 Simple E-Commerce API Backend

This is a Node.js + Express backend for a simple e-commerce platform, using MongoDB for data storage and JWT for authentication.

---

## 📦 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- dotenv for environment variables

---

## 📁 Project Structure
```
Ecommerce-api-backend/
├── server.js
├── app.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── middleware/
│   └── authMiddleware.js
├── .env.example
└── .gitignore
```

---

## 🔧 Setup Instructions

1. **Clone the repository:**
```bash
git clone <repo_url>
cd Ecommerce-api-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file and use the template:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
```

4. **Run the server:**
```bash
npm start
```
Server will start on `http://localhost:5000`

---

## 🔐 Authentication
- **JWT-based auth** using Authorization header:
```
Authorization: Bearer <token>
```

---

## 📌 API Routes

### 🔑 Auth
| Method | Route                  | Description           |
|--------|------------------------|-----------------------|
| POST   | `/api/auth/register`  | Register new user     |
| POST   | `/api/auth/login`     | Login and get token   |

### 📦 Products
| Method | Route                     | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | `/api/products`           | Get paginated list of products       |
| GET    | `/api/products/:id`       | Get single product by ID             |
| POST   | `/api/products`           | Create product (Admin only)          |
| PUT    | `/api/products/:id`       | Update product (Admin only)          |
| DELETE | `/api/products/:id`       | Delete product (Admin only)          |

### 🛒 Cart (Customer Only)
| Method | Route                   | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/api/cart`            | View current cart               |
| POST   | `/api/cart`            | Add item to cart                |
| PUT    | `/api/cart/:itemId`    | Update item quantity            |
| DELETE | `/api/cart/:itemId`    | Remove item from cart           |

### 📦 Orders (Customer Only)
| Method | Route               | Description               |
|--------|---------------------|---------------------------|
| POST   | `/api/orders`       | Place an order            |
| GET    | `/api/orders`       | View my orders            |

---

## ✅ User Roles
- **Customer**: Can register, login, browse products, manage cart, and place orders.
- **Admin**: Can manage products (create, update, delete).

---

## 📬 Contact
For any queries, feel free to raise an issue.

---

> Developed by Hari Prasad
