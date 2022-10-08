import Randoms from "../utilities/randoms";
import {PuzzleModuleInterface} from "../../puzzleModuleInterface";
import {UserPuzzle} from "../../../models/userPuzzle";
import OutputFormatter from "../utilities/output_formatter";

export default class GridWithBoxesPuzzle implements PuzzleModuleInterface{
    
    private readonly alphabet = "abcdefghijklmnopqrstuvwxyz";
    private readonly initialValueForGrid = "X";
    private width = 200;
    private height = 200;
    private minCountOfBoxes = 250;
    private maxCountOfBoxes = 350;

    puzzleId = "coffee_boxes";

    checkAnswer(correctAnswer: string, guessAnswer: string): { answer: boolean; information: string } {
        return (correctAnswer === guessAnswer) ?
            { answer: true, information: "Correct" } : { answer: false, information: "Incorrect" };
    }

    public generatePuzzle(): UserPuzzle {
        const grid: string[][] = this.getGrid(this.width, this.height);

        const answer = this.populateGrid(grid, this.minCountOfBoxes, this.maxCountOfBoxes);

        const formatter = new OutputFormatter()
        const formattedOutput = formatter.gridWithBoxesOutput(grid);

        return new UserPuzzle(this.puzzleId, formattedOutput, answer.toString())
    }

    private populateGrid(grid: string[][], minBoxes: number, maxBoxes: number) {
        const random = new Randoms();

        let countOfValidBoxes = 0;
        let sumOfValuesOfValidBoxes = 0;

        const gridBoundaries = this.defineUpperGridBoundaries(grid);
        const occupiedCoordinates = new Set<[number, number]>();

        const numberOfBoxes = random.randomInt(minBoxes, maxBoxes);

        for (let i = 0; i < numberOfBoxes; i++) {
            const coordinates = this.getRandomAvailableCoordinates(gridBoundaries, occupiedCoordinates);

            const randomValue = random.randomInt(1, 10);
            let content = [];

            if (random.coinFlip()) {
                content = this.getValidBoxContent(randomValue);
                countOfValidBoxes++;
                sumOfValuesOfValidBoxes += randomValue;
            }
            else {
                content = this.getInvalidBoxContent(randomValue);
            }

            this.makeBoxIntoGrid(coordinates, grid, content, occupiedCoordinates);
        }

        return countOfValidBoxes * sumOfValuesOfValidBoxes;
    }

    private hasSpace(coordinates: [number, number], occupiedCoordinates: Set<[number, number]>) {
        const neededCoordinates = this.coordinatesForBox(coordinates);

        for (const item of neededCoordinates) {
            if (this.setContainsCoordinates(occupiedCoordinates, item)) {
                return false;
            }
        }

        return true;
    }

    private setContainsCoordinates(occupiedCoordinates: Set<[number, number]>, item: [number, number]) {
        return Array.from(occupiedCoordinates).some(element => element[0] == item[0] && element[1] == item[1]);
    }

    private coordinatesForBox(startPoint: [number, number]) {
        const x = startPoint[0]
        const y = startPoint[1];

        const coordinates: [number, number][] = [];

        for (let i = y; i < y + 3 ; i++) {
            for (let j = x; j < x + 3; j++) {
                coordinates.push([j, i]);
            }
        }
        return coordinates;
    }

    private getValidBoxContent(value: number) {
        const random = new Randoms();

        const randomLetter = random.randomChar(this.alphabet);
        const content = new Array(9).fill(randomLetter);

        content[4] = String(value);

        return content;
    }

    private getInvalidBoxContent(value: number) {
        const content = this.arrayFilledWithRandomLetters();

        content[4] = String(value);

        return content;
    }

    private arrayFilledWithRandomLetters() {
        const random = new Randoms();

        const content: string[] = new Array(9);

        for (let i = 0; i < content.length; i++) {
            content[i] = random.randomChar(this.alphabet);
        }

        while (this.firstAndSecondElementAreSame(content)) {
            content[0] = random.randomChar(this.alphabet)
        }

        return content;
    }

    private firstAndSecondElementAreSame(content: string[]) {
        return content[0] == content[1];
    }

    private makeBoxIntoGrid(
        coordinates: [number, number],
        grid: string[][],
        boxContent: string[],
        occupiedCoordinates: Set<[number, number]>) {

        const boxCoordinates = this.coordinatesForBox(coordinates);
        let index = 0;

        for (const item of boxCoordinates) {
            grid[item[0]][item[1]] = boxContent[index++];
            occupiedCoordinates.add(item);
        }

    }

    private defineUpperGridBoundaries(grid: string[][]) {
        const yValue = grid.length - 2;
        const xValue = grid[0].length - 2;

        return [xValue, yValue];
    }

    private getRandomAvailableCoordinates(gridLimits: number[], usedCoordinates: Set<[number, number]>): [number, number] {
        const random = new Randoms();

        let x = 0;
        let y = 0;

        do {
            x = random.randomInt(0, gridLimits[0]);
            y = random.randomInt(0, gridLimits[1]);
        }
        while (!this.hasSpace([x, y], usedCoordinates))



        return [x, y]
    }

    private getGrid(width: number, height: number) {
        return Array.from(Array(height), () => Array(width).fill(this.initialValueForGrid));
    }
}
