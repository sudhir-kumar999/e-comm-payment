import Order from "../models/Order.js";
import crypto from "crypto";

export const razorpayWebhook = async (req, res) => {
  try {
    console.log("🔥 WEBHOOK HIT RECEIVED");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const event = req.body.event;

    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;

      await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        {
          status: "confirmed",
          razorpayPaymentId: payment.id,
        }
      );
    }

    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
