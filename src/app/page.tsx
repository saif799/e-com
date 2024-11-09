/* eslint-disable @next/next/no-img-element */
"use client";
import { ProductTestForm } from "@/components/ProductTestForm";
import { useCart } from "@/hooks/useCart";

export default function HomePage() {
  const { cartProducts, handleAddProduct } = useCart();

  return (
    <main>
      <div className="h-screen flex-col items-start justify-center md:items-center lg:flex">
        <div className="hidden h-[40vh] w-full pr-6 md:block md:h-[90vh] md:pr-20">
          <img
            src="/FULL LEBRON JAMES.svg"
            alt="logo"
            className="h-full w-full"
            width={100}
            height={100}
          />
        </div>
        <div className="h-[60vh] w-full pt-6 md:hidden lg:pt-0">
          <img
            src="/shoe.svg"
            alt="logo"
            className="h-full w-full object-contain"
            width={677}
            height={534}
          />
        </div>
      </div>
      <div>
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
      <ProductTestForm />
    </main>
  );
}
