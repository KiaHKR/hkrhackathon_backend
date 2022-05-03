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
    story: {
        type: String,
        required: true
    },
    examples: {
        inputExample: {
            type: String,
            required: true,
        },
        logicExample: {
            type: String,
            required: true,
        }

    }
}, { minimize: false });



const dbPuzzle = mongoose.model('dbPuzzle', puzzleSchema)
export { dbPuzzle }