import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../main";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/orders/my`, { withCredentials: true })
      .then((res) => setOrders(res.data.orders))
      .catch(() => setOrders([]));
  }, []);

  const getStatusColor = (status) => {
    if (status === "confirmed") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 pb-20">
      <div className="max-w-5xl mx-auto">

        <Alert className="mb-6 bg-white shadow">
          <AlertTitle className="text-xl">
            📦 My Orders
          </AlertTitle>
          <AlertDescription>
            View all your purchased books and order status
          </AlertDescription>
        </Alert>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No orders found 😔
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {orders.map((o) => (
              <Card key={o._id} className="hover:shadow-xl transition-all">

                <CardHeader>
                  <CardTitle className="text-lg">
                    Order ID: {o._id}
                  </CardTitle>

                  <CardDescription>
                    Total Amount: ₹{o.amount}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">

                    {/* ITEMS LIST */}
                    <div>
                      <h4 className="font-semibold mb-2">Books:</h4>

                      {o.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm mb-1"
                        >
                          <span>
                            {item.productId?.title || "Book"}
                          </span>

                          <span>
                            Qty: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status:</span>

                      <Badge className={getStatusColor(o.status)}>
                        {o.status}
                      </Badge>
                    </div>

                  </div>
                </CardContent>
              </Card>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;
