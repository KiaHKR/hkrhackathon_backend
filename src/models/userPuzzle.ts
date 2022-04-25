export class UserPuzzle {
    private _completionTime: number;
    private _numberOfWrongSubmissions = 0;
    private _completed = false;
    
    constructor(
        private _id: string,
        private _userInput: string,
        private _answer: string,) {
    }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get userInput(): string {
        return this._userInput;
    }

    set userInput(value: string) {
        this._userInput = value;
    }

    get answer(): string {
        return this._answer;
    }

    set answer(value: string) {
        this._answer = value;
    }

    get completionTime(): number {
        return this._completionTime;
    }

    get completed(): boolean {
        return this._completed;
    }

    get numberOfWrongSubmissions(): number {
        return this._numberOfWrongSubmissions;
    }

    correct() {
        this._completionTime = Date.now();
        this._completed = true;
    }

    incorrect() {
        this._numberOfWrongSubmissions ++;
    }
}
