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
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
];

const productImages: string[] = [
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
  "/Group 2.jpg",
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

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 p-4 md:flex-row">
      <div className="flex w-full md:w-2/3 items-center gap-10" >
        <div className="flex flex-col space-x-2 overflow-x-auto pb-2 max-h-[600px]">
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
        </div>
        <div className="relative mb-4 h-[600px] w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {productImages.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Product image ${index + 1}`}
                width={600}
                height={600}
                className="h-full w-full flex-shrink-0 object-cover"
              />
            ))}
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
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
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <div className="mb-4 flex items-center">
          <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
          <span className="ml-2 text-sm">Bien noté</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold">Nike Air Max Dn</h2>
        <p className="mb-4 text-gray-600">Chaussure</p>
        <p className="mb-6 text-2xl font-bold">169,99 €</p>
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">Couleurs</h3>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className="h-12 w-12 overflow-hidden rounded-md border"
              >
                <Image
                  src={color}
                  alt={`Color ${index + 1}`}
                  width={48}
                  height={48}
                  className="object-cover"
                />
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
