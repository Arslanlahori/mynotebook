const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        name: "arslan",
        number: 12345
    }
    res.json(obj);
})

module.exports = router;