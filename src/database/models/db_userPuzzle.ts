import mongoose from 'mongoose';
var userPuzzleSchema = new mongoose.Schema({

    userInput: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    answer: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    completionTime: {
        type: Number,
        required: true,
        min: 3,
        max: 255
    },
    numberOfWrongSubmissions: {
        type: Number

    },
    completed: {
        type: Boolean
    }



})
const dbUserPuzzle = mongoose.model('UserPuzzle', userPuzzleSchema)
export { dbUserPuzzle }