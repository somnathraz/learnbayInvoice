const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const body = req.body;

    // body.prop.map((data, i) => {
    //   console.log(data, "inside map");
    // });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const GST =
      (18 / 100) *
      (body.prop[0].price - (body.discount / 100) * body.prop[0].price);
    const amount =
      body.prop[0].price - (body.discount / 100) * body.prop[0].price + GST;
    const quantity = body.prop[0].quantity;
    const currency = "INR";

    const options = {
      amount: (amount * 100).toString() * quantity,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        coursePrice: body.prop[0].price,
        currency: response.currency,
        name: body.prop[0].name,
        amount: amount,
        GST: GST,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(200).json({ name: "hello" });
  }
}
