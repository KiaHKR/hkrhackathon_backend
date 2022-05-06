import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export default async function sendEmail(email: string, resetLink: string) {
    const mail = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'hkr.hackathon@outlook.com',
        to: email,
        subject: 'Reset Password Link - Hkr Hackathon',
        html: '<p>You requested for reset password, kindly use this <a href="'+resetLink+'">link</a> to reset your password</p>'

    };

    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(0)
        }
    });
}
