export default function solveMaze(mazeArray: string[][], start: string, end: string, wall: string) {
    let stack = [[1, 1]];
    let path = [];
    findPath(stack, path, mazeArray, start, end, wall);
    return path;
}

function findPath(stack: number[][], path: number[][], mazeArray: string[][], start: string, end: string, wall: string) {
    const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    while (stack.length > 0) {
        let current = stack.pop();

        if (mazeArray[current[1]][current[0]] == end) {
            break;
        }

        path.push(current);

        let found_path = false;
        for (const dir of dirs) {
            let temp_x = current[0] + dir[0];
            let temp_y = current[1] + dir[1];

            if (mazeArray[temp_y][temp_x] != wall && mazeArray[temp_y][temp_x] != start && !path.some(element => element[0] == temp_x && element[1] == temp_y)) {
                stack.push([temp_x, temp_y]);
                found_path = true;
            }
        }

        if (!found_path) {
            while (!neighborInStack(current, stack, dirs)) {
                current = path.pop();
            }
            path.push(current);
        }
    }

}

function neighborInStack(point: number[], stack: number[][], dirs: number[][]) {
    for (const dir of dirs) {
        let temp_x = point[0] + dir[0];
        let temp_y = point[1] + dir[1];

        if (stack.some(element => element[0] == temp_x && element[1] == temp_y)) {
            return true;
        }
    }

    return false;
}