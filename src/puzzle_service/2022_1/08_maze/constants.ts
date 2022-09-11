class Constants {
    static MAZE_OPTIONS = { width: 75, height: 75 };
    static WALL = 'X';
    static START = '*';
    static END = '!';

    static SMALLEST_FIELD_VALUE = 0;
    static LARGEST_FIELD_VALUE = 9;
    static field = (): string => Constants.getRandomInt(this.SMALLEST_FIELD_VALUE, this.LARGEST_FIELD_VALUE).toString();

    static getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}