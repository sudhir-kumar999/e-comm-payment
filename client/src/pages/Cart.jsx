import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { BaseUrl } from "../main";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

//   const handleCheckout = async () => {
//   try {
//     // Prepare minimal cart data (ONLY IDs + quantity)
//     const items = cart.map((item) => ({
//       productId: item._id,      // 👈 ONLY ID
//       quantity: item.quantity,  // 👈 Quantity
//     }));

//     // 1. Create Order on Backend
//     const res = await axios.post(
//       `${BaseUrl}/payment/create`,
//       {
//         productId: items._id,   // 👈 real minimal data
//         price: total,   // 👈 only total amount
//       },
//       {
//         withCredentials: true,
//       }
//     );

//     const { order } = res.data;

//     // 2. Open Razorpay Checkout
//     const options = {
//       key: "rzp_test_SCgmKKnCQEB7eM",
//       amount: order.amount,
//       currency: "INR",
//       name: "Book Store",
//       description: "Cart Checkout",
//       order_id: order.id,

//       handler: async function (response) {
//         // 3. Verify Payment
//         const verify = await axios.post(
//           `${BaseUrl}/payment/verify`,
//           {
//             order_id: response.razorpay_order_id,
//             payment_id: response.razorpay_payment_id,
//             signature: response.razorpay_signature,

//             // 👇 again ONLY ids + quantity
//             productId: items,
//             price: total,
//           },
//           { withCredentials: true }
//         );

//         if (verify.data.success) {
//           alert("Payment Successful!");

//           // Clear cart after successful payment
//           clearCart();
//         } else {
//           alert("Payment Verification Failed");
//         }
//       },

//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const razor = new window.Razorpay(options);
//     razor.open();
//   } catch (error) {
//     console.log("Payment Error:", error);
//     alert("Payment Failed");
//   }
// };

const handleCheckout = async () => {
  try {
    // Prepare minimal cart data
    const items = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    // 1. Create Order on Backend
    const res = await axios.post(
      `${BaseUrl}/payment/create`,
      {
        items: items,    // 👈 FIXED
        price: total,
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
      name: "Book Store",
      description: "Cart Checkout",
      order_id: order.id,

      handler: async function (response) {
        const verify = await axios.post(
          `${BaseUrl}/payment/verify`,
          {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,

            // 👇 Send real items array
            items: items,
            price: total,
          },
          { withCredentials: true }
        );

        if (verify.data.success) {
          alert("Payment Successful!");
          clearCart();
        } else {
          alert("Payment Verification Failed");
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (error) {
    console.log("Payment Error:", error);
    alert("Payment Failed");
  }
};


 if (cart.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h3 className="text-xl text-gray-600">Cart is Empty 😔</h3>
    </div>
  );
}

return (
  <div className="min-h-screen flex flex-col">
    <div className="flex-1 p-6 max-w-4xl mx-auto pb-16 w-full">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex flex-col sm:flex-row justify-between items-center border p-3 mb-3 gap-3"
        >
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p>₹{item.price}</p>
          </div>

          <div className="flex gap-2 items-center">
            <Button onClick={() => decreaseQty(item._id)}>-</Button>

            <span>{item.quantity}</span>

            <Button onClick={() => increaseQty(item._id)}>+</Button>

            <Button
              variant="destructive"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <h3 className="text-xl font-bold mt-4">
        Total: ₹{total}
      </h3>

      <Button className="mt-4 w-full" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  </div>
);

};

export default Cart;
