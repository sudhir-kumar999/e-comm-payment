import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BaseUrl } from "../main";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${BaseUrl}/books`).then((res) => setBooks(res.data.books));
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {books.map((book) => (
        <Card key={book._id} className="hover:shadow-lg transition-all">
          <CardContent className="p-3 sm:p-4">
            <img
              src={book.image}
              className="h-32 sm:h-40 mx-auto object-contain"
            />

            <h3 className="font-bold mt-2 text-sm sm:text-base">
              {book.title}
            </h3>

            <p className="text-xs sm:text-sm">{book.author}</p>

            <p className="font-semibold text-sm sm:text-base">
              ₹{book.price}
            </p>

            <Link to={`/books/${book._id}`}>
              <Button className="w-full mt-2 text-xs sm:text-sm">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Books;
