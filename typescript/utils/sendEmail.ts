import nodemailer from 'nodemailer';

const sendEmail = async (
  email: string | undefined,
  subject: string,
  html: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email send: ' + info.response);
  } catch (error) {
    console.log(error);
    throw new Error('internal sever Error (nodemailer');
  }
};

export default sendEmail;
