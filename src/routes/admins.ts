import express from "express";
const router = express.Router();
import auth from '../middleware/auth';
import admin from '../middleware/admin';

// ADMIN CRUD OPERATION

// DELETE user.
router.delete('/:email', [auth, admin], async (req, res) => {
    // dbHandler: DELETE userObject by email. If not found, return error.
});

// UPDATE user.
router.put('/:email', [auth, admin], async (req, res) => {
    // validate input, if not valid return 400.

    // dbHandler: GET userObject. If not found, return error.
});

// GET user.
router.get('/:email', [auth, admin], async (req, res) => {
    // dbHandler: GET userObject. If not found, return error.
});

// GET all the users
router.get('/', [auth, admin], async (req, res) => {
    // dbHandler: GET ALL userObjects.
});

export = router;
