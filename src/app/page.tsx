/* eslint-disable @next/next/no-img-element */
"use client";
import { MainCarousel } from "@/components/mainCarousel";
import ProductCard from "@/components/productCard";
import { ProductTestForm } from "@/components/ProductTestForm";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
export default function HomePage() {
  const { cartProducts, handleAddProduct } = useCart();

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="h-[70vh]">
          <MainCarousel />
        </div>
        <Button variant={"ghost"} className="mx-auto px-8 font-light text-md py-6 hover:drop-shadow-[0_0px_45px_rgba(0,0,0,0.16)] transition ease-in hover:bg-white">
          View Product
        </Button>
        <h3 className="text-left w-full pl-16 font-medium text-xl ">Listings</h3>
        <div className="flex w-full px-8 gap-8">
          <ProductCard imageUrl="/Shoe.jpg"/>
          <ProductCard imageUrl="/Shoe.jpg"/>
          <ProductCard imageUrl="/Shoe.jpg"/>
          <ProductCard imageUrl="/Shoe.jpg"/>
        </div>
      </div>

      {/* <div>
        {cartProducts.map((e) => (
          <div key={e.productId}> {e.productName}</div>
        ))}
      </div>
      <button
        onClick={() =>
          handleAddProduct({
            price: 23,
            productId: "3sjdfldgjdlsjsdlfs",
            productName: "yep this is working",
            quantity: 3,
          })
        }
      >
        {" "}
        add into carte here{" "}
      </button>
      <ProductTestForm /> */}
    </main>
  );
}
