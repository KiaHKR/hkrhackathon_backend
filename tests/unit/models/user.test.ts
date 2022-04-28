import {config} from "dotenv";
import jwt from "jsonwebtoken";
import {User} from "../../../src/models/user";
import {UserPuzzle} from "../../../src/models/userPuzzle";
config();

describe('User', () => {
    let user;
    beforeEach(() => {
        user = new User("name", "test@tester.com", "password", 1);
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
            const userPuzzle = new UserPuzzle("test", "1 2 3", "2");
            user.addPuzzle(userPuzzle);

            expect(user.getPuzzle("test")).not.toBeNull();
            expect(user.currentPuzzleId).toBe("test");
        });
    });
});

