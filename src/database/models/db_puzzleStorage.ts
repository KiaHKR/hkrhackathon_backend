import mongoose from 'mongoose';
const puzzleStorageSchema = new mongoose.Schema({

    storage: [{
        puzzleid: {
            type: String,
            required: true
        },
        visibility: {
            type: Boolean,
            required: true,
            default: true
        }
    }]
})



const dbpuzzleStorage = mongoose.model('dbpuzzleStorage', puzzleStorageSchema)
export { dbpuzzleStorage }