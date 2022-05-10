import { dbUser } from "../../src/database/models/db_users";
import { dbPuzzle } from "../../src/database/models/db_puzzles";
import { UserPuzzle } from "../../src/models/userPuzzle";
import { dbpuzzleStorage } from "../../src/database/models/db_puzzleStorage";


export async function populateDatabase() {
    const completedPuzzle = new UserPuzzle("firstTestPuzzle", "1 1 1", "1");
    completedPuzzle.completed = true;
    const uncompletedPuzzle = new UserPuzzle("secondTestPuzzle", "2 2 2", "2");

    const userDB = new dbUser({
        name: "test",
        email: "test@example.com",
        password: "$2b$10$kPLid/ALLlbf27PW6l19GuG.oNZdL3gyFA9abXU4zj58yKMLjwIGW",
        year: 1,
        currentPuzzleId: "firstTestPuzzle",
        userPuzzles: {
            "firstTestPuzzle": completedPuzzle,
            "secondTestPuzzle": uncompletedPuzzle,
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

    const userDB3 = new dbUser({
        name: "test3",
        email: "hkr.hackathon.tester@outlook.com",
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
    await userDB3.save();

    const puzzle1 = new dbPuzzle({
        id: "firstTestPuzzle",
        title: "FIRST Test Title",
        story: "This is the story of the FIRST test",
        examples: {
            inputExample: "this is the FIRST input example",
            logicExample: "this is the FIRST logic example",
        },
        timesCompleted: 1,
        wrongSubmissions: 1,
        firstSolved: {
            name: "test",
            timeStamp: 1519211809934,
        }
    });

    const puzzle2 = new dbPuzzle({
        id: "secondTestPuzzle",
        title: "SECOND Test Title",
        story: "This is the story of the SECOND test",
        examples: {
            inputExample: "this is the SECOND input example",
            logicExample: "this is the SECOND logic example",
        },
        timesCompleted: 2,
        wrongSubmissions: 2,
        firstSolved: {
            name: "test2",
            timeStamp: 1619211809934,
        }
    });

    const puzzle3 = new dbPuzzle({
        id: "thirdTestPuzzle",
        title: "THIRD Test Title",
        story: "This is the story of the THIRD test",
        examples: {
            inputExample: "this is the THIRD input example",
            logicExample: "this is the THIRD logic example",
        },
        timesCompleted: 3,
        wrongSubmissions: 3,
        firstSolved: {
            name: "test3",
            timeStamp: 1719211809934,
        }
    });

    const puzzle4 = new dbPuzzle({
        id: "lastTestPuzzle",
        title: "LAST Test Title",
        story: "This is the story of the LAST test",
        examples: {
            inputExample: "this is the LAST input example",
            logicExample: "this is the LAST logic example",
        },
        timesCompleted: 0,
        wrongSubmissions: 0,
        firstSolved: {
            name: '',
            timeStamp: undefined,
        }
    });
    await puzzle1.save();
    await puzzle2.save();
    await puzzle3.save();
    await puzzle4.save();

    const puzzlestorage = new dbpuzzleStorage({
        storage: [
            { puzzleid: "secondTestPuzzle", visibility: true },
            { puzzleid: "firstTestPuzzle", visibility: true },
            { puzzleid: "thirdTestPuzzle", visibility: false },
            { puzzleid: "lastTestPuzzle", visibility: true },
        ]
    })
    await puzzlestorage.save();
}
