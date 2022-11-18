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
  bucketName: "learnbay-invoice/generated-counsellingReport",
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



export default async function counsellingReportPdfGenerate(req, res) {

  let counsellingDate = new Date();
  counsellingDate = counsellingDate.toUTCString();


  const { db } = await connectToDatabase();

  // console.log(db)

  const {

    counselorName,
    stdGoal,
    stdEmail,
    stdPhone,
    stdName,
    stdExperience,
    stdDomain,
    stdCompany,
    stdCTC,
    suggestedProgram,
    primaryDomain,
    transitionDomain,
    averageHike,
    averageTimeline,
    counselorNote,
    salesMan,
    counsellingId,
    team,

  } = req.body;

  // console.log("body-", req.body);

  const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  });


  const { sheets } = await authentication();
  // console.log("Sheets@@",sheets)

  const uploadToS3 = (fileName) => {
    // Read content from the file

    const fileContent = fs.readFileSync(`./public/counsellingReportPdf/${fileName}`);

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
      // console.log("fileupload@@",fileUpload)
    });
  };

  let point1;
  let point2;
  let point3;
  let point4;


  if (transitionDomain === "Sales") {
    point1 = "BMW: Forecasting future sales with trends and price maximization.";
    point2 = "Amazon: Fact based cross-sell recommendation. ";
    point3 = "Starbucks: Maximization of customer lifetime value (CLV)";
    point4 = "Flipkart: Automated sentiment analysis to get real-time actionable insight in one click.";

  }
  if (transitionDomain === "Marketing") {
    point1 = "Swiggy: Descriptive study of trends and irregularities with prediction analysis for conversion.";
    point2 = "Spotify: Analysis of the market basket to increase marketing message efficiency.";
    point3 = "DropBox: Building a proficient site analyzer for customer lifetime value analysis.";
    point4 = "Mcdonald's: Analysis of consumer personality based on potential customer's buying behaviors";
  }
  if (transitionDomain === "HR") {
    point1 = "IBM: Career progression planning of  employees with workforce defections & efficiency.";
    point2 = "ITC: Future proof and cost-effective workforce planning and analytics.";
    point3 = "SAP: Automated analysis of talent's maturity level to identify the most suitable candidate.";
    point4 = "Juniper Networks: Progression analysis and recurrence demands of the organization.";
  }
  if (transitionDomain === "BFSI") {
    point1 = "JP Morgan: Learn and develop classification techniques for digital transformation.";
    point2 = "IDFC: A crisp financial product recommendation system generation.";
    point3 = "Bajaj Allianz: AI-powered cognitive analysis in risk assessment.";
    point4 = "Bharti AXA: Policy recommendations based on segmented customers.";
  }
  if (transitionDomain === "Healthcare") {
    point1 = "Qiagen: Preparing a system that can quickly read and identify complex gene structures.";
    point2 = "McKesson Corporation: Early prediction of depression, anxiety, and stress-related diseases.";
    point3 = "Apollo Pharmacy: Building personalized medication programs based on genomic sequencing.";
    point4 = "Bayer: Enhancing disease monitoring and prevention based on exploratory data analytics.";
  }
  if (transitionDomain === "Retail & E-commerce") {
    point1 = "Ikea: Enhance customer service through the use of natural language processing.";
    point2 = "Shopify: Utilizing ML customer segmentation technique to evaluate price optimization.";
    point3 = "DataCo: Automated inventory monitoring for supportable supply chain management.";
    point4 = "Adani Wilmar: Analytics-based approaches boost customer engagement and loyalty.";
  }
  if (transitionDomain === "Media and Hospitality") {
    point1 = "Twitter: Distribution of content on social media by analyzing user behavior.";
    point2 = "Buzz Feed: Using statistics from popular YouTube videos to gain deeper insights";
    point3 = "Airbnb: Analyzing information about public reputation data based on web reviews";
    point4 = "Orbitz: Get a better understanding of Hotel Energy Consumption  Management through IoT";
  }
  if (transitionDomain === "Transportation") {
    point1 = "FedEx: A Semi-Supervised Deep Learning Approach for Identification of Transportation Modes Using GPS-Derived Data.";
    point2 = "Ola: Reduction of waiting time via a highly precise forecasting model.";
    point3 = "Tesla: Analyzing Road safety management through predictive analysis.";
    point4 = "Honeywell International: Enhancement of the air traffic management system through the use of modern data analytics.";
  }

  if (transitionDomain === "Manufacturing") {
    point1 = "Bosch: Condition-based preventive maintenance and fault prediction in depth ";
    point2 = "Cannon: Identifying the technique of warranty analysis methodology with data analytics";
    point3 = "Nestle: Utilizing data analytics in managing inventories and predicting demand.";
    point4 = "Hitachi Engineering: Leveraging the use of data science techniques for product development and design";
  }
  if (transitionDomain === "Automotive") {
    point1 = "Toyota: Automotive sustainability development via ML.";
    point2 = "L&T: Improve quality assurance and minimize liability with early detection of malfunctions.";
    point3 = "Crestron: Investigating the creation of smart factories through automation and robotics.";
    point4 = "Fiat: Combining big data and automation in Designing and Developing the maximum possible efficient Product.";
  }
  if (transitionDomain === "Telecommunication") {
    point1 = "Jio: Churn forecasting for the telecom industry using R programming with ML.";
    point2 = "Globe Technologies: Enabling real-time location-based advertising.";
    point3 = "Lumen: Using historical data analysis, create a better network security structure.";
    point4 = "Swisscom: Understanding and detecting fraud using machine learning algorithms.";
  }
  if (transitionDomain === "Energy, Oil & Gas") {
    point1 = "Ather Energy: Creating a dynamic energy management system to conserve electricity and energy.";
    point2 = "Saudi Aramco: Understanding in-depth logging while drilling (LWD) technique.";
    point3 = "Repsol: Developing predictive and preventive measures based on live and historically analyzed data";
    point4 = "TotalEnergies: Integrating the use of Data Analytics in reservoir engineering";
  }


  try {
    // read our invoice-template.html file using node fs module
    const file = fs.readFileSync("./counselling-report.html", "utf8");

    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);

    const html = template({
      counselorName,
      stdGoal,
      stdEmail,
      stdPhone,
      stdName,
      stdExperience,
      stdDomain,
      stdCompany,
      stdCTC,
      suggestedProgram,
      primaryDomain,
      transitionDomain,
      averageHike,
      averageTimeline,
      counselorNote,
      counsellingDate,
      salesMan,
      counsellingId,
      team,
      point1,
      point2,
      point3,
      point4,
    });



    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pdfName = "[Personalized Career Counselling Report]" + stdName + new Date() + "-" + counsellingId;
    // console.log("pdfName",pdfName)

    const fPdfName = pdfName.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, "-");
    // console.log("fPdfName",fPdfName)


    const mailData = {
      from: "admissions@learnbay.co",
      to: stdEmail,
      subject: `Personalized Career Report of ${stdName}`,
      cc: salesMan,
      attachments: [
        {
          filename: `${fPdfName}.pdf`,
          path: `./public/counsellingReportPdf/${fPdfName}.pdf`,
          contentType: "application/pdf",
        },
      ],

      html: ` <div>Hi ${stdName},</div>
      <div style="color: rgb(17,85,204); font-weight:bold"><p>I am ${counselorName} your senior counselor for ${suggestedProgram}.</p></div>      
          <div ><p>With an experience of <b style="color: rgb(204,0,0);">${stdExperience} years</b> in <b  style="color: rgb(204,0,0);">${transitionDomain} domain</b>, it would take you <b style="color: rgb(204,0,0);">${averageTimeline}</b> for a successful career transition with an expected hike of <b style="color: rgb(204,0,0);">${averageHike}%</b></p></div>
          <div>
              <p style="color: rgb(17,85,204); font-weight:bold">To do so, you would need to follow certain steps:</p>
              <ol>
                  <li>Start learning basic tools and modules like <b style="color:#333">Python, Statistics, Machine Learning</b>, etc.</li>
                  <li>Perform <b style="color:#333">2 - 4 real time projects in ${transitionDomain} domain</b>.</li>
                  <li>Start learning <b style="color:#333">advanced tools and modules</b> guided by industry experts</li>
                  <li>Attain <b style="color:#333">40 hours of dedicated training for Domain Specialization</b> to make your profile unique and remarkable.</li>

                  <div style="background-color: rgb(255,255,255); color: #500050;"><p><i>[For a better understanding of your transitional experience, I have developed a customized career report for you, taking into consideration your professional background, goal, and requirement]</i></P></div>
                  
                  <li>… (Please refer to the following attachment for a detailed report).</li>
              </ol>
          </div>
          <br>
      <div>Regards,</div>
      <br>
      <div>Learnbay</div>`,

      // html: `<div>Hi ${stdName},</div><p>I am ${counselorName} your senior counselor for ${suggestedProgram}.</p> <p>For a better understanding of your transitional experience, I have developed a customized career report for you, taking into consideration your professional background, goal, and requirement.</P>
      //  <p>Please refer to the following attachment.</p><div>Regards,</div><div>Learnbay</div>`,
    };


    // console.log("mailData",mailData)

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: "networkidle0" });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: "A4" });
    // console.log("pdf",pdf)

    fs.mkdirSync("./public/counsellingReportPdf", { recursive: true });
    fs.writeFileSync(`./public/counsellingReportPdf/${fPdfName}.pdf`, pdf);

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

        if (team === "Organic Team") {
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID_1,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [
                  counselorName,
                  stdGoal,
                  stdEmail,
                  stdPhone,
                  stdName,
                  stdExperience +" Years",
                  stdDomain,
                  stdCompany,
                  stdCTC +" LPA",
                  suggestedProgram,
                  primaryDomain,
                  transitionDomain,
                  averageHike + " %",
                  averageTimeline,
                  counselorNote,
                  counsellingDate,
                  salesMan,
                  counsellingId,
                  team,
                  fPdfName,
                  fileUpload,
                ],
              ],
            },
          });
        }
        // if (team === "Google ads-1 (Irfan)") {
        //   const response = await sheets.spreadsheets.values.append({
        //     spreadsheetId: process.env.GOOGLE_SHEET_ID_1,
        //     range: "Google ads-1 (Irfan)",
        //     valueInputOption: "USER_ENTERED",
        //     requestBody: {
        //       values: [
        //         [
        //           counselorName,
        //           stdGoal,
        //           stdEmail,
        //           stdPhone,
        //           stdName,
        //           stdExperience,
        //           stdDomain,
        //           stdCompany,
        //           stdCTC,
        //           suggestedProgram,
        //           primaryDomain,
        //           transitionDomain,
        //           averageHike,
        //           averageTimeline,
        //           counselorNote,
        //           counsellingDate,
        //           salesMan,
        //           counsellingId,
        //           team,
        //         ],
        //       ],
        //     },
        //   });
        // }
        // if (team === "Google ads-2 (Shah)") {
        //   const response = await sheets.spreadsheets.values.append({
        //     spreadsheetId: process.env.GOOGLE_SHEET_ID_1,
        //     range: "Google ads-2 (Shah)",
        //     valueInputOption: "USER_ENTERED",
        //     requestBody: {
        //       values: [
        //         [
        //           counselorName,
        //           stdGoal,
        //           stdEmail,
        //           stdPhone,
        //           stdName,
        //           stdExperience,
        //           stdDomain,
        //           stdCompany,
        //           stdCTC,
        //           suggestedProgram,
        //           primaryDomain,
        //           transitionDomain,
        //           averageHike,
        //           averageTimeline,
        //           counselorNote,
        //           counsellingDate,
        //           salesMan,
        //           counsellingId,
        //           team,
        //         ],
        //       ],
        //     },
        //   });
        // }


        let myPost = await db.collection("counsellingReport").insertOne({

          counselorName: counselorName,
          stdGoal: stdGoal,
          stdEmail: stdEmail,
          stdPhone: stdPhone,
          stdName: stdName,
          stdExperience: stdExperience,
          stdDomain: stdDomain,
          stdCompany: stdCompany,
          stdCTC: stdCTC,
          suggestedProgram: suggestedProgram,
          primaryDomain: primaryDomain,
          transitionDomain: transitionDomain,
          averageHike: averageHike,
          averageTimeline: averageTimeline,
          counselorNote: counselorNote,
          counsellingDate: counsellingDate,
          salesMan: salesMan,
          counsellingId: counsellingId,
          pdfName: fPdfName,
          fileLink: fileUpload,
          emailInfo: emailSent,
          team: team,
        });

        // console.log("@@@@",myPost)
        res.status(200).json({
          myPost: myPost.insertedId,
          pdfName: fPdfName,
          fileLink: fileUpload,
          emailInfo: emailSent,
        });

        fs.unlinkSync(`./public/counsellingReportPdf/${fPdfName}.pdf`);
      }
    });

    // send the result to the client
  } catch (err) {
    res.status(500).json({ message: err.message, "error api": "error api " });
  }
}