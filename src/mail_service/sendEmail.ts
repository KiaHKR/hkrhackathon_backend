import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmail(email: string, resetLink: string) {
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

    return mail.sendMail(mailOptions, function (error) {
        if (error) {
            return {success: false, message: error as string};
        }
        return {success: true, message: "mail sent successfully"};
    })
}
