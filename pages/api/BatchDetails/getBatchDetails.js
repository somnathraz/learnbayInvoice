// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { daysInfo, dateInfo, timeInfo, page } = req.body;
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    try {
      const result = await db.collection("BatchDetails").insertOne({
        daysInfo: daysInfo,
        dateInfo: dateInfo,
        timeInfo: timeInfo,
        page: page,
      });
    } catch (error) {
      console.log("cccc", error);
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
      res.status(500).json({ message: "An error occurred while deleting the document." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
  console.log("asdfgfs", req.body);
}
