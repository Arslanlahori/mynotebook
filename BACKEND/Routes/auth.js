const express = require('express');
const router = express.Router();
const USER = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Secret key
const JWT_SECRET = "Arslanansari@12345isaintelligentboy"



//create a USER using post :'api/auth/createuser'

router.post('/createuser', [
    body('Name', 'Please enter a name with a minimum length of 4 characters').isLength({ min: 4 }),
    body('Email', 'Please enter a valid email').isEmail(),
    body('Password', 'Please enter a password with a minimum length of 5 characters').isLength({ min: 5 })
], async (req, res) => {



    const result = validationResult(req);
    //catch validation 

    if (!result.isEmpty()) {
        const errors = result.array().map(error => error.msg);
        return res.status(400).json({ errors });
    }

    const { Name, Email, Password } = req.body;
    try {
        //chech if user is already exist
        const existingUser = await USER.findOne({ Email });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        //use bcrypt library to convert the password into encrypt password
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.Password, salt)


        //for new user
        const newUser = new USER({ Name, Email, Password: secpassword });
        await newUser.save();
        //use webtoken
        const data = {
            newUser: {
                id: newUser.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        res.json({ token: token });
        // return res.json(newUser);

        //catch error
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Enternal Serve Error" });
    }
});






//Authenticate end point using post :'api/auth/login'

router.post('/login', [

    body('Email', 'Please enter a valid email').isEmail(),
    body('Password', 'Password is not blank').exists()
],
    async (req, res) => {

        const result = validationResult(req);
        //catch validation 

        if (!result.isEmpty()) {
            const errors = result.array().map(error => error.msg);
            return res.status(400).json({ errors });
        }

        const { Email, Password } = req.body;
        try {
            const existingUser = await USER.findOne({ Email });
            if (!existingUser) {
                return res.status(400).json({ error: "Please Enter the valid Credentials" });
            }

            const comparepassword = await bcrypt.compare(Password, existingUser.Password)
            if (!comparepassword) {
                return res.status(400).json({ error: "Please Enter the valid Credentials" });
            }
            const data = {
                existingUser: {
                    id: existingUser.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET);
            res.json({ token: token });
            // return res.json(newUser);

        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Enternal Serve Error" });
        }

    })

module.exports = router;