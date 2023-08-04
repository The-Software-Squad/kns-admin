import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession()
  
  // Not Logged In

  if(!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center justify-center">
        <div className=" text-center w-full">
          <button className="bg-white p-2 px-4 rounded-lg"
           onClick={() => signIn('google')}>Login with Google</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex flex-grow mt-2 mr-2 mb-2 p-4 rounded-lg">{children}</div>
    </div>
  )
  
}
