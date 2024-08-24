const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB without deprecated options
        const conn = await mongoose.connect('mongodb://localhost:27017/ClippetAssesment');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
