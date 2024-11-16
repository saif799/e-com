"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/productCard";
import SizeBlock from "@/components/SizeBlock";

const sizeOptions = [
  "EU 38.5",
  "EU 39",
  "EU 40",
  "EU 40.5",
  "EU 41",
  "EU 42",
  "EU 42.5",
  "EU 43",
  "EU 44",
  "EU 44.5",
  "EU 45",
  "EU 45.5",
  "EU 46",
  "EU 47",
  "EU 47.5",
  "EU 48.5",
  "EU 49.5",
];

const colorOptions = [
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
];

const productImages: string[] = [
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
];

export default function Component() {
  const [selectedSize, setSelectedSize] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + productImages.length) % productImages.length,
    );
  };
  const setSlide = (num: number) => {
    setCurrentSlide(num);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     nextSlide();
  //   }, 5000); // Change slide every 5 seconds

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className="flex flex-col items-center gap-8 pt-20 lg:flex-row">
      <div className="w-full lg:w-3/4">
        <div className="px-4">
          <p className="mb-3 font-normal text-zinc-500"> Men &gt; shoes </p>
          <h1 className="mb-3 text-xl font-medium">
            Lebron NXXT Gen 20” - Lakers Purple
          </h1>
          <h2 className="mb-5 text-xl font-semibold text-purple-900">
            25,000 DA
          </h2>
        </div>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {productImages.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Product image ${index + 1}`}
                width={500}
                height={500}
                className="object-fit h-full w-full flex-shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 rounded-full pt-3">
          {productImages.map((img, index) => (
            <button
              className={cn(
                "h-2 w-2 rounded-full bg-gray-300 md:h-3 md:w-3",
                currentSlide === index && "bg-black",
              )}
              key={img}
              onClick={() => setSlide(index)}
            ></button>
          ))}
        </div>
      </div>
      <div className="w-full md:w-10/12">
        <div className="mb-6">
          <h3 className="mb-2 px-2 font-extralight text-gray-500 md:text-xl md:font-normal">
            Available colors
          </h3>
          <div className="grid grid-cols-4 gap-2 md:grid-cols-5 md:gap-4">
            {colorOptions.map((color, index) => (
              <div key={index} className="overflow-hidden">
                <Image
                  src={color}
                  alt={`Color ${index + 1}`}
                  width={200}
                  height={200}
                  className="h-20 w-20 object-cover md:h-36 md:w-36"
                />
                <h3 className="px-1 text-center text-sm font-extralight md:text-lg">
                  Lakers Purple{" "}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="pb-5">
          <div className="flex justify-between px-3 pb-2">
            <h3 className="text-lg font-medium md:text-2xl">Select Size</h3>
            <p className="text-secondary md:text-lg">Size guide</p>
          </div>
          <div className="grid grid-cols-5 justify-items-center gap-1 md:grid-cols-8 md:gap-3">
            {[1, 3, 4, 5, 3, 3, 3, 3, 3, 3, 3, 3].map((s, i) => (
              <SizeBlock key={s + i} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 pb-5">
          <Button className="w-full rounded-2xl py-6 text-lg font-semibold md:py-8 md:text-xl">
            Add to Bag
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-2xl py-6 text-lg font-semibold md:py-8 md:text-xl"
          >
            Order Now
          </Button>
        </div>
        <h3 className="px-3 pb-5 text-lg font-semibold md:text-2xl">
          Similar Products
        </h3>
        <div className="flex gap-3 overflow-scroll pb-3">
          {productImages.map((p, i) => (
            <ProductCard key={p} imageUrl={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
