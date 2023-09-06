import fs from "fs";
const AWS = require("aws-sdk");
import puppeteer from "puppeteer";
import handlers from "handlebars";
const nodemailer = require("nodemailer");
import { connectToDatabase } from "../../../lib/mongodb";
import { authentication } from "../../../lib/googleSheet";
import { log } from "console";

let fileUpload = "";
let emailSent = "";
const AWSCredentials = {
  accessKey: process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucketName: "learnbay-wb/Certificate",
};
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_MAILID,
    pass: process.env.SMTP_MAILPASS,
  },
  secure: true,
});
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  });
  if (req.method === "POST") {
    const {
      name,
      email,
      courseName,
      date,
      certificateType,
      id,
      durationStartDate,
      durationEndDate,
    } = req.body;

    console.log(req.body);
    console.log(process.env.GOOGLE_SHEET_ID1, "somnath fans gaya");

    let path = "";
    if (certificateType === "Gold completion certificate") {
      path = "./certificate/goldCompeletionCertificate.html";
    }
    if (certificateType === "Silver completion certificate") {
      path = "./certificate/silverCompeletionCertificate.html";
    }
    if (certificateType === "Module completion certificate") {
      path = "./certificate/moduleCompeletionCertificate.html";
    }

    const uploadToS3 = async (fileName) => {
      // Read content from the file

      const fileContent = fs.readFileSync(`./public/certificate/${fileName}`);

      // Setting up S3 upload parameters
      const params = {
        Bucket: AWSCredentials.bucketName,
        Key: fileName,
        Body: fileContent,
        ContentDisposition: "inline",
        ContentType: "application/pdf",
      };

      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }

        fileUpload = data.Location;
      });
    };

    const { sheets } = await authentication();

    try {
      // read our invoice-template.html file using node fs module

      const file = fs.readFileSync(path, "utf8");

      // compile the file with handlebars and inject the customerName variable
      const template = handlers.compile(`${file}`);
      const html = template({
        name,
        courseName,
        date,
        certificateType,
        id,
        durationStartDate,
        durationEndDate,
      });

      // simulate a chrome browser with puppeteer and navigate to a new page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const pdfName = name + new Date() + "-" + id;
      const fPdfName = pdfName.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, "-");

      // set our compiled html template as the pages content
      // then waitUntil the network is idle to make sure the content has been loaded
      await page.setContent(html, { waitUntil: "networkidle0" });
      //MAIL DATA

      // convert the page to pdf with the .pdf() method
      const pdf = await page.pdf({
        width: "1122",
        height: "793",
        printBackground: true,
      });
      fs.mkdirSync("./public/certificate", { recursive: true });
      fs.writeFileSync(`./public/certificate/${fPdfName}.pdf`, pdf);

      await browser.close();
      let mailData;
      if (certificateType === "Module completion certificate") {
        mailData = {
          from: "certificates@learnbay.co",
          to: email,
          cc: "shanthi.agree@learnbay.co",
          subject: `certificate From learnbay`,
          attachments: [
            {
              filename: `${fPdfName}.pdf`,
              path: `./public/certificate/${fPdfName}.pdf`,
              contentType: "application/pdf",
            },
          ],
          html: `<div>Hi, ${name}.</div><p>Greetings from Learnbay!</p> <p>We are thrilled to inform you that you have successfully completed the ${courseName} with Learnbay!</p></div><p> Please find your official certificate of course completion attached as our way of saying thank you for your diligence. This certificate acknowledges your achievement and can be a useful addition to your professional portfolio or resume.</p> <p>We wish to applaud you on this noteworthy accomplishment and look forward to helping you in your future educational efforts.</p><p>Please find your official certification in the attached file.</p><div>Regards and thanks</div><div> Learnbay!</div>`,
        };
      }
      if (certificateType === "Silver completion certificate") {
        mailData = {
          from: "certificates@learnbay.co",
          to: email,
          cc: "shanthi.agree@learnbay.co",
          subject: `certificate From Learnbay`,
          attachments: [
            {
              filename: `${fPdfName}.pdf`,
              path: `./public/certificate/${fPdfName}.pdf`,
              contentType: "application/pdf",
            },
          ],
          html: `<div>Hi ${name},</div><p>Congratulations!,</p> <p>Here is your certificate of completion of the ${courseName}</p></div><p> A course by Learnbay Academy! Congratulations on receiving your certificate of completion! </p> <p>You can now download your certificate.</p><p>Please see the attached file for your certificate.</p><div>Thanks and Regards</div><div>Team Learnbay</div>`,
        };
      }
      if (certificateType === "Gold completion certificate") {
        mailData = {
          from: "certificates@learnbay.co",
          to: email,
          cc: "shanthi.agree@learnbay.co",
          subject: `certificate From Learnbay`,
          attachments: [
            {
              filename: `${fPdfName}.pdf`,
              path: `./public/certificate/${fPdfName}.pdf`,
              contentType: "application/pdf",
            },
          ],
          html: `<div>Hi ${name},</div><p>Congratulations!,</p> <p>Here is your certificate of completion of the ${courseName}</p></div><p> A course by Learnbay Academy! Congratulations on receiving your certificate of completion! </p> <p>You can now download your certificate.</p><p>Please see the attached file for your certificate.</p><div>Thanks and Regards</div><div>Team Learnbay</div>`,
        };
      }

      await uploadToS3(`${fPdfName}.pdf`);
      transporter.sendMail(mailData, async function (err, info) {
        if (err) {
          console.log(err);
          emailSent = err.message;
          res.status(200).send({
            fPdfName: fPdfName,
            emailSent: emailSent,
            fileUpload: fileUpload,
          });
        } else {
          emailSent = `email sent successfully. ${info.messageId}`;

          const downloadFile = `https://learnbay-wb.s3.ap-south-1.amazonaws.com/Certificate/${fPdfName}.pdf`;
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID1,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [date, id, name, courseName, certificateType, downloadFile],
              ],
            },
          });
          // if (
          //   certificateType === "course completion certificate" ||
          //   certificateType === "Module completion certificate"
          // ) {
          //   const response = await sheets.spreadsheets.values.append({
          //     spreadsheetId: process.env.GOOGLE_SHEET_ID1,
          //     range: "course certification",
          //     valueInputOption: "USER_ENTERED",
          //     requestBody: {
          //       values: [
          //         [date, id, name, courseName, certificateType, downloadFile],
          //       ],
          //     },
          //   });
          // }
          // if (certificateType === "Workshop completion certificate") {
          //   const response = await sheets.spreadsheets.values.append({
          //     spreadsheetId: process.env.GOOGLE_SHEET_ID1,
          //     range: "Workshop certification",
          //     valueInputOption: "USER_ENTERED",
          //     requestBody: {
          //       values: [
          //         [date, id, name, courseName, certificateType, downloadFile],
          //       ],
          //     },
          //   });
          // }
          let myPost = await db.collection("certificateData").insertOne({
            date,
            id,
            name,
            courseName,
            certificateType,
            downloadFile,
          });

          fs.unlinkSync(`./public/certificate/${fPdfName}.pdf`);
          res.status(200).json({
            fileLink: fileUpload,
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error });
    }
  }
}
