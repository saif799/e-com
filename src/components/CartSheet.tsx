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

export default function CartSheet() {
  const { isOpen, Open } = useCartState();
  const { cartProducts, handleClearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={() => Open()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          {/* {cartProducts.map((order) => (
            <div key={order.productId}>{order.productId} </div>
          ))} */}

          <Button onClick={() => handleClearCart()}>Clear</Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
