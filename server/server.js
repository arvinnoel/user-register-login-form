const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users_routes');
const authRoutes = require('./routes/auth_routes');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
