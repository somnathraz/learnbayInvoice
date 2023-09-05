import { connectToDatabase } from "../../../lib/mongodb";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "GET") {
    try {
      const popData = [];

      const generateCertificateId = await db
        .collection("certificateId")
        .find()
        .forEach(function (item) {
          popData.push(item);
        });

      res.status(200).json({ id: popData[0].id, msg: "id fetched" });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
  if (req.method === "POST") {
    const { id } = req.body;

    const popData = [];

    try {
      const getId = await db
        .collection("certificateId")
        .find()
        .forEach(function (item) {
          popData.push(item);
        });
      console.log(popData[0].id, "certigifcisfnfngsdf");
      const generateCertificateId = await db
        .collection("certificateId")
        .updateOne(
          {
            id: popData[0].id,
          },
          {
            $set: {
              id: parseInt(id),
            },
          }
        );

      res.status(200).json({ msg: "id updated" });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
}
