import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from "./routes/auth.route.js"
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import favoriteRoutes from './routes/favorite.route.js';
import userRoutes from './routes/user.route.js';


dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only your frontend URL
  credentials: true,               // Allow credentials (cookies, authorization headers)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization' // Allowed headers
};
  
  app.use(cors(corsOptions));

// Use cookie parser
app.use(cookieParser());
app.use(express.json());



mongoose
.connect(process.env.MONGO_URI)
.then(()=> {
    console.log('Connected to MongoDB!!')
})
.catch((err) => {
    console.log(err);
})

// app.use('/api/user', userRouter)
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/users', userRoutes); 

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
  });


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})