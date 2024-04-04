require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, 
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMailtoUser = async (email, data) => {

    const info = await transporter.sendMail({
        from: 'lohithaancha01@gmail.com', 
        to: email, 
        subject: "Ticket booked successfull",
        text: JSON.stringify(data),
        // html: "<b>Hello world?</b>", 
    });

    // console.log(info);

}

module.exports = {
    sendMailtoUser,transporter
}