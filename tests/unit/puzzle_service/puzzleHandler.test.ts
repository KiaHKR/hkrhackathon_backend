import PuzzleHandler from "../../../src/puzzle_service/puzzleHandler";
import {UserPuzzle} from "../../../src/models/userPuzzle";
import FirstTestPuzzle from "../../../src/puzzle_service/firstTestPuzzle";

describe('puzzleHandler', () => {

    describe('testPuzzle', () => {
        describe('checkAnswer', () => {
            it('should return {answer: true} with correct answer', function () {
                const result = PuzzleHandler.checkAnswer("firstTestPuzzle", "2", "2");
                expect(result).toHaveProperty('answer', true);
            });
            it('should return {answer: false} with incorrect answer', function () {
                const result = PuzzleHandler.checkAnswer("firstTestPuzzle", "2", "1");
                expect(result).toHaveProperty('answer', false);
            });
        });

        describe('generatePuzzle', () => {
            const payload = new UserPuzzle("test", "0 0 0", "-")
            const generatePuzzleMock = jest
                .spyOn(FirstTestPuzzle.prototype, 'generatePuzzle')
                .mockImplementation(() => {
                    return payload;
                });
            it('should call generatePuzzle method', function () {
                PuzzleHandler.generatePuzzle("firstTestPuzzle");
                expect(generatePuzzleMock).toHaveBeenCalled();
            });
            it('should return userPuzzle object', function () {
                const results = PuzzleHandler.generatePuzzle("firstTestPuzzle");
                expect(results).toMatchObject(payload);
            });
        });
    });
});
