import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex items-center justify-between w-full h-fit px-3">
        <h2>Hello <b>{session?.user?.name}</b></h2>
        <div className="flex gap-1 bg-gray-300 text-black rounded-lg overflow-hidden ">
          <img src={session?.user?.image} alt="profile" className="w-9 h-9" />
          <span className="p-1.5">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
