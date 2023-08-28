import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
 
  const inactiveLink = "flex gap-2 p-1"  
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-l-lg"
  const router = useRouter()
  const {pathname} = router 
  return (
    <aside className="text-white p-4 pr-0">
      <Link href={"/"} className="flex gap-2 mb-5 mr-4">
        <span className="material-symbols-rounded">potted_plant</span>
        <span>KNS Admin</span>
      </Link>
      <nav className="flex flex-col gap-3">
        {/* Dashboard */}
        <Link href={"/"} className={pathname === '/' ? activeLink : inactiveLink}>
          <span className="material-symbols-rounded">dashboard</span>
          Dashboard
        </Link>

        {/* Products */}
        <Link href={"/products"} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <span className="material-symbols-rounded">inventory_2</span>
          Products
        </Link>

        {/* Orders */}
        <Link href={"/orders"} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <span className="material-symbols-rounded">list_alt</span>
          Orders
        </Link>

        {/* Settings */}
        <Link href={"/settings"} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <span className="material-symbols-rounded">settings</span>
          Settings
        </Link>
      </nav>
    </aside>
  );
}
