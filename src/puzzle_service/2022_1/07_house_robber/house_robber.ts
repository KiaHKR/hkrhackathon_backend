import { UserPuzzle } from "../../../models/userPuzzle";
import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import Randoms from "../utilities/randoms";


export default class HouseRobberPuzzle implements PuzzleModuleInterface {
    puzzleId: string = "07_house_robber";

    private numOfHouses = 2000;
    private maxHouseVal = 100;
    private minHouseVal = 1;

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string; } {
        return (correctAnswer === guessAnswer) ? { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }

    generatePuzzle(): UserPuzzle {
        const rand = new Randoms();
        let houses: number[] = [];

        for (let i = 0; i < this.numOfHouses; i++) {
            houses.push(rand.randomInt(this.minHouseVal, this.maxHouseVal + 1));
        }
        const answerValue = this.solve(houses);

        return new UserPuzzle(this.puzzleId, houses.join('|'), answerValue.toString());
    }

    private solve(nums: number[]): number {
        let dp: number[] = Array(nums.length);

        if (nums.length == 1)
            return nums[0];
        if (nums.length == 2)
            return Math.max(nums[0], nums[1]);

        dp[0] = nums[0];
        dp[1] = Math.max(nums[1], dp[0]);

        for (let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
        }

        return dp[nums.length - 1];
    }
}
