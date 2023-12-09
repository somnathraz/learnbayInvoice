import { connectToDatabase } from "../../../lib/mongodb";
export default async function generatePage(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { heading, para1, para2, page, subHeading, validText } = req.body;

    const idGenerate =
      heading.slice(0, 3) + Math.floor(Math.random() * 1000000);
    console.log(idGenerate);
    // console.log(req.body);
    try {
      let myPost = await db.collection("popup").insertOne({
        id: idGenerate,
        heading,
        para1,
        para2,
        page,
        subHeading,
        validText,
        // show: false,
        // expireAt: new Date(endDate),
      });

      res.status(200).json({ myPost, msg: "popup created" });
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "DELETE") {
    let { id } = req.body;
    console.log(id, "id from req body");

    const findPopup = await db.collection("popup").findOne({ id: id });
    console.log(findPopup);

    if (findPopup) {
      const deletePopup = await db.collection("popup").deleteOne({
        id: id,
      });
      res.status(200).json({ msg: deletePopup.deletedCount });
    } else res.status(409).json({ msg: "popup not found" });
  }
  if (req.method === "PATCH") {
    console.log("patch method");
    let {
      id,
      heading,
      para1,
      para2,
      startDate,
      endDate,
      page,
      subHeading,
      validText,
    } = req.body;

    console.log(page, "server page list");
    const findPopup = await db.collection("popup").findOne({
      id: id,
    });
    console.log(findPopup, "in patch");
    if (findPopup) {
      console.log("updating....");
      const updatePopup = await db.collection("popup").updateOne(
        {
          id: id,
        },
        {
          $set: {
            heading,
            para1,
            para2,
            startDate,
            endDate,
            page,
            subHeading,
            validText,
            // expireAt: new Date(endDate),
          },
        }
      );
      await db
        .collection("popup")
        .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
      res.status(200).json({ msg: "popup updated" });
    }
  }
  if (req.method === "GET") {
    try {
      const popData = [];

      let myPost = await db
        .collection("popup")
        .find()
        .forEach(function (item) {
          popData.push(item);
        });

      res.status(200).json({ popData, msg: "all popup" });
    } catch (error) {}
  }
}
