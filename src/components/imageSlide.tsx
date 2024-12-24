/* eslint-disable @next/next/no-img-element */
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
    <div className="flex w-full flex-col items-center justify-start">
      {/* <div className="flex aspect-square w-full items-center justify-start overflow-hidden md:w-3/4"> */}
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
          align: "center",
        }}
      >
        <CarouselContent>
          {productImages.map((img, index) => (
            <CarouselItem key={index} className="flex-col items-center pl-0">
              <div className="flex items-center justify-start md:h-[70vh]">
                <img
                  src={img}
                  alt={`Product image ${index + 1}`}
                  className="aspect-square w-full max-w-96 object-contain md:max-w-4xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* </div> */}
      <div className="flex justify-center gap-2 rounded-full pt-3">
        {productImages.map((img, index) => (
          <button
            className={cn(
              "size-16 rounded-sm lg:size-32",
              current === index && "border-[1.5px] border-black",
            )}
            key={index}
            onClick={() => handleThumbnailClick(index)}
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
