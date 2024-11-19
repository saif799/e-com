"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type ImageSlideProps = {
  productImages: Array<string>;
};
export default function ImageSlide({ productImages }: ImageSlideProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const setSlide = (num: number) => {
    setCurrentSlide(num);
  };
  return (
    <>
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
            key={index}
            onClick={() => setSlide(index)}
          ></button>
        ))}
      </div>
    </>
  );
}
