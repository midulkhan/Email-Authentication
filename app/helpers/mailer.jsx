import nodemailer from "nodemailer";

async function sendEmail(email, Token) {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const mailerOptions = {
      from: "mrnkh15@gmail.com",
      to: email,
      subject: "Verification email",
      html: Token,
    };

    const Send = await transporter.sendMail(mailerOptions);
    return Send;
    console.log(Send);
  } catch (error) {
    throw new Error(error);
  }
}

export default sendEmail;
