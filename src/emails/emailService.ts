"use server";

import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

const EmailService = async (options: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  return await transporter.sendMail(options);
};

export default EmailService;
