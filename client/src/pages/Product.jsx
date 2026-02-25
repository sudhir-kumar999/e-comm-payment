import axios from "axios";
import React, { useState, useEffect } from "react";
import { BaseUrl } from "../main";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify"; // ✅ ADD

const Product = () => {
  const [data, setData] = useState([]);

  const getProduct = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/product/details`, {
        withCredentials: true,
      });

      setData(res.data.data);

      // optional success toast
      // toast.success("Products Loaded ✅");

    } catch (error) {
      console.log(error);
      toast.error("Failed to load products ❌"); // ✅ ERROR TOAST
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2>All Products</h2>

      {data.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        data.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))
      )}
    </div>
  );
};

export default Product;