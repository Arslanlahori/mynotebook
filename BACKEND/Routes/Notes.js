const express = require('express');
const router = express.Router();
const NOTES = require('../Models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//create 2 route for geting notes --login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await NOTES.find({ User: req.newUser })
        console.log(notes)
        res.json(notes);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Enternal Serve Error" });

    }

})

//create 1 route for add notes on database --login required

router.post('/addnotes', fetchuser, [
    body('Title', 'Please enter Title with a minimum length of 4 characters').isLength({ min: 4 }),
    body('Description', 'Please enter a Description with a minimum length of 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        try {
            const result = validationResult(req);
            //catch validation 

            if (!result.isEmpty()) {
                const errors = result.array().map(error => error.msg);
                return res.status(400).json({ errors: 'validation error' });
            }


            const { Title, Description, Tag } = req.body;
            const notes = new NOTES({ Title, Description, Tag, User: req.newUser })
            const savednotes = await notes.save()
            console.log(savednotes)
            res.json(savednotes);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Enternal Serve Error" });

        }

    })

module.exports = router;