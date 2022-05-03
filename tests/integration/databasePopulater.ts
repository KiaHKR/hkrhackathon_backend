import { dbUser } from "../../src/database/models/db_users";
import { dbPuzzle } from "../../src/database/models/db_puzzles";
import { UserPuzzle } from "../../src/models/userPuzzle";

export async function populateDatabase() {
    const userDB = new dbUser({
        name: "test",
        email: "test@example.com",
        password: "$2b$10$kPLid/ALLlbf27PW6l19GuG.oNZdL3gyFA9abXU4zj58yKMLjwIGW",
        year: 1,
        currentPuzzleId: "firstTestPuzzle",
        userPuzzles: {
            "firstTestPuzzle": new UserPuzzle("firstTestPuzzle", "1 1 1", "1"),
            "secondTestPuzzle": new UserPuzzle("secondTestPuzzle", "2 2 2", "2"),
            "thirdTestPuzzle": new UserPuzzle("thirdTestPuzzle", "3 3 3", "3"),
        }
    });

    const userDB2 = new dbUser({
        name: "test2",
        email: "test2@example.com",
        password: "$2b$10$kPLid/ALLlbf27PW6l19GuG.oNZdL3gyFA9abXU4zj58yKMLjwIGW",
        year: 2,
        currentPuzzleId: "firstTestPuzzle",
        userPuzzles: {
            "firstTestPuzzle": new UserPuzzle("firstTestPuzzle", "11 11 11", "11"),
            "secondTestPuzzle": new UserPuzzle("secondTestPuzzle", "22 22 22", "22"),
            "thirdTestPuzzle": new UserPuzzle("thirdTestPuzzle", "33 33 33", "33"),
        }
    });
    await userDB.save();
    await userDB2.save();

    const puzzle = new dbPuzzle({
        id: "firstTestPuzzle",
        title: "FIRST Test Title",
        story: "This is the story of the FIRST test",
        examples: {
            inputExample: "this is the FIRST input example",
            logicExample: "this is the FIRST logic example",
        }
    });

    const puzzle2 = new dbPuzzle({
        id: "secondTestPuzzle",
        title: "SECOND Test Title",
        story: "This is the story of the SECOND test",
        examples: {
            inputExample: "this is the SECOND input example",
            logicExample: "this is the SECOND logic example",
        }
    });
    await puzzle.save();
    await puzzle2.save();
}
