import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // ✅ ADD

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // =========================
  // LOAD CART
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // =========================
  // SAVE CART
  // =========================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (book) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === book._id);

      let updatedCart;

      if (exist) {
        updatedCart = prev.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prev, { ...book, quantity: 1 }];
      }

      // ✅ Toast after update
      setTimeout(() => {
        toast.success(`${book.name || book.title} added to cart 🛒`);
      }, 0);

      return updatedCart;
    });
  };

  // =========================
  // REMOVE FROM CART
  // =========================
  const removeFromCart = (id) => {
    const item = cart.find((i) => i._id === id);

    setCart(cart.filter((item) => item._id !== id));

    if (item) {
      toast.error(`${item.name || item.title} removed ❌`);
    }
  };

  // =========================
  // INCREASE QTY
  // =========================
  const increaseQty = (id) => {
    const item = cart.find((i) => i._id === id);

    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    if (item) {
      toast.info(`Quantity increased (${item.quantity + 1})`);
    }
  };

  // =========================
  // DECREASE QTY
  // =========================
  const decreaseQty = (id) => {
    const item = cart.find((i) => i._id === id);

    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    if (item && item.quantity > 1) {
      toast.info(`Quantity decreased (${item.quantity - 1})`);
    }
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = () => {
    setCart([]);
    toast.warning("Cart cleared 🧹");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};