import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class Mailer {
  static send(
    to: string,
    subject: string,
    text: string,
    html: string,
    attachments: Array<{ filename: string; path: string }> = [] // Default to empty array
  ): void {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Missing email credentials in environment variables');
      return;
    }

    const client = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    client.sendMail(
      {
        from: emailUser,
        to,
        subject,
        text,
        html,
        attachments, 
      },
      (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', info.response);
        }
      }
    );
  }
}

export default Mailer;
