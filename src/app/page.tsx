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
        <MainCarousel />
        <Button
          variant={"ghost"}
          className="text-md mx-auto px-8 py-6 font-light transition ease-in hover:bg-white hover:drop-shadow-[0_0px_45px_rgba(0,0,0,0.16)]"
        >
          View Product
        </Button>
        <h3 className="w-full pl-6 md:pl-8 lg:pl-12 text-left text-xl font-medium">Listings</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-4 w-full px-3 lg:px-8 pb-10">
          <ProductCard
            imageUrl="/Shoe.jpg"
            productTitle="Lebron NXXT Gen"
            brand="NIKE"
            category="Men's Shoes"
            price="25,000 DA"
          />
          <ProductCard
            imageUrl="/Shoe.jpg"
            productTitle="Lebron NXXT Gen"
            brand="NIKE"
            category="Men's Shoes"
            price="25,000 DA"
          />
          <ProductCard
            imageUrl="/Shoe.jpg"
            productTitle="Lebron NXXT Gen"
            brand="NIKE"
            category="Men's Shoes"
            price="25,000 DA"
          />
          <ProductCard
            imageUrl="/Shoe.jpg"
            productTitle="Lebron NXXT Gen"
            brand="NIKE"
            category="Men's Shoes"
            price="25,000 DA"
          />
          <ProductCard
            imageUrl="/Shoe.jpg"
            productTitle="Lebron NXXT Gen"
            brand="NIKE"
            category="Men's Shoes"
            price="25,000 DA"
          />
          <ProductCard
            imageUrl="/Shoe.jpg"
            productTitle="Lebron NXXT Gen"
            brand="NIKE"
            category="Men's Shoes"
            price="25,000 DA"
          />
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
