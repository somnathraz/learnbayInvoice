// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { daysInfo, dateInfo, timeInfo, page } = req.body;
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    let id = "";
    let batchId = "";

    if (page === "Data Science and AI") {
      id = "DSI";
      batchId = id + daysInfo + dateInfo;
    }
    if (page === "Software Development") {
      id = "SD";
      batchId = id + daysInfo + dateInfo;
    }
    if (page === "Business Analytics Family") {
      id = "BAF";
      batchId = id + daysInfo+ dateInfo;
    }


    // try {
    //   const result = await db.collection("BatchDetails").insertOne({
    //     daysInfo: daysInfo,
    //     dateInfo: dateInfo,
    //     timeInfo: timeInfo,
    //     page: page,
    //   });
    // } catch (error) {
    //   console.log("cccc", error);
    // }

    try {
      const checkForId = await db.collection("BatchDetails").findOne({
        id,
      });
      if (checkForId) {
        const updateBatch = await db.collection("BatchDetails").updateOne(
          {
            id: id,
          },
          {
            $push: {
              batchDetails: {
                batchId: batchId,
                daysInfo: daysInfo,
                dateInfo: dateInfo,
                timeInfo: timeInfo,
                page: page,
              
              },
            },
          }
        );
     
        res.send("hello");
      } else {
        const CreateBatch = await db.collection("BatchDetails").insertOne({
          id,
          batchDetails: [
            {
              batchId: batchId,
              daysInfo: daysInfo,
              dateInfo: dateInfo,
              timeInfo: timeInfo,
              page: page,
             
            },
          ],
        });
        await db
          .collection("BatchDetails")
          .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
        res.send("hello");
      }
    } catch (error) {}
  }

  if (req.method === "GET") {
    console.log("Get request");
    const { db } = await connectToDatabase();
    try {
      const batchDatesDetails = [];

      let myPost = await db
        .collection("BatchDetails")
        .find()
        .forEach(function (item) {
          batchDatesDetails.push(item);
        });
      console.log(batchDatesDetails);
      res
        .status(200)
        .json({ batchDatesDetails, msg: "daysInfo fetch sucees" });
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "DELETE") {
    const { db } = await connectToDatabase();
    const { daysInfo, dateInfo, timeInfo, page } = req.body;

    try {
      const result = await db.collection("BatchDetails").deleteOne({
        daysInfo: daysInfo,
        dateInfo: dateInfo,
        timeInfo: timeInfo,
        page: page,
      });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Document deleted successfully." });
      } else {
        res.status(404).json({ message: "Document not found." });
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the document." });
    }
  }
}
