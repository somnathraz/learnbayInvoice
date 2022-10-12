import { connectToDatabase } from "../../lib/mongodb";

const saltRounds = 12;

export default async function handler(req, res) {
  const { sendId } = req.body;
  console.log(sendId);

  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    try {
      const idConflict = await db.collection("idValid").findOne({
        sendId,
      });
      if (idConflict) {
        res.status(409).json({ message: "id already exist" });
      } else {
        // Hash password

        // Insert user into database
        const result = await db.collection("idValid").insertOne({
          id: sendId,
        });

        // Send all-clear with _id as token
        res.status(200).json({
          token: result.insertedId.toString(),
          id: sendId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
