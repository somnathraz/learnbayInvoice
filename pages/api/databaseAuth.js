import { connectToDatabase } from "../../lib/mongodb";
import { authentication } from "../../lib/googleSheet";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { sheets } = await authentication();
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      console.log(bodyObject);
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              bodyObject.customerName,
              bodyObject.customerEmail,
              bodyObject.invoiceDate,
              bodyObject.customerPhone,
              bodyObject.coursePrice,
              bodyObject.DiscountPrice,
              bodyObject.TotalPrice,
              bodyObject.GST,
              bodyObject.invoiceId,
              bodyObject.courseName,
            ],
          ],
        },
      });

      let myPost = await db.collection("payment").insertOne(bodyObject);
      if (response.status === 200)
        res.status(200).json({ myPost, msg: "successful" });

      break;
    case "GET":
      const allPosts = await db.collection("payment").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
