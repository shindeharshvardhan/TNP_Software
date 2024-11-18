const crypto = require('crypto');
const nodemailer = require('nodemailer');

function generatePassword() {
    return crypto.randomBytes(8).toString('hex'); // Generates a 16-character hexadecimal password
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'shahkeya93@gmail.com',
        pass: 'rekxuumvypyutqcl',
    },
});

function sendEmail(to, password,subject,message) {
    console.log(message)
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: message
        // text: `Greetings!!! Time to add new Coordinators!! \n Your login credentials:\nEmail: ${to}\nPassword: ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending email to ${to}:`, error);
        } else {
            console.log(`Email sent to ${to}:`, info.response);
        }
    });
}

module.exports = {
    generatePassword,
    sendEmail
};
