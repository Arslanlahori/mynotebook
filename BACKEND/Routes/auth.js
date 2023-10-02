const express = require('express');
const router = express.Router();
const USER = require('../Models/User');


//create a USER using post :'api/auth'

router.post('/', (req, res) => {
    console.log(req.body);
    const users = USER(req.body);
    users.save()
    res.send(req.body);
})

module.exports = router;