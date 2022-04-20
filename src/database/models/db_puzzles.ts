import mongoose from 'mongoose';
const puzzleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    title: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    description: {
        inputExample: {
            type: String,
            required: true,
        },
        logicExample: {
            type: String,
            required: true,
        }

    },
    template: {
        type: String
    },
    answer: {
        type: String
    }
});



module.exports = mongoose.model('Puzzle', puzzleSchema);
