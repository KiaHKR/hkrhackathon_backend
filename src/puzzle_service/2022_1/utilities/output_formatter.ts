export default class OutputFormatter {

    entriesSplitByCharacter(output: any[], split: Split, split_string_format: SplitStringFormat = SplitStringFormat.UNSPACED) {
        let split_string: string = split;

        if (split_string_format == SplitStringFormat.SPACED) {
            split_string = ' ' + split + ' ';
        }

        return output.join(split_string);
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

export enum Split {
    SPACE = ' ',
    NEWLINE = '\n',
    COMMA = ',',
    VERTICALBAR = '|',
}

// Control whether the split string should be surrounded by spaces or not
export enum SplitStringFormat {
    SPACED,
    UNSPACED
}
