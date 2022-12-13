import { connectToDatabase } from "../../../lib/mongodb";
const fs = require("fs");
const nodemailer = require("nodemailer");
const stringify = require("csv-stringify").stringify;

let emailSent = "";
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
});

export default async function generateReport(req, res) {
  const { db } = await connectToDatabase();

  const { startDate, endDate, email } = req.body;
  console.log(email);
  //   const IsoStartDate = new Date(startDate).toISOString();
  //   const IsoEndDate = new Date(endDate).toISOString();
  const popData = [];
  const MonthlyData = await db
    .collection("generatedInvoice")
    .find({
      paymentDate: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    .forEach(function (item) {
      popData.push(item);
    });
  stringify(
    popData,
    {
      header: true,
    },
    function (err, str) {
      const path = "./files/" + Date.now() + ".csv";
      //create the files directory if it doesn't exist
      if (!fs.existsSync("./files")) {
        fs.mkdirSync("./files");
      }
      fs.writeFile(path, str, function (err) {
        if (err) {
          console.error(err);
          return res
            .status(400)
            .json({ success: false, message: "An error occurred" });
        }

        const mailData = {
          from: "admissions@learnbay.co",
          to: email,
          subject: `Monthly Invoice ${startDate} to ${endDate}`,
          attachments: [
            {
              filename: `MonthlyReport(${startDate})`,
              path: path,
              contentType: "text/csv",
            },
          ],
          html: `<div>Please find the file in the attachments</div>`,
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
              msg: "done",
            });

            fs.unlinkSync(path);
          }
        });
      });
    }
  );
}
