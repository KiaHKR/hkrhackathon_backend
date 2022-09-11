export default class OutputFormatter {

    entriesInRows(output: number[]) {
        return output.join('\n');
    }

    gridWithBoxesOutput(grid: string[][]) {
        let output = "";
        for (const element of grid) {
            output += element + "\n"
        }

        return output;
    }
}
