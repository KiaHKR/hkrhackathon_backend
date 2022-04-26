import PuzzleHandler from "../../../src/puzzle_service/puzzleHandler";

describe('puzzleHandler', () => {

    describe('alphaPuzzle', () => {
        describe('checkAnswer', () => {
            it('should return {answer: true} with correct answer', function () {
                const result = PuzzleHandler.checkAnswer("alphaPuzzle", "2", "2");
                expect(result).toHaveProperty('answer', true);
            });
            it('should return {answer: false} with incorrect answer', function () {
                const result = PuzzleHandler.checkAnswer("alphaPuzzle", "2", "1");
                expect(result).toHaveProperty('answer', false);
            });
        });
    });

    
});
