import mazeGeneration from 'maze-generation';

function generateMaze(options: { width: number, height: number }, start: string, end: string, wall: string, field: () => string) {
    const generatedMaze = mazeGeneration(options);

    const jsonMaze = generatedMaze.toJSON();
    return mazeToArr(jsonMaze, options, start, end, wall, field);
}


function mazeToArr(jsonMaze: any, options: { width: number, height: number }, start: string, end: string, wall: string, field: () => string): string[][] {
    let arr_2d = maze2dEmptyArr(options);

    arr_2d[0][1] = start;
    arr_2d[options.height * 2 - 1][options.width * 2] = end;

    let x = 1;
    let y = 1;
    for (const row of jsonMaze.rows) {
        for (const cell of row) {
            cellFill(arr_2d, cell, x, y, options, wall, field);
            x += 2;
        }
        x = 1;
        y += 2;
    }

    for (const row of arr_2d) {
        for (let i = 0; i < row.length; i++) {
            const element = row[i];
            if (element == null) {
                row[i] = wall;
            }
        }
    }

    return arr_2d;
}

function cellFill(mazeArray: string[][], cell: any, x: number, y: number, options: { width: number, height: number }, wall: string, field: () => string): void {
    if (cell.left) {
        mazeArray[y][x - 1] = wall;
    } else {
        if (mazeArray[y][x - 1] == null)
            mazeArray[y][x - 1] = field();
    }

    if (cell.right) {
        if (x + 1 != options.width * 2 && y != options.height * 2)
            mazeArray[y][x + 1] = wall;

    } else {
        if (mazeArray[y][x + 1] == null)
            mazeArray[y][x + 1] = field();
    }

    if (cell.up) {
        if (x != 1 && y - 1 != 0)
            mazeArray[y - 1][x] = wall;

    } else {
        if (mazeArray[y - 1][x] == null)
            mazeArray[y - 1][x] = field();
    }

    if (cell.down) {
        mazeArray[y + 1][x] = wall;
    } else {
        if (mazeArray[y + 1][x] == null)
            mazeArray[y + 1][x] = field();
    }

    mazeArray[y][x] = field();
}

function arrayToString(mazeArray: string[][]): string {
    let mazeString = '';

    for (const row of mazeArray) {
        mazeString += row.join(' ') + '\n';
    }

    return mazeString;
}

function maze2dEmptyArr(options: { width: number, height: number }): string[][] {
    let arr_2d = [];
    for (let i = 0; i < options.height * 2 + 1; i++) {
        let empty_row = [];
        for (let j = 0; j < options.width * 2 + 1; j++) {
            empty_row.push(null);
        }
        arr_2d.push(empty_row);
    }
    return arr_2d;
}

export { generateMaze, arrayToString }