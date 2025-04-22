# FWear

FWear is an e-commerce platform designed to offer a seamless shopping experience for fashion enthusiasts. This project encompasses both frontend and backend components, providing a full-stack solution for online retail.

## Features

- **Product Catalog:** Browse a wide range of fashion products with detailed descriptions and images.
- **User Authentication:** Secure login and registration system for users.
- **Shopping Cart:** Add, remove, and manage products in the shopping cart.
- **Order Management:** Place orders and view order history.
- **Admin Dashboard:** Manage products, orders, and users through an intuitive interface

## Technologies Used

- **Backend:** Node.js, Express, Multer, Cloudinary, MongoDB, Mongoose
- **Frontend:** React, Redux, React Router, Axios, JWT, Tailwind CSS
- **Version Control:** Git & GitHub

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository

```bash
git clone https://github.com/Kingyakstha/FWear.git
cd FWear
```
### Backend Setup
It is a demo backend for testing purposes.
Navigate to the backend folder:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Create a .env file and configure the variables:
```env
PORT=
MONGODB_URI=
CORS_ORIGIN=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_SECRET=
CLOUDINARY_API_KEY=
```
Start the server:
```bash
npm run dev
```
The backend server will run on http://localhost:8000.

### Frontend Setup
Open a new terminal and navigate to the frontend folder:
```bash
cd Frontend-Ecom
```
Install dependencies:
```bash
npm install
```
Start the React development server:
```bash
npm run dev
```
The frontend will open in your default browser (usually on http://localhost:5173).

Project Structure
```bash
FWear/
├── Backend-Ecom/                              # Server-side code
│   ├── public/                                # Model files
│   └── src/                                   # Main server file (Express, etc.)
│       ├──controller/                         # Methods/ controllers
│       │   ├── cart.controller.js
│       │   ├── imagencolor.controller.js
│       │   ├── product.controller.js
│       │   ├── qna.controller.js
│       │   ├── rating.controller.js
│       │   ├── review.controller.js
│       │   ├── save.controller.js
│       │   └── user.controller.js
│       ├── db/                                # Database connection
│       │   └── index.js
│       ├── middlewares/                       #middleware
│       │   ├── auth.middleware.js
│       │   └── multer.middleware.js
│       ├── models/                            # Database models
│       │   ├── cart.models.js
│       │   ├── imagencolor.models.js
│       │   ├── product.models.js
│       │   ├── qna.models.js
│       │   ├── rating.models.js
│       │   ├── review.models.js
│       │   ├── save.models.js
│       │   └── user.models.js
│       ├── routes/                            # Different routes and APIs
│       │   ├── cart.routes.js
│       │   ├── imagencolor.routes.js
│       │   ├── product.routes.js
│       │   ├── qna.routes.js
│       │   ├── rating.routes.js
│       │   ├── review.routes.js
│       │   ├── save.routes.js
│       │   └── user.routes.js
│       ├── utils/                            # Utility code components
│       │   ├── ApiError.js
│       │   ├── ApiResponse.js
│       │   ├── asyncHandler.js
│       │   └── cloudinary.js
│       ├── app.js           
│       ├── constants.js        
│       └── index.js            
│       
├── Frontend-Ecom/                            # Client-side React application
│   ├── public/                
│   └── src/
│       ├── Components/                       # Reusable React components
│       │   ├── Assets/                       # Images and other static resources
│       │   ├── Addproduct.jsx
│       │   ├── Breadcrum.js
│       │   ├── CartItems.jsx
│       │   ├── Footer.jsx
│       │   ├── Hero.jsx
│       │   ├── index.jsx
│       │   ├── Input.jsx
│       │   ├── Items.jsx
│       │   ├── Login.jsx
│       │   ├── Navbar.jsx
│       │   ├── NewAddproduct.js
│       │   ├── NewCollections.jsx
│       │   ├── NewsLetters.js
│       │   ├── Offers.jsx
│       │   ├── Popular.jsx
│       │   ├── ProductDisplay.js
│       │   └── Signup.jsx
│       ├── Context/
│       │   ├── authSlice.js
│       │   ├── shopSlice.js
│       │   └── shopStore.js
│       ├── Pages/                             # Page-level components
│       │   ├── AddProduct.jsx
│       │   ├── Cart.jsx
│       │   ├── index.js
│       │   ├── LoginSignup.jsx
│       │   ├── Product.jsx
│       │   ├── Shop.jsx
│       │   └── ShopCategory.jsx
│       ├── App.jsx                            # Root app component
│       ├── index.css                          # Global CSS styles
│       └── main.jsx                           # Application entry point
└── README.md                   
```
