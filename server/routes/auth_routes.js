const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing

const jwt = require('jsonwebtoken');

const JWT_SECRET = '1d16ce5749a47778cb9bddbd5519eafad4df89b030f9409f51a8b1e553cd64142ff798efab6be949cb9d35425b7476ea4ce555600e922807a914723a508f3177'; // Use a secure JWT secret

// Get All Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phoneNo, profession } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10), // Hash password before saving
            phoneNo,
            profession
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request:', { email, password });

        // Find the user by email
        let user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful:', { token });

        // Send the token and success message
        res.json({ token, msg: 'Login successful' });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
