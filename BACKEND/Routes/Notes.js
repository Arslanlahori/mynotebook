const express = require('express');
const router = express.Router();
const NOTES = require('../Models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../Models/Notes');


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

// Route 3: Update a note using the PUT method (login required) /api/Notes/update/:id
router.put('/update/:id', fetchuser, async (req, res) => {
    const { Title, Description, Tag } = req.body;

    // Create a new notes object
    const newNotes = {};
    if (Title) { newNotes.Title = Title; }
    if (Description) { newNotes.Description = Description; }
    if (Tag) { newNotes.Tag = Tag; }

    try {
        // Find the note to be updated
        let note = await NOTES.findById(req.params.id);

        // If the note is not found
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Check if the user making the request is the owner of the note
        if (note.User.toString() !== req.newUser) {
            return res.status(401).json({ error: 'Not allowed' });
        }

        // Update the note
        note = await NOTES.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        return res.json({ note });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }





});
//Route no 4 Detele a note login is required

router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await NOTES.findById(req.params.id);

        // If the note is not found
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Check if the user making the request is the owner of the note
        if (note.User.toString() !== req.newUser) {
            return res.status(401).json({ error: 'Not allowed' });
        }

        // Delete the note
        note = await NOTES.findByIdAndDelete(req.params.id);
        return res.json({ Response: "Successfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

});

module.exports = router;