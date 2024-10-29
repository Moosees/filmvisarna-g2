import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export default class Mailer {
  // Get info (sender email and app password from gmail-secret.json)
  static info = (() => {
    try {
      return JSON.parse(
        fs.readFileSync(
          path.join(import.meta.dirname, 'gmail-secret.json'),
          'utf-8'
        )
      );
    } catch {
      console.warn('\nMissing gmail-secret.json file!');
      return {};
    }
  })();

  static send(
    to: string,
    subject: string,
    text: string,
    html: string,
    attachments: Array<{ filename: string; path: string }> = []
  ) {
    // Authenticate / create a mail client
    const client = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.info.email,
        pass: this.info.appPassword,
      },
    });
    // Send the mail
    client.sendMail(
      {
        from: this.info.email,
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
