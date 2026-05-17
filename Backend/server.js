import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from "./routes/foodRoute.js";
import userRouter from './routes/userRoute.js';
import path from 'path';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Database connection
connectDB();

// Middleware
app.use(express.json());

app.use(cors({
    origin: [
        'http://localhost:5174',
        'http://localhost:5173',
        'http://localhost:3000',
        'https://food-delivery-3g3zpkn39-mahendras-projects-22b36856.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Serve uploaded images
app.use('/images', express.static(path.join(process.cwd(), 'uploads')));

// API routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

// Test route
app.get("/", (req, res) => {
    res.send("API WORKING");
});

// Start server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});