const crypto = require("crypto");

export default async function handler(req, res) {
  try {
    // getting the details back from our font-end

    const { orderCreationId, paymentId, orderId, signature } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + paymentId, secret);
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    shasum.update(`${orderCreationId}|${paymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== signature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    res.status(200).json({
      msg: "success",
      orderId: orderId,
      paymentId: paymentId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ name: error });
  }
}
