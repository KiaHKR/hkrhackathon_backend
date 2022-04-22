import Joi from "joi";

export class puzzle {
    constructor(
        private _id: string,
        private _title: string,
        private _story: string
    ) {}


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get story(): string {
        return this._story;
    }

    set story(value: string) {
        this._story = value;
    }
}

export function validatePuzzle(puzzle) {
    const schema = Joi.object({
        id: Joi.string().required(),
        story: Joi.string().required()
    });
    return schema.validate(puzzle);
}
