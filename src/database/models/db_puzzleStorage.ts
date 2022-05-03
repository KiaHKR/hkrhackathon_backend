import mongoose from 'mongoose';
const puzzleStorageSchema = new mongoose.Schema({

    storage: [{
        puzzleid: String,
        visibility: Boolean
    }]
}, { minimize: false })



const dbpuzzleStorage = mongoose.model('dbpuzzleStorage', puzzleStorageSchema)
export { dbpuzzleStorage }
