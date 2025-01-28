/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import SizeBlock from "./SizeBlock";

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
  const [selectedPiece, setSelectedPiece] = useState<sizesType | null>(null);
  useEffect(() => {
    const fbq = window.fbq || null;
    if (fbq) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      fbq("track", "ViewContent", {
        content_name: Product.name,
        content_ids: [Product.id], // Product ID
        content_type: "product", // Type of content (product in this case)
        value: Product.price, // Price of the product
        currency: "DZD", // Use DZD (Algerian Dinar) as the currency
      });
    }
  }, [Product]);

  function selectPiece(piece: sizesType) {
    if (selectedPiece && selectedPiece.size === piece.size)
      setSelectedPiece(null);
    else setSelectedPiece(piece);
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between pt-5">
          <h3 className="text-md font-medium md:text-xl">Select Size</h3>
          <p className="md:text-md text-sm text-secondary">Size guide</p>
        </div>
        <div className="grid grid-cols-5 justify-items-center gap-1 py-5 md:grid-cols-8 md:gap-3">
          {Product.sizes.map((s) => (
            <SizeBlock
              selectPiece={selectPiece}
              key={s.size}
              piece={s}
              isSelected={s.size === selectedPiece?.size}
              disabled={s.quantity === 0}
            />
          )) ?? <p>stock is out</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-5">
        {/* {selectedPiece ? (
          <CheckoutForm selectedPiece={selectedPiece} product={Product} />
        ) : null} */}
        {/* <Button
            disabled={!selectedPiece}
            className="w-full rounded-md py-6 text-md font-medium md:py-8 md:text-xl"
            onClick={() => setIsOpen(true)}
          >
            Order now
          </Button> */}
        <CheckoutForm selectedPiece={selectedPiece} product={Product} />
        {/* <Button
          variant="outline"
          onClick={() => {
            if (selectedPiece) {
              handleAddProduct({
                productId: Product.id,
                image: Product.image,
                price: Product.price,
                productName: Product.name,
                quantity: 1,
                size: selectedPiece.size,
              });

              toast.success("Product added successfully");
            } else toast.error("Please select a size");
          }}
          className="text-md w-full rounded-md py-6 font-medium md:text-lg"
        >
          Add to Cart
        </Button> */}
      </div>
    </>
  );
}
