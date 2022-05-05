import {config} from "dotenv";
import jwt from "jsonwebtoken";
import {User} from "../../../src/models/user";
import {UserPuzzle} from "../../../src/models/userPuzzle";
import {dbUser} from "../../../src/database/models/db_users";
const userDB = new dbUser;
config();

describe('User', () => {
    let user: User;
    let userPuzzle: UserPuzzle;

    beforeEach(() => {
        user = new User("name", "test@tester.com", "password", 1);
        userPuzzle = new UserPuzzle("test", "1 2 3", "2");

    });

    describe('generateAuthToken', () => {
        it('should return a valid JWT', function () {
            const token = user.generateAuthToken();
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            expect(decoded).toMatchObject({ email: "test@tester.com" });
        });
    });

    describe('userPuzzles', () => {
        it('should add a userPuzzle to user', function () {
            expect(user.getPuzzle("test")).toBeUndefined();
            user.addPuzzle(userPuzzle);

            expect(user.getPuzzle("test")).not.toBeNull();
            expect(user.currentPuzzleId).toBe("test");
        });
    });

    describe('correct()', () => {
        it('should alter complete and completion time fields', function () {
            const userPuzzle = new UserPuzzle("test", "1 1 1", "1");
            userPuzzle.correct();

            expect(userPuzzle.completionTime).not.toBeUndefined();
            expect(userPuzzle.completed).toBeTruthy();
        });
    });

    describe('removePuzzle()', () => {
        it('should remove all user\'s puzzles', function () {
            expect(user.userPuzzles).toMatchObject({});

            user.addPuzzle(userPuzzle);
            expect(user.userPuzzles).toMatchObject({"test": {}});

            user.removePuzzles()
            expect(user.userPuzzles).toMatchObject({});
        });
    })
});

