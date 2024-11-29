"use client";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import SizeBlock from "./SizeBlock";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";

type sizesType = { size: number; quantity: number };

export type OrderProductType = {
  id: string;
  name: string;
  price: number;
  sizes: sizesType[];
  image: string;
};
type OrderDataProps = {
  Product: OrderProductType;
};
export function OrderData({ Product }: OrderDataProps) {
  const [selectedPiece, setSelectedPiece] = useState<sizesType>();
  const { handleAddProduct } = useCart();

  function selectPiece(piece: sizesType) {
    setSelectedPiece(piece);
  }
  return (
    <>
      <div className="pb-5">
        <div className="flex justify-between px-3 pb-2">
          <h3 className="text-lg font-medium md:text-2xl">Select Size</h3>
          <p className="text-secondary md:text-lg">Size guide</p>
        </div>
        <div className="grid grid-cols-5 justify-items-center gap-1 px-2 md:grid-cols-8 md:gap-3">
          {Product.sizes.map((s) => (
            <SizeBlock
              selectPiece={selectPiece}
              key={s.size}
              piece={s}
              isSelected={s.size === selectedPiece?.size}
              disabled={s.quantity === 0}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 px-5 pb-5">
        <Button
          onClick={() =>
            handleAddProduct({
              productId: Product.id,
              image: Product.image,
              price: Product.price,
              productName: Product.name,
              quantity: 1,
            })
          }
          className="w-full rounded-2xl py-6 text-lg font-semibold md:py-8 md:text-xl"
        >
          Add to Bag
        </Button>

        {selectedPiece ? (
          <CheckoutForm selectedPiece={selectedPiece} product={Product} />
        ) : (
          <Button
            variant={"outline"}
            className="w-full rounded-2xl border py-5 text-lg font-semibold md:py-8 md:text-xl"
          >
            Order now{" "}
          </Button>
        )}
      </div>
    </>
  );
}
