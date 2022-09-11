import { PuzzleModuleInterface } from "../../puzzleModuleInterface";
import { UserPuzzle } from "../../../models/userPuzzle";
import GraphGenerator from "./graph_generator";
import Randoms from "../utilities/randoms";
import GraphUtils from "./graph_utilities";
import OutputFormatter from "../utilities/output_formatter";

export default class LoopingGraphPuzzle implements PuzzleModuleInterface {
    puzzleId = "09_looping_graph";

    private symbolsToUse =
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
            "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    private numberOfEntries = 2000;

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string } {
        return (correctAnswer === guessAnswer) ?
            { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }

    generatePuzzle(): UserPuzzle {
        const generator = new GraphGenerator(this.symbolsToUse);
        const cycleCreator = new GraphUtils();
        const randoms = new Randoms();
        const formatter = new OutputFormatter();

        const output = [];
        let numberOfLoopingGraphs = 0;

        for (let i = 0; i < this.numberOfEntries; i++) {
            const graph = generator.generateGraphWithoutCycles();

            if (randoms.coinFlip()) {
                cycleCreator.createCycle(graph);
                numberOfLoopingGraphs++;
            }

            const changedEntry = formatter.graphMapToString(graph);
            output.push(changedEntry);
        }

        const formattedOutput = formatter.entriesInRows(output);


        return new UserPuzzle(this.puzzleId, formattedOutput, numberOfLoopingGraphs.toString());
    }
}
