// import the necessary node libraries
import fs from "fs";
const AWS = require("aws-sdk");
import puppeteer from "puppeteer";
import handlers from "handlebars";
const nodemailer = require("nodemailer");

const AWSCredentials = {
  accessKey: process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucketName: "skillslash-cdn/payment-invoice",
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
  // extract the customer name from the req.body object
  // and also set a default name with the logical operator
  console.log(req.body);

  const {
    customerName,

    invoiceId,
    invoiceDate,
    paymentDate,
    customerEmail,
    courseName,
    GST,
    customerPhone,
    coursePrice,
    DiscountPrice,
    TotalPrice,
  } = req.body;

  console.log(
    customerName,
    courseName,
    GST,
    customerPhone,
    coursePrice,
    invoiceId,
    invoiceDate,
    paymentDate,
    customerEmail,

    DiscountPrice,
    TotalPrice,
    "generateInvoiceAPI"
  );

  const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  });

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
      console.log(`File uploaded successfully. ${data.Location}`);
    });
  };

  try {
    // read our invoice-template.html file using node fs module
    const file = fs.readFileSync("./invoice-template.html", "utf8");

    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);
    const html = template({
      customerName,
      courseName,
      GST,
      customerPhone,
      coursePrice,
      invoiceId,
      invoiceDate,
      paymentDate,
      customerEmail,
      DiscountPrice,
      TotalPrice,
    });

    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pdfName = customerName + new Date();
    const fPdfName = pdfName.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, "-");
    console.log(fPdfName);
    const mailData = {
      from: "somanath@skillslash.com",
      to: customerEmail,
      subject: `Message From som`,
      text: "hello from skillslash",
      attachments: [
        {
          filename: `${fPdfName}.pdf`,
          path: `./public/invoice/${fPdfName}.pdf`,
          contentType: "application/pdf",
        },
      ],
      html: `<div>hello</div><p>Sent from:
     somanath@skillslash.com</p>`,
    };

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: "networkidle0" });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: "A4" });
    fs.mkdirSync("./public/invoice", { recursive: true });
    fs.writeFileSync(`./public/invoice/${fPdfName}.pdf`, pdf);

    await browser.close();
    console.log(pdf);
    uploadToS3(`${fPdfName}.pdf`);

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else {
        console.log(info);
        fs.unlinkSync(`./public/invoice/${fPdfName}.pdf`);
      }
    });
    // send the result to the client

    res.status(200).send(fPdfName);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
