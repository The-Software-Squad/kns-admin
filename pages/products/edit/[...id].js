import Layout from "@/components/Layout";
import { useRouter } from "next/router";
export default function EditProductPage(){
    const router = useRouter()
    return (
        <Layout>
            <div>Edit product</div>
        </Layout>
    )
}