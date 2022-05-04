import { dbUser } from "../../src/database/models/db_users";
import { dbPuzzle } from "../../src/database/models/db_puzzles";
import { dbpuzzleStorage } from "../../src/database/models/db_puzzleStorage";

export async function depopulateDatabase() {
    await dbUser.deleteMany();
    await dbPuzzle.deleteMany();
    await dbpuzzleStorage.deleteMany();
}
