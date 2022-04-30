import { dbUser } from "../../src/database/models/db_users";
import { dbPuzzle } from "../../src/database/models/db_puzzles";

export async function populateDatabase() {
    const userDB = new dbUser({
        name: "test",
        email: "test@example.com",
        password: "$2b$10$kPLid/ALLlbf27PW6l19GuG.oNZdL3gyFA9abXU4zj58yKMLjwIGW",
        year: 1,
        currentPuzzleId: "firstTestPuzzle",
        userPuzzles: {
            "firstTestPuzzle": {
                _id: "firstTestPuzzle",
                _userInput: "1 2 3",
                _answer: "2"
            }
        }
    });
    await userDB.save();

    const puzzle = new dbPuzzle({
        id: "firstTestPuzzle",
        title: "First Test Title",
        story: "This is the story of the first test",
        description: {
            inputExample: "this is the input example",
            logicExample: "this is the logic example",
        }
    });
    puzzle.save();
}
