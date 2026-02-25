import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { myContext } from "../context/AuthContext";
import { BaseUrl } from "../main";

const Home = () => {
  const { user } = useContext(myContext);

  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  const getCategoryIcon = (cat) => {
  switch (cat.toLowerCase()) {
    case "programming": return "💻";
    case "finance": return "💰";
    case "history": return "🏛️";
    case "fantasy": return "🧙";
    case "business": return "📈";
    case "horror": return "👻";
    case "mystery": return "🕵️";
    case "biography": return "👤";
    case "self help": return "🌱";
    case "spiritual": return "🕉️";
    case "thriller": return "🔪";
    case "classic": return "📖";
    case "fiction": return "📘";
    case "dystopian": return "🌆";
    default: return "📚";
  }
};


  useEffect(() => {
    // Fetch categories
    axios
      .get(`${BaseUrl}/books/categories`)
      .then((res) => setCategories(res.data.categories))
      .catch(() => setCategories([]));

    // Fetch sample books
    axios
      .get(`${BaseUrl}/books?limit=6`)
      .then((res) => setBooks(res.data.books))
      .catch(() => setBooks([]));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 md:px-8 py-10">
      {/* HERO SECTION */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to Book Store 📚
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Discover, read and buy your favorite books at the best prices.
        </p>
      </div>



      {/* ===== CATEGORY SECTION ===== */}
          {/* ===== CATEGORY SECTION (IMPROVED) ===== */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {categories.map((cat, index) => (
    <Link key={index} to={`/books?category=${cat}`}>
      <div
        className="p-5 rounded-xl text-center font-semibold shadow-md
        bg-gradient-to-r from-indigo-50 to-blue-50
        hover:from-indigo-100 hover:to-blue-100
        transition-all cursor-pointer hover:shadow-lg"
      >
        <div className="text-3xl mb-2">
          {getCategoryIcon(cat)}
        </div>

        <span className="text-gray-800">
          {cat}
        </span>
      </div>
    </Link>
  ))}
</div>



      {/* ===== SAMPLE BOOKS SECTION ===== */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Popular Books</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book._id} className="hover:shadow-xl transition-all">
              <CardContent className="p-4 text-center">
                <img
                  src={book.image}
                  className="h-40 mx-auto mb-2 object-contain"
                />

                <h3 className="font-semibold">{book.title}</h3>

                <p className="text-sm text-gray-500">{book.author}</p>

                <p className="font-bold mt-1">₹{book.price}</p>

                <Link to={`/books/${book._id}`}>
                  <Button className="mt-2 w-full">View</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
