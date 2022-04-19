import express from "express";
const router = express.Router();
import auth from '../middleware/auth';
import admin from '../middleware/admin';

// ADMIN CRUD OPERATION

// DELETE user.
router.delete('/:email', [auth, admin], async (req, res) => {
    // find user by email and delete it, if not found return 404.
});

// UPDATE user.
router.put('/:email', [auth, admin], async (req, res) => {
    // validate input, if not valid return 400.

    // find user by email and return it, if not found return 404.
});

// GET user.
router.get('/:email', [auth, admin], async (req, res) => {
    // find user by email and return it, if not found return 404.
});

export = router;
