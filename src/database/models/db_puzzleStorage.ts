import mongoose from 'mongoose';
const puzzleStorageSchema = new mongoose.Schema({

    storage: [{
        puzzleid: String,
        public: Boolean
    }]
})



const dbpuzzleStorage = mongoose.model('dbpuzzleStorage', puzzleStorageSchema)
export { dbpuzzleStorage }
