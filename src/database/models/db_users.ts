import { boolean, number, string } from 'joi';
import mongoose from 'mongoose';
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
    userPuzzles: {
        puzzleId: {
            id: string,
            userInput: string,
            answer: string,
            completetionTime: number,
            numberOfWrongSubmissions: number,
            completed: boolean
        }
    }
    ,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const dbUser = mongoose.model('User', userSchema)
export { dbUser }