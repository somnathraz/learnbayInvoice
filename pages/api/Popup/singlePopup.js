import { connectToDatabase } from "../../../lib/mongodb";
export default async function generatePage(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { id } = req.body;
    console.log(id, "singlePopup");
    try {
      let myPost = await db.collection("popup").findOne({
        id: id,
      });
      console.log(myPost);
      res.status(200).json({ myPost: myPost, msg: "popup send" });
    } catch (error) {
      res.status(500).json({ error, msg: "error" });
    }
  }
}
