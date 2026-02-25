import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "@/main";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/orders/admin/confirmed`, { withCredentials: true })
      .then((res) => setOrders(res.data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Confirmed Orders</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              No confirmed orders yet.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {new Date(order.createdAt).toLocaleString()} · {order.userId?.name || "—"} ({order.userId?.email || "—"})
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-gray-600">Amount: ₹{order.amount}</p>
                  {order.items?.length > 0 && (
                    <ul className="mt-2 list-disc list-inside">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.productId?.title || "Book"} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-2 text-green-600 font-medium">Status: {order.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
