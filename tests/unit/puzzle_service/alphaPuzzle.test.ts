import AlphaPuzzle from "../../../src/puzzle_service/alphaPuzzle";
const alphaPuzzle = new AlphaPuzzle();

describe('alphaPuzzle', () => {
    it('should return {answer: true} with correct answer', function () {
        const result = alphaPuzzle.checkAnswer("2", "2");
        expect(result).toHaveProperty('answer', true);
    });

    it('should return {answer: false} with incorrect answer', function () {
        const result = alphaPuzzle.checkAnswer("2", "1");
        expect(result).toHaveProperty('answer', false);
    });
});
