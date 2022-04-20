import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
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
    currentTask: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    userPuzzles: {
        puzzleId: {
            type: Object,  // discuss with Aki
            required: true,
            max: 1024,
            min: 6
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);