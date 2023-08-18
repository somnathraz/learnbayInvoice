import { connectToDatabase } from "../../../lib/mongodb";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "DELETE") {
    const { id, batchId } = req.body;
    console.log(batchId, "id");
    try {
      const findBatch = await db.collection("BatchDetails").findOne({ id: id });
      // console.log(findBatch,"hello")

      if (findBatch) {
        const updateBatch = await db.collection("BatchDetails").updateOne(
          {
            id: id,
          },
          {
            $pull: { batchDetails: { batchId: batchId } },
          }
        );
        //   console.log(updateBatch,"update");
      }
      res.status(200).json({ msg: "batch Deleted" });
    } catch (error) {
      // console.log(error);
      res.status(200).send(error);
    }
  }
}
