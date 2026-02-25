import React, { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../main";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    image: "",
    stock: 10,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `${BaseUrl}/books/add`,
      form,
      { withCredentials: true }
    );

    if (res.data.success) {
      alert("Book Added Successfully");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          placeholder="Title"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Author"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        <input
          placeholder="Price"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Category"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <textarea
          placeholder="Short Description"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, shortDescription: e.target.value })
          }
        />

        <textarea
          placeholder="Long Description"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, longDescription: e.target.value })
          }
        />

        <button className="bg-blue-600 text-white p-2">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
