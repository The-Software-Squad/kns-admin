import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <Layout>
      <div className="flex flex-col w-full gap-5">
        <Link className="btn-primary h-fit w-fit" href={"/products/new"}>
          Add new product
        </Link>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Product name
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-6 py-4 text-gray-800">{product.title}</td>
                <td className="flex gap-10 justify-center px-6 py-4">
                 
                  {/* Edit button */}
                  <Link
                    href={`/products/edit/${product._id}`}
                    className="flex items-center"
                  >
                    <span className="text-blue-500 hover:underline mr-2">
                      Edit
                    </span>
                    <span className="material-symbols-rounded text-blue-500">
                      edit_square
                    </span>
                  </Link>
                  
                  {/* Delete Button */}
                  <Link
                    href={`/products/delete/${product._id}`}
                    className="flex items-center"
                  >
                    <span className="text-red-500 hover:underline mr-2">
                      Delete
                    </span>
                    <span className="material-symbols-rounded  text-red-500">
                      delete
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
