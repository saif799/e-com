import Link from "next/link";
import { ShoppingBag, Heart, Hexagon, Search } from "lucide-react";
import { Input } from "./ui/input";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold">
                <Hexagon className="h-7 w-7" strokeWidth={1.5} />
              </span>
            </Link>
          </div>
          {/* <div className="relative flex items-center">
            <Input
              className="rounded-full bg-slate-50 pl-10 pr-4"
              type="text"
              placeholder="Search"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          </div> */}

          <div className="flex items-center justify-between">
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <Heart className="h-7 w-7" strokeWidth={1.5} />
            </Link>
            <Link
              href="/contact"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
            </Link>
            {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
