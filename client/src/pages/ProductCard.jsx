import React, { useContext } from "react";
import axios from "axios";
import { BaseUrl } from "../main";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext"; // ✅ ADD

const ProductCard = ({ item }) => {
  // ✅ Cart Context
  const { addToCart } = useContext(CartContext);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    addToCart(item);
    console.log("ADD CLICKED"); // 👈 add this
    // ✅ TOAST
    // toast.success(`${item.name} added to cart 🛒`);
  };

  // =========================
  // PAYMENT
  // =========================
  const handlePayment = async () => {
    try {
      toast.info("Creating order...");

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

      {/* ✅ ADD TO CART BUTTON */}
      <button
        className="border p-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      {/* ✅ BUY NOW BUTTON */}
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
