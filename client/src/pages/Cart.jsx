import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { BaseUrl } from "../main";
import { toast } from "react-toastify"; // ✅ ADD

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

  const handleCheckout = async () => {
    try {
      const items = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      // ✅ Create Order
      const res = await axios.post(
        `${BaseUrl}/payment/create`,
        {
          items,
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
          try {
            const verify = await axios.post(
              `${BaseUrl}/payment/verify`,
              {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                items,
                price: total,
              },
              { withCredentials: true }
            );

            if (verify.data.success) {
              toast.success("Payment Successful ✅"); // ✅ TOAST
              clearCart();
            } else {
              toast.error("Payment Verification Failed ❌");
            }
          } catch (err) {
            toast.error("Verification Error ⚠️");
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
      toast.error("Payment Failed ❌"); // ✅ TOAST
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

        <h3 className="text-xl font-bold mt-4">Total: ₹{total}</h3>

        <Button className="mt-4 w-full" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;