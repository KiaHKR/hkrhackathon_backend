import Joi from "joi";

export function validateUserUpdate(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        year: Joi.number().required().less(4).greater(0),
        isAdmin: Joi.boolean(),
        currentPuzzleId: Joi.string().min(1),
    });

    return schema.validate(user);
}

export function validateUserCreation(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(50).required(),
        year: Joi.number().required().less(4).greater(0)
    });

    return schema.validate(user);
}

export function validatePasswordUpdate(password) {
    const schema = Joi.object({
        newPassword: Joi.string().min(8).max(50).required(),
        oldPassword: Joi.string().min(8).max(50).required()
    });

    return schema.validate(password);
}

export function validatePassword(password) {
    const schema = Joi.object({
        password: Joi.string().min(8).max(50).required(),
    });

    return schema.validate(password);
}

export function validateLogin(request) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(50).required()
    });
    return schema.validate(request);
}

export function validateEmail(request) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email()
    });
    return schema.validate(request);
}

export function validateOrderArray(orderArray) {
    const schema = Joi.object({
        orderArray: Joi.array().required().min(1)
    });

    return schema.validate(orderArray);
}

export function validateUserPuzzleUpdate(input) {
    const schema = Joi.object({
        puzzles: Joi.array().required().min(1),
        newPuzzleId: Joi.string().required()
    });

    return schema.validate(input);
}

export function validatePuzzle(puzzle) {
    const schema = Joi.object({
        id: Joi.string().required(),
        story: Joi.string().required()
    });
    return schema.validate(puzzle);
}
