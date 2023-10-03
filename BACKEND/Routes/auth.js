const express = require('express');
const router = express.Router();
const USER = require('../Models/User');
const { body, validationResult } = require('express-validator');



//create a USER using post :'api/auth'

router.post('/', [
    body('Name', 'Please enter a name with a minimum length of 4 characters').isLength({ min: 4 }),
    body('Email', 'Please enter a valid email').isEmail(),
    body('Password', 'Please enter a password with a minimum length of 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errors = result.array().map(error => error.msg);
        return res.status(400).json({ errors });
    }

    const { Name, Email, Password } = req.body;

    try {
        const existingUser = await USER.findOne({ Email });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const newUser = new USER({ Name, Email, Password });
        await newUser.save();
        return res.json(newUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;