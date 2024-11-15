"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="flex max-w-6xl flex-col items-center gap-8 pt-20 md:flex-row">
      <div className="w-full md:w-2/3">
        {/* <div className="flex max-h-[600px] space-x-2 overflow-x-auto pb-2 md:flex-col">
          {productImages.map((img, index) => (
            <button
              key={index}
              className={cn(
                "h-20 w-20 flex-shrink-0 border-2",
                currentSlide === index ? "border-black" : "border-transparent",
              )}
              onClick={() => setCurrentSlide(index)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </button>
          ))}
        </div> */}
        <div className="px-4">
          <p className="mb-3 font-normal text-zinc-500"> Men  &gt;  shoes </p>
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

          {/* if u wants the buttons on the screen */}
          {/* <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </div> */}
        </div>
        <div className="flex justify-center gap-2 rounded-full pt-3">
          {productImages.map((img, index) => (
            <button
              className={cn(
                "h-2 w-2 rounded-full bg-gray-300",
                currentSlide === index && "bg-black",
              )}
              key={img}
              onClick={() => setSlide(index)}
            ></button>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <div className="mb-6">
          <h3 className="mb-2 px-2 font-extralight text-gray-500">
            Available colors
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color, index) => (
              <div key={index} className="mx-auto overflow-hidden">
                <Image
                  src={color}
                  alt={`Color ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover"
                />
                <h3 className="px-1 text-center text-sm font-extralight">
                  Lakers Purple{" "}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">Sélectionner la taille</h3>
          <div className="grid grid-cols-3 gap-2">
            {sizeOptions.map((size) => (
              <Button
                key={size}
                variant="outline"
                className={cn(
                  "w-full",
                  selectedSize === size &&
                    "bg-black text-white hover:bg-black hover:text-white",
                )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
        <Button className="w-full bg-black text-white hover:bg-gray-800">
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}
