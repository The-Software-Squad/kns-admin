import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
  return (
    <Layout>
      <div className="flex flex-col items-start w-1/2">
        <h1>Orders</h1>
        <table className="basic">
          <thead>
            <tr>
              <td>Date</td>
              <td>Paid</td>
              <td>Customer name</td>
              <td>Products</td>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order, i) => (
                <tr key={i}>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td className={order.paid ? 'text-green-600' : 'text-red-600'}>{order.paid ? 'YES' : 'NO'}</td>
                  <td>{order.name}</td>
                  <td>
                    {order.line_items.map((item, i) => (
                      <>
                        <p>
                          {item.price_data.product_data?.name} x {item.quantity}{" "}
                        </p>
                      </>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
