import { UserPuzzle } from "../models/userPuzzle";
import { PuzzleModuleInterface } from "./puzzleModuleInterface";
import MinMaxMedianPuzzle from "./2022_1/01_min_max_median/min_max_median";
import ChecksumPuzzle from "./2022_1/02_checksum/checksumPuzzle";
import NiceWordsPuzzle from "./2022_1/03_nice_words/nice_words";
import StringManipulationPuzzle from "./2022_1/04_string_manipulation/string_manipulation";
import GridWithBoxesPuzzle from "./2022_1/05_grid_with_boxes/grid_with_boxes";
import ParenthesisPuzzle from "./2022_1/06_parenthesis/parenthesisPuzzle";
import MazePuzzle from "./2022_1/08_maze/maze";
import LoopingGraphPuzzle from "./2022_1/09_looping_graph/looping_graph";
import HouseRobberPuzzle from "./2022_1/07_house_robber/house_robber";

export default class PuzzleHandler {
    private static puzzleClasses: {
        [puzzleId: string]: PuzzleModuleInterface
    } = {
            "01_min_max_median": new MinMaxMedianPuzzle(),
            "02_checksum": new ChecksumPuzzle(),
            "03_nice_words": new NiceWordsPuzzle(),
            "04_string_manipulation": new StringManipulationPuzzle(),
            "05_grid_with_boxes": new GridWithBoxesPuzzle(),
            "06_parenthesis": new ParenthesisPuzzle(),
            "07_house_robber": new HouseRobberPuzzle(),
            "08_maze": new MazePuzzle(),
            "09_looping_graph": new LoopingGraphPuzzle()
        };

    static generatePuzzle(id: string): UserPuzzle {
        if (!this.idFound(id)) throw new Error("ID does not match to any puzzle modules");
        const puzzleClass = PuzzleHandler.puzzleClasses[id];
        return puzzleClass.generatePuzzle();
    }

    static checkAnswer(id: string, correctAnswer: string, guessAnswer: string): { answer: boolean, information: string } {
        if (!this.idFound(id)) throw new Error("ID does not match to any puzzle modules");
        const puzzleClass = PuzzleHandler.puzzleClasses[id];
        return puzzleClass.checkAnswer(correctAnswer, guessAnswer);
    }

    static idFound(id: string) {
        return (id in this.puzzleClasses);
    }
}
