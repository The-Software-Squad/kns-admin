import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
    return (
        <Layout>
            <Link className="btn-primary h-fit" href={'/products/new'}>
                Add new product
            </Link>
        </Layout>
    )
}