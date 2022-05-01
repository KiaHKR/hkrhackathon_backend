import mongoose from 'mongoose';
import { UserPuzzle } from '../../models/userPuzzle';
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        unique: true,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    year: {
        type: Number,
        required: true
    },
    currentPuzzleId: {
        type: String,
        required: false,
        max: 1024,
        min: 6
    },
    userPuzzles: [{
        userPuzzle: {
            type: UserPuzzle,
            required: true
        }
    }]
    ,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const dbUser = mongoose.model('User', userSchema)
export { dbUser }