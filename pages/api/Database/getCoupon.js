import { connectToDatabase } from "../../../lib/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      let { couponCode } = req.body;
      console.log(req.body, "request api");
      const couponName = await db.collection("coupon").findOne({
        couponCode: couponCode,
      });
      console.log(couponName, "counpin anem api");
      if (!couponName) {
        res.status(404).json({ msg: " Coupon is not valid" });
      } else {
        res.status(200).json({ couponName, msg: "coupon Applied" });
      }

      break;
    case "DELETE":
      let { couponCodeNameData } = req.body;
      console.log(req.body, "delete api");
      const couponNameData = await db.collection("coupon").deleteOne({
        couponCode: couponCodeNameData,
      });
      console.log(couponNameData, "counpin anem api");
      if (!couponCodeNameData) {
        res.status(404).json({ msg: " Coupon is not valid" });
      } else {
        res.status(200).json({ couponNameData, msg: "coupon deleted" });
      }

      break;
    case "GET":
      res.status(502).json({ msg: "go back" });

      break;
  }
}
