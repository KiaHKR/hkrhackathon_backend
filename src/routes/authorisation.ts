import express from "express";
const router = express.Router();
import auth from '../middleware/auth';

router.get('/', auth, async (req, res) => {
    // return user based on token email.
});

export = router;
