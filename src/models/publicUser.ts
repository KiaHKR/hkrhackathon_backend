export default class PublicUser {
    name: string;
    email: string;
    year: number;
    isAdmin: boolean;
    nextPuzzleId: string;
    userPuzzles: {
        [puzzleId: string]: string // This is key-value. Value is the user game data.
    }
}
