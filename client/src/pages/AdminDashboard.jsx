import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseUrl } from "../main";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/books`, {
        withCredentials: true,
      });

      setBooks(res.data.books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    const confirm = window.confirm("Are you sure to delete this book?");

    if (!confirm) return;

    try {
      await axios.delete(`${BaseUrl}/books/${id}`, {
        withCredentials: true,
      });

      alert("Book Deleted Successfully");
      fetchBooks();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  if (loading) {
    return <h2 className="p-6">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <Alert className="mb-6">
          <AlertTitle className="text-xl">
            Admin Dashboard
          </AlertTitle>
        </Alert>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Books</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {books.length}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {
                [...new Set(books.map((b) => b.category))].length
              }
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Available</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {books.reduce((sum, b) => sum + b.stock, 0)}
            </CardContent>
          </Card>
        </div>

        {/* ACTION BUTTON */}
        <div className="mb-6">
          <Link to="/admin/add-book">
            <Button>Add New Book</Button>
          </Link>
        </div>

        {/* BOOK LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => (
            <Card key={book._id}>
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600">{book.author}</p>
                <p>Category: {book.category}</p>
                <p>Price: ₹{book.price}</p>
                <p>Stock: {book.stock}</p>

                <div className="flex gap-3 mt-4">
                  <Link to={`/admin/edit-book/${book._id}`}>
                    <Button variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
