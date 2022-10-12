import { connectToDatabase } from "../../../lib/mongodb";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  console.log(req.body);

  switch (req.method) {
    case "POST":
      let bodyObject = req.body;

      let myPost = await db.collection("generatedInvoice").findOne(bodyObject);
      res.status(200).json({ myPost, msg: "successful" });

      break;
    case "GET":
      const allPosts = await db
        .collection("generatedInvoice")
        .find({})
        .toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
