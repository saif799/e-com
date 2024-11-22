"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useCartState } from "@/lib/useCarte";

export default function CartSheet() {
  const { isOpen, Open } = useCartState();
  const { cartOrders } = useCart();
  console.log(cartOrders);

  return (
    <Sheet open={isOpen} onOpenChange={() => Open()}>
      <SheetTrigger onClick={() => open()}>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          {cartOrders.map((order) => (
            <div key={order.id}>{order.id} </div>
          ))}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
