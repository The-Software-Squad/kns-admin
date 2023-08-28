import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
  return (
    <Layout>
      <div className="flex flex-col w-full gap-2">
        <h1>New Product</h1>
        <ProductForm />
      </div>
    </Layout>
  );
}
