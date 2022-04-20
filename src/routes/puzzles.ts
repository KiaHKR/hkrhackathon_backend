import express from "express";
const router = express.Router();
import auth from '../middleware/auth';
import admin from '../middleware/admin';

router.get('/', auth, async (req, res) => {
    // dbHandler: GET all the puzzles.
});

router.get('/:email/:puzzleId', auth, async (req, res) => {
    // dbHandler: GET userObject.
    // dbHandler: GET puzzleObject.

    // If User has puzzle id stored, return that.

    // Else puzzleHandler: GET puzzleObject, and save it to the userObject, then return puzzleObject.

});

router.post('/:email', auth, async (req, res) => {
   // dbHandler: GET userObject.

   // If user has not the puzzleId, return error.

   // check the answer against the stored value and return appropriate response.
});

export = router;
