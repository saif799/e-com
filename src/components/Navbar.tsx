import Link from "next/link";
import { ShoppingBag, Heart, Hexagon, Search } from "lucide-react";
import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold">
                <Hexagon />
              </span>
            </Link>
          </div>
          <div className="flex items-center relative">
            <Input className="rounded-full pl-10 pr-4 bg-slate-50" type="text" placeholder="Search" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          <div className="flex items-center">
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <Heart />
            </Link>
            <Link
              href="/contact"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ShoppingBag />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
