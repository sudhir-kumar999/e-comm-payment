import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BaseUrl } from "../main";
import { CartContext } from "../context/CartContext";
import { getBookAnalysis } from "../utils/gemini";

import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

const BookDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);

  // ✅ AI STATES
  const [analysis, setAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    axios.get(`${BaseUrl}/books/${id}`).then((res) => {
      setBook(res.data.book);

      axios.get(`${BaseUrl}/books`).then((r) => {
        const sameCat = r.data.books.filter(
          (b) =>
            b.category === res.data.book.category &&
            b._id !== res.data.book._id
        );
        setRelated(sameCat.slice(0, 3));
      });
    });
  }, [id]);

  // ================= AI ANALYSIS =================
  const handleAIAnalysis = async () => {
    try {
      setLoadingAI(true);
      const result = await getBookAnalysis(book);
      setAnalysis(result);
    } catch {
      setAnalysis("AI analysis failed.");
    } finally {
      setLoadingAI(false);
    }
  };

  if (!book) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto pb-16">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <img
                src={book.image}
                className="h-60 sm:h-72 object-contain"
                alt={book.title}
              />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {book.title}
              </h2>

              <p className="text-gray-600 mt-1">
                Author: {book.author}
              </p>

              <p className="mt-2">
                Category:{" "}
                <span className="font-semibold text-blue-600">
                  {book.category}
                </span>
              </p>

              <p className="mt-4 text-gray-700">
                {book.longDescription}
              </p>

              <p className="font-bold text-lg mt-4">
                Price: ₹{book.price}
              </p>

              <Button
                className="mt-4 w-full sm:w-auto"
                onClick={() => addToCart(book)}
              >
                Add to Cart
              </Button>
            </div>
          </div>

                  {/* ================= AI PANEL ================= */}
        <Card className="h-fit sticky top-6">
          <CardHeader>
            <CardTitle>🤖 AI Book Analysis</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {!analysis && !loadingAI && (
              <Button onClick={handleAIAnalysis} className="w-full">
                Generate Analysis
              </Button>
            )}

            {loadingAI && (
              <p className="text-sm text-muted-foreground">
                Analyzing book with AI...
              </p>
            )}

            {analysis && (
              <ScrollArea className="h-[400px] pr-2 text-sm whitespace-pre-line">
                <ReactMarkdown>
                  {analysis}
                </ReactMarkdown>
              </ScrollArea>
            )}

          </CardContent>
        </Card>

          {/* RELATED BOOKS */}
          {related.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                More from {book.category}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {related.map((b) => (
                  <Card key={b._id}>
                    <CardContent className="p-3 text-center">
                      <img
                        src={b.image}
                        className="h-28 mx-auto object-contain"
                      />
                      <h4 className="text-sm font-semibold mt-2">
                        {b.title}
                      </h4>
                      <p className="text-xs">₹{b.price}</p>

                      <Link to={`/books/${b._id}`}>
                        <Button className="mt-2 text-xs w-full">
                          View
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>



      </div>
    </div>
  );
};

export default BookDetail;