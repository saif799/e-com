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
    <div className="md:flex md:flex-col md:items-center lg:flex-row-reverse lg:items-start lg:gap-3 lg:sticky lg:top-8">
  <div className="aspect-square w-full overflow-hidden md:w-2/3 lg:w-full h-fit">
    <Carousel
      setApi={setApi}
      className="w-full md:px-8 lg:px-0"
      opts={{
        loop: true,
        align: "center",
      }}
    >
      <CarouselContent>
        {productImages.map((img, index) => (
          <CarouselItem key={index} className="flex-col items-center">
            <div className="m-auto flex items-center justify-center p-1 md:w-full rounded-lg">
              <img
                src={img}
                alt={`Product image ${index + 1}`}
                className="aspect-square w-full object-contain md:max-h-[75vh] md:max-w-4xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </div>
  <div className="flex justify-center gap-2 rounded-full pt-6 lg:flex-col">
    {productImages.map((img, index) => (
      <button
        className={cn(
          "size-16 rounded-sm lg:size-20 border",
          current === index && "border-[1.5px] lg:border-2 border-black",
        )}
        key={index}
        onMouseOver={() => handleThumbnailClick(index)}
      >
        <img
          src={img}
          alt={`Product thumbnail ${index + 1}`}
          className="h-full w-full rounded-sm object-contain"
        />
      </button>
    ))}
  </div>
</div>

  );
}
