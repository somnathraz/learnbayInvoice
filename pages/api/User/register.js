import { connectToDatabase } from "../../../lib/mongodb";
import bcrypt from "bcrypt";
const nodemailer = require("nodemailer");

const saltRounds = 12;
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
});
let emailSent = "";

export default async function handler(req, res) {
  const { email, password, role, team } = req.body;
  console.log(email, password, role, team);

  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    try {
      const usernameConflict = await db.collection("users").findOne({
        email,
      });
      if (usernameConflict) {
        res.status(409).json({ message: "email already taken" });
      } else {
        // Hash password
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert user into database
        const result = await db.collection("users").insertOne({
          email: email,
          password: passwordHash,
          role: role,
          team: team,
        });
        const mailData = {
          from: "admissions@learnbay.co",
          to: email,
          subject: `Your backend username and password`,

          html: `<div>Hi,</div><p>Greetings from  Learnbay,</p> <p>Username:${email}<br/>PassWord:${password}<br/> Login Link:<a href="http://15.207.185.13:3000/">http://15.207.185.13:3000/</a></P>`,
        };

        transporter.sendMail(mailData, async function (err, info) {
          if (err) {
            emailSent = err.message;
            res.status(200).send({
              fPdfName: fPdfName,
              emailSent: emailSent,
              myPost: myPost,
              fileUpload: fileUpload,
            });
          } else {
            emailSent = `email sent successfully. ${info.messageId}`;

            res.status(200).json({
              token: result.insertedId.toString(),
              email,
              password,
              role,
              team,
              message: "user created Successful",
            });
          }
        });

        // Send all-clear with _id as token
      }
    } catch (error) {
      console.log(error);
    }
  }
}
