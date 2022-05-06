import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmail(
    email: string, resetLink: string, callback: (data: {success: boolean, message: string}) => {success: boolean, message: string}) {

    const mail = nodemailer.createTransport({
        service: 'SendinBlue',
        auth:
            {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
    });

    const mailOptions = {
        from: 'hkr.hackathon@outlook.com',
        to: email,
        subject: 'Reset Password Link - Hkr Hackathon',
        html: '<p>You requested for reset password, kindly use this <a href="'+resetLink+'">link</a> to reset your password</p>',
    };

    mail.sendMail(mailOptions, function (error) {
        if (error) {
            callback({success: false, message: error as string})
        }
        callback({success: true, message: "mail sent successfully"})
    })
}
