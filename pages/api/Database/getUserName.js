import { connectToDatabase } from "../../../lib/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      let { discountPercent, couponCode, expireAt } = req.body;
      const couponName = await db.collection("coupon").findOne({
        couponCode,
      });
      if (couponName) {
        res.status(409).json({ msg: "coupon Already Exist" });
      } else {
        let myPost = await db.collection("coupon").insertOne({
          discountPercent,
          couponCode,
          expireAt: new Date(expireAt),
        });
        await db
          .collection("coupon")
          .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
        res.json({ myPost, msg: "coupon created" });
      }

      break;
    case "GET":
      res.status(502).json({ msg: "go back" });

      break;
  }
}
