import {dbUser} from "../../src/database/models/db_users";
import {dbUserPuzzle} from "../../src/database/models/db_userPuzzle";
import {dbPuzzle} from "../../src/database/models/db_puzzles";

export async function depopulateDatabase() {
    await dbUser.remove();
    await dbUserPuzzle.remove();
    await dbPuzzle.remove();
}
