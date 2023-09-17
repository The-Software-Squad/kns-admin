import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    const isTabletOrDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isTabletOrDesktop) {
      setIsMenuOpen(true);
    }
  }, []); 


  // Not Logged In

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center justify-center">
        <div className=" text-center w-full">
          <button
            className="bg-white p-2 px-4 rounded-lg"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

 

  return (
    <div>
      <div className="flex gap-6 m-4 items-center md:hidden">
        {isMenuOpen ? (
          <span
            className="material-symbols-rounded cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            menu_open
          </span>
        ) : (
          <span
            className="material-symbols-rounded "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            menu
          </span>
        )}

        <Link href={"/"} className="flex gap-1 items-center">
          <span className="material-symbols-rounded">potted_plant</span>
          <span>KNS Admin</span>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row bg-blue-900 min-h-screen ">
        {isMenuOpen && <Nav />}
        <div className="bg-white flex flex-grow p-4 rounded-lg m-2">
          {children}
        </div>
      </div>
    </div>
  );
}
