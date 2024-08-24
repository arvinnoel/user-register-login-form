const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Get All Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});



// PUT Update User
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, phoneNo, profession } = req.body;

        // Find user by ID and update
        const user = await User.findByIdAndUpdate(userId, { name, email, phoneNo, profession }, { new: true });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// DELETE User
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Check if ID is valid (optional)
        if (!userId) {
            return res.status(400).json({ msg: 'Invalid user ID' });
        }

        // Attempt to find and remove the user
        const result = await User.findByIdAndDelete(userId);

        // Check if user was found and deleted
        if (!result) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message); // Log the error for debugging
        res.status(500).json({ msg: 'Server error' });
    }
});




module.exports = router;
