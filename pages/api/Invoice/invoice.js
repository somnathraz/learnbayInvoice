// import the necessary node libraries
import fs from "fs";
const AWS = require("aws-sdk");
import puppeteer from "puppeteer";
import handlers from "handlebars";
const nodemailer = require("nodemailer");
import { authentication } from "../../../lib/googleSheet";
import { connectToDatabase } from "../../../lib/mongodb";
let fileUpload = "";
let emailSent = "";

const AWSCredentials = {
  accessKey: process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucketName: "learnbay-invoice/generatead-invoice",
};

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
});
export default async function pdfGenerate(req, res) {
  const { db } = await connectToDatabase();
  // extract the customer name from the req.body object
  // and also set a default name with the logical operator

  const {
    customerName,
    courseName,
    customerPhone,
    coursePrice,
    invoiceId,
    salesMan,
    counselorEmail,
    salesEmail,
    InvoiceDate,
    paymentMode,
    paymentType,
    team,
    paymentDate,
    customerEmail,
  } = req.body;
  console.log(counselorEmail);
  let GST =
    parseFloat(coursePrice) - parseFloat(coursePrice) * (100 / (100 + 18));

  let OriginalCost = parseFloat(coursePrice) - GST;
  OriginalCost = parseInt(OriginalCost);
  const CGST = parseInt(GST / 2);
  const SGST = parseInt(GST / 2);

  const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  });
  const { sheets } = await authentication();

  const uploadToS3 = (fileName) => {
    // Read content from the file

    const fileContent = fs.readFileSync(`./public/invoice/${fileName}`);

    // Setting up S3 upload parameters
    const params = {
      Bucket: AWSCredentials.bucketName,
      Key: fileName,
      Body: fileContent,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }

      fileUpload = `${data.Location}`;
    });
  };
  GST = parseInt(GST);
  try {
    // read our invoice-template.html file using node fs module
    const file = fs.readFileSync("./invoice-template-backend.html", "utf8");

    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);
    const html = template({
      customerName,
      courseName,
      customerPhone,
      coursePrice,
      invoiceId,
      InvoiceDate,
      paymentDate,
      paymentType,
      customerEmail,
      OriginalCost,
      SGST,
      CGST,
    });

    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pdfName = customerName + new Date() + "-" + invoiceId;
    const fPdfName = pdfName.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, "-");
    let link;
    if (courseName === "Advanced Data science and AI Program") {
      link = "https://zfrmz.in/f2TOL2P2XmiKBCBScVxn";
    }
    if (courseName === "Data Science and AI for managers and Leaders") {
      link = "https://zfrmz.in/f2TOL2P2XmiKBCBScVxn";
    }
    if (courseName === "Advanced AI and ML Program") {
      link = "https://zfrmz.in/f2TOL2P2XmiKBCBScVxn";
    }
    if (courseName === "Data science and AI Master Program") {
      link = "https://zfrmz.in/f2TOL2P2XmiKBCBScVxn";
    }
    if (courseName === "Data Analytics Program") {
      link = "https://zfrmz.in/f2TOL2P2XmiKBCBScVxn";
    }
    if (courseName === "Business Analytics Program") {
      link = "https://zfrmz.in/f2TOL2P2XmiKBCBScVxn";
    }
    if (courseName === "Full Stack software development") {
      link = "https://zfrmz.in/nOlE6J6FvLoZ0su8MxT8";
    }
    if (courseName === "DSA and system design") {
      link = "https://zfrmz.in/nOlE6J6FvLoZ0su8MxT8";
    }

    const mailData = {
      from: "admissions@learnbay.co",
      to: customerEmail,
      subject: `invoice From Learnbay`,
      cc: counselorEmail,
      attachments: [
        {
          filename: `${fPdfName}.pdf`,
          path: `./public/invoice/${fPdfName}.pdf`,
          contentType: "application/pdf",
        },
      ],
      html: `<div>Hi ${customerName},</div><p>Greetings from  Learnbay,</p> <p>We have attached Invoice along with this mail.</p><div>For any clarifications or doubts feel free to reach out to us on : <p><a href="mailto:contacts@learnbay.co">contacts@learnbay.co</a>
      <a href="tel:+916363558632" target="_blank">+91 6363 558 632</a></p></div><p>Please find the attachments below. </P>
      <div>Form Link:</div>
      <p><a href="${link}" target="_blank">${link}</a>       
      </p>
      <p>Once your filling the form Your learning manager will reach out to you via email and call to help you with the next steps.</p> <p>We wish you all the very Best 👍</p><div>Thanks and Regards</div><div>Admissions Team</div><div>Note:-The amount will not be refundable after 15 days of joining</div>`,
    };

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: "networkidle0" });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: "A4" });
    fs.mkdirSync("./public/invoice", { recursive: true });
    fs.writeFileSync(`./public/invoice/${fPdfName}.pdf`, pdf);

    await browser.close();

    uploadToS3(`${fPdfName}.pdf`);

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

        const response = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                paymentDate,
                salesMan,
                team,
                customerName,
                parseInt(coursePrice),
                paymentType,
                customerEmail,
                customerPhone,
                "backendData",
                "backendData",
                GST,
                invoiceId,
                paymentMode,
                courseName,
                fileUpload,
              ],
            ],
          },
        });
        if (team === "Organic Team") {
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "organic",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [
                  paymentDate,
                  salesMan,
                  team,
                  customerName,
                  parseInt(coursePrice),
                  paymentType,
                  customerEmail,
                  customerPhone,
                  "backendData",
                  "backendData",
                  GST,
                  invoiceId,
                  paymentMode,
                  courseName,
                  fileUpload,
                ],
              ],
            },
          });
        }
        if (team === "Google ads-1 (Irfan)") {
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Google ads-1 (Irfan)",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [
                  paymentDate,
                  salesMan,
                  team,
                  customerName,
                  parseInt(coursePrice),
                  paymentType,
                  customerEmail,
                  customerPhone,
                  "backendData",
                  "backendData",
                  GST,
                  invoiceId,
                  paymentMode,
                  courseName,
                  fileUpload,
                ],
              ],
            },
          });
        }
        if (team === "Google ads-2 (Shah)") {
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Google ads-2 (Shah)",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [
                  paymentDate,
                  salesMan,
                  team,
                  customerName,
                  parseInt(coursePrice),
                  paymentType,
                  customerEmail,
                  customerPhone,
                  "backendData",
                  "backendData",
                  GST,
                  invoiceId,
                  paymentMode,
                  courseName,
                  fileUpload,
                ],
              ],
            },
          });
        }
        if (team === "Full Stack") {
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Full Stack",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [
                  paymentDate,
                  salesMan,
                  team,
                  customerName,
                  parseInt(coursePrice),
                  paymentType,
                  customerEmail,
                  customerPhone,
                  "backendData",
                  "backendData",
                  GST,
                  invoiceId,
                  paymentMode,
                  courseName,
                  fileUpload,
                ],
              ],
            },
          });
        }

        let myPost = await db.collection("generatedInvoice").insertOne({
          customerName: customerName,
          courseName: courseName,
          customerPhone: customerPhone,
          coursePrice: parseFloat(coursePrice),
          invoiceId: invoiceId,
          paymentDate: paymentDate,
          customerEmail: customerEmail,
          pdfName: fPdfName,
          fileLink: fileUpload,
          emailInfo: emailSent,
          salesMan: salesMan,
          team: team,
          paymentType: paymentType,
          paymentMode: paymentMode,
        });
        res.status(200).json({
          myPost: myPost.insertedId,
          pdfName: fPdfName,
          fileLink: fileUpload,
          emailInfo: emailSent,
        });

        fs.unlinkSync(`./public/invoice/${fPdfName}.pdf`);
      }
    });

    // send the result to the client
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
