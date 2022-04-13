import Joi from "joi";

export class User {
    private _currentTask: string;
    private _isAdmin: boolean;
    private _userPuzzles: {
        puzzleId: {
            userInput: string,
            answer: string,
            completionTime: string,
            numberOfWrongSubmissions: number
        }
    };

    constructor(private _name: string, private _email: string, private _password: string, private _year: number) {
    }

    set password(value) {
        this._password = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        this._year = value;
    }

    get currentTask(): string {
        return this._currentTask;
    }

    set currentTask(value: string) {
        this._currentTask = value;
    }

    get isAdmin(): boolean {
        return this._isAdmin;
    }

}

export function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(10).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        year: Joi.number().required().greater(2015)
    });

    return schema.validate(user);
}
