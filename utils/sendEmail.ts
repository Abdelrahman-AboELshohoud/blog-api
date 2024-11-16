import nodemailer from "nodemailer";

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  content: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: content,
  };

  await transporter.sendMail(mailOptions);
};

export const recieveEmail = async (
  from: string,
  subject: string,
  content: string
) => {
  const mailOptions = {
    from,
    to: process.env.EMAIL_USER,
    subject,
    html: content,
  };

  await transporter.sendMail(mailOptions);
};
