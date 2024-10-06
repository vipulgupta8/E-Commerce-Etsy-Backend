# E-CommerceEtsy-Backend

This is the backend for an **E-commerce platform** built using **Node.js**, **Express**, and **MongoDB**. It provides user authentication, product management, handling of favorite products, and shopping cart functionalities. **JWT** is used for authentication, while **bcryptjs** is used for password hashing.
## Features

### User Authentication
- User registration, login, and session management using **JWT**.
- Passwords are securely hashed with **bcryptjs**.
- Users can update or delete their accounts.

### Product Management
- People can create products.
- Products include the following fields:
  - `title`: The name of the product.
  - `price`: The cost of the product.
  - `description`: A detailed description of the product.
  - `images`: Product images.

### Favorites
- Users can add products to their favorites list.
- Users can retrieve their list of favorite products.
- Users can remove products from their favorites list.

### Cart Management
- Users can add products to their shopping cart.
- Users can update product quantities or remove items from the cart.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for API creation.
- **MongoDB**: NoSQL database for storing user and product data.
- **JWT**: Token-based authentication system for securing user sessions.
- **bcryptjs**: Library for password hashing.

## Routes

### Authentication

- **POST** `/api/auth/signup`: Register a new user
- **POST** `/api/auth/signin`: Login an existing user
- **POST** `/api/auth/signout`: Logout the user

### Favorites

- **POST** `/api/favorites/add`: Add a product to favorites
- **GET** `/api/favorites`: Get all favorite products of the user
- **DELETE** `/api/favorites/remove`: Remove a product from favorites

### Cart

- **POST** `/api/cart/add`: Add a product to cart
- **GET** `/api/cart`: Get all the products in cart
- **PUT** `/api/cart/update`: Update a product in cart
- **DELETE** `/api/cart/remove`: Delete a product from cart

### Product Management

- **GET** `/api/products`: Retrieve all products
- **GET** `/api/products/:id`: Retrieve a single product by ID
- **PUT** `/api/products/:id`: Update product information
- **POST** `/api/products/create`: Create a product

### User Management

- **GET** `/api/users/me`: Get logged-in user details
- **PUT** `/api/users/update`: Update logged-in user information
- **DELETE** `/api/users/delete`: Delete user account

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/vipulgupta8/E-CommerceEtsy-Backend.git
    ```
2. **Install dependencies**:

    ```bash
    npm install
    ```
3. **Add Mongo Url, PORT and JWT Secret in .env file**

    ```env
    PORT = 
    MONGO_URI = ""
    JWT_SECRET = ""
    ```
     
5. **Run the development server**:

    ```bash
    npm run dev
    ```
