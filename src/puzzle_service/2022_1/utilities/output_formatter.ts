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

    public graphMapToString(map: Map<string, Set<string>>) {
        let result = "";

        map.forEach((values: Set<string>, key: string) => {
            result += key;
            values.forEach((value: string) => {
                result += value;
            })
            result += " ";
        })

        return result;
    }
}
