import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    
    private transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: Number(process.env.MAILTRAP_SMTP_PORT ?? 2525),
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

    async send (to: string, subject: string, text: string):Promise<void> {
       const info =  await this.transporter.sendMail({
      from: '"Beam Health Demo" <no-reply@beam-demo.com>',
      to,
      subject,
      text,
    });

    console.log("Message sent:", info.messageId);

    }
}
