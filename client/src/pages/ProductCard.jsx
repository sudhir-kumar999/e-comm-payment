import React from "react";
import axios from "axios";
import { BaseUrl } from "../main";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {

  const handlePayment = async () => {
    try {
      toast.info("Creating order...");

      // ✅ 1. Create Order
      const res = await axios.post(
        `${BaseUrl}/payment/create`,
        {
          productId: item._id,
          price: item.price,
        },
        {
          withCredentials: true,
        }
      );

      const { order } = res.data;

      // ✅ 2. Razorpay Checkout Options
      const options = {
        key: "rzp_test_SCgmKKnCQEB7eM",
        amount: order.amount,
        currency: "INR",
        name: "My Shop",
        description: item.name,
        order_id: order.id,

        handler: async function (response) {
          try {
            toast.info("Verifying payment...");

            // ✅ 3. Verify Payment
            const verify = await axios.post(
              `${BaseUrl}/payment/verify`,
              {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            if (verify.data.success) {
              toast.success("Payment Successful 🎉");
            } else {
              toast.error("Payment Verification Failed ❌");
            }
          } catch (err) {
            toast.error("Verification Error");
          }
        },

        modal: {
          ondismiss: function () {
            toast.warning("Payment Cancelled");
          },
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.log("Payment Error:", error);
      toast.error("Payment Failed. Try again!");
    }
  };

  return (
    <div className="border flex flex-col gap-4 p-4 rounded-lg shadow">
      <h3 className="font-semibold text-lg">{item.name}</h3>
      <p>{item.description}</p>
      <p className="font-medium">Price: ₹{item.price}</p>
      <p>Category: {item.category}</p>

      <button
        className="border p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handlePayment}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;