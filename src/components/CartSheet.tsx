"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useCartState } from "@/hooks/useCartState";
import { Button } from "./ui/button";
// import { Card } from "./ui/card";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { DM_Mono } from "next/font/google";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
export default function CartSheet() {
  const { isOpen, Open } = useCartState();
  const { cartProducts, handleClearCart } = useCart();

  return (
    <Sheet open={isOpen} suonOpenChange={Open}>
      <SheetContent className={`${dmMono.className} p-2`}>
        <SheetHeader>
          <SheetTitle className="text-center">
            {/* TODO make sure u handle every state in here */}
            <p className="text-md pr-2 pt-1 font-medium">
              {" "}
              {cartProducts
                ? cartProducts.length + " Products"
                : "Your cart is empty"}
            </p>
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-[88vh] flex-col justify-between pb-3 pt-6">
          <div>
            {/* TODO:UI work on the UI of this card  */}
            {cartProducts?.map((product) => (
              <div className="flex gap-2 pb-4" key={product.productId}>
                <div>
                  <Image
                    src="/image 5.svg"
                    alt="checkout product image"
                    width={500}
                    height={500}
                    className="object-fit h-full max-h-32 w-full flex-shrink-0"
                  />
                </div>
                <div className="">
                  <div className="flex justify-between gap-1">
                    <h3 className="text-sm font-medium text-black">
                      Lebron NXXT Gen 20” - Lakers
                    </h3>
                    <p className="basis-32 text-sm text-secondary">2400 DA</p>
                  </div>
                  <div className="flex items-center justify-around">
                    <p className="text-sm text-secondary">size : 3</p>
                    <p className="text-sm text-secondary">qty : 3</p>
                    <Button variant="ghost" className="p-0">
                      <Trash2 className="h-10 w-10" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            disabled={cartProducts && cartProducts.length == 0}
            variant="outline"
            className="w-full"
            onClick={() => handleClearCart()}
          >
            Clear
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
