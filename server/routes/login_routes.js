const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Make sure to use the User model here
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'f2334417d9a26857fb4f17502376e89f9fd00aecc9d0f641830c6834d868262ee29805bb129ed3b2bc0851ab7bd2ec85ec44f7de3de1d953ad846e6fbc3b6409';

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
