import { UserPuzzle } from "../../../src/models/userPuzzle";
import { User } from "../../../src/models/user";

describe('userPuzzle', () => {
    let userPuzzle;
    beforeEach(() => {
        userPuzzle = new UserPuzzle("test", "1 2 3", "0");
    })

    it('after correct (), object should have _completionTime and completed fields', function () {
        userPuzzle.correct();
        expect(userPuzzle).toHaveProperty('_completionTime');
        expect(userPuzzle).toHaveProperty('completed', true);
    });

    it('after incorrect(), object should have _numberOfWrongSubmissions to 1', function () {
        userPuzzle.incorrect();
        expect(userPuzzle).toHaveProperty('_numberOfWrongSubmissions', 1);

    });

    it('should return userPuzzle id', function () {
        const res = userPuzzle.id;
        expect(res).toBe("test")
    });

    it('should change userPuzzle id', function () {
        userPuzzle.id = "updatedTest";
        const res = userPuzzle.id;
        expect(res).toBe("updatedTest")
    });

    it('should update a userPuzzle directly', function () {
        const user = new User("name", "test@tester.com", "password", 1);

        user.addPuzzle(userPuzzle);

        user.getPuzzle("test").incorrect();

        expect(user.getPuzzle("test").numberOfWrongSubmissions).toBe(1);
    });

});
