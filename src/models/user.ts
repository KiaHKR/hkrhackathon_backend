import Joi from "joi";
import { UserPuzzle } from "./userPuzzle";
import jwt from 'jsonwebtoken';

export class User {
    private _currentTask: string;
    private _isAdmin: boolean;
    private _userPuzzles: {
        puzzleId: UserPuzzle
    };

    constructor(
        private _name: string,
        private _email: string,
        private _password: string,
        private _year: number) {
    }

    set password(value) {
        this._password = value;
    }

    get password(): string {
        return this._password;
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

    set isAdmin(value: boolean) {
        this._isAdmin = value;
    }

    addPuzzle(puzzle: UserPuzzle) {
        this._userPuzzles[puzzle.id] = puzzle;
    }

    getPuzzle(id: string) {
        return this._userPuzzles[id];
    }

    generateAuthToken = function() {
        return jwt.sign({
            _id: this._id,
            isAdmin: this.isAdmin
        },
        process.env.JWT_KEY)
    }
}

export function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(10).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        year: Joi.number().required().less(4).greater(0)
    });

    return schema.validate(user);
}
