import jwt from 'jsonwebtoken';

export default function generateResetToken (email) {
    return jwt.sign({
            email: email,
            isReset: true
        },
        process.env.JWT_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES_IN_FOR_RESET
        })
}
