const express = require('express');
const router = express.Router();
const USER = require('../Models/User');
const { body, validationResult } = require('express-validator');



//create a USER using post :'api/auth'

router.post('/', [
    body('Name', 'please enter name whose length greater than 4').isLength({ min: 4 }),
    body('Email', 'please enter valid email').isEmail(),
    body('Password', 'please enter Password whose length greater than 5').isLength({ min: 5 })

], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        //const users = USER(req.body)
        // users.save()  
        USER.create(
            {
                Name: req.body.Name,
                Email: req.body.Email,
                Password: req.body.Password
            }).then(user => res.JSON(user));
        return res.send(`Your data, ${JSON.stringify(req.body)}!`);

    }

    // console.log(req.body);
    // const users = USER(req.body);
    // users.save()

    res.send({ errors: result.array() });


})

module.exports = router;