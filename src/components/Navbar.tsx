"use client";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useCartState } from "@/hooks/useCartState";
import Image from "next/image";

const Navbar = () => {
  const { Open } = useCartState();
  return (
    <nav className="sticky left-0 right-0 top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold">
                <Image
                  width={1000}
                  height={1000}
                  className="size-8"
                  src="/logo-text-less.svg"
                  alt="Logo"
                />
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

          <Image
            width={1000}
            height={1000}
            className="hidden h-3"
            src="/LEGENWEAR.svg"
            alt="legenwear"
          />

          <div className="flex items-center justify-between">
            {/* <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <Heart className="h-7 w-7" strokeWidth={1.5} />
            </Link> */}

            {/* TODO : ik this is so ass come here later and fix it and make it a button */}
            <Link
              onClick={() => Open()}
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
