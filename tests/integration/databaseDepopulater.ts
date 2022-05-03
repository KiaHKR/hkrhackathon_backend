import { dbUser } from "../../src/database/models/db_users";
import { dbPuzzle } from "../../src/database/models/db_puzzles";
import {dbpuzzleStorage} from "../../src/database/models/db_puzzleStorage";

export async function depopulateDatabase() {
    await dbUser.remove();
    await dbPuzzle.remove();
    await  dbpuzzleStorage.remove();
}
