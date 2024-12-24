"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState, useEffect } from "react";

type ImageSlideProps = {
  productImages: Array<string>;
};

export default function ImageSlide({ productImages }: ImageSlideProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Update current slide index when API is available or changes
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    
    // Set initial slide
    setCurrent(api.selectedScrollSnap());

    // Listen to slide changes
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
      setCurrent(index);
    }
  };

  return (
    <>
      <div className="relative aspect-square w-full overflow-hidden md:w-2/3">
        <Carousel
          setApi={setApi}
          className="w-full md:px-8"
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent>
            {productImages.map((img, index) => (
              <CarouselItem key={index} className="flex-col items-center">
                <div className="m-auto flex items-center justify-center p-1 md:h-[70vh]">
                  <img
                    src={img}
                    alt={`Product image ${index + 1}`}
                    className="w-full aspect-square max-w-96 object-contain md:max-h-[75vh] md:max-w-4xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex justify-center gap-2 rounded-full pt-3">
        {productImages.map((img, index) => (
          <button
            className={cn(
              "size-16 rounded-sm bg-gray-300",
              current === index && "border-[1.5px] border-black"
            )}
            key={index}
            onClick={() => handleThumbnailClick(index)}
          >
            <img 
              src={img} 
              alt={`Product thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-sm"
            />
          </button>
        ))}
      </div>
    </>
  );
}