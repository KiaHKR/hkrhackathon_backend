import { dbUser } from "../../src/database/models/db_users";
import { dbPuzzle } from "../../src/database/models/db_puzzles";

export async function depopulateDatabase() {
    await dbUser.remove();
    await dbPuzzle.remove();
}
