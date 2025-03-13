/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type ImageSlideProps = {
  productImages: Array<string>;
};

export default function ImageSlide({ productImages }: ImageSlideProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="md:flex md:flex-col md:items-center lg:sticky lg:top-8 lg:flex-row lg:items-start lg:gap-3">
  <ScrollArea className="relative w-[90vw] lg:w-fit lg:h-auto">
    <div className="flex justify-center gap-2 pr-10 pt-6 lg:flex-col lg:pt-0">
      {productImages.map((img, index) => (
        <button
          className={cn(
            "aspect-square w-16 rounded-sm border lg:size-20",
            current === index && "border-[1.5px] border-black lg:border-2",
          )}
          key={index}
          onMouseOver={() => handleThumbnailClick(index)}
        >
          <Image
            width={300}
            height={300}
            src={img}
            alt={`Product thumbnail ${index + 1}`}
            className="h-full w-full rounded-sm object-contain"
          />
        </button>
      ))}
    </div>
    <div className="absolute right-0 bottom-0 h-full w-10 bg-gradient-to-l from-white to-transparent lg:hidden" />
    <ScrollBar orientation="horizontal" className="hidden" />
  </ScrollArea>

  {/* Carousel Section (left, sticky content) */}
  <div className="aspect-square h-fit w-full overflow-hidden md:w-2/3 lg:w-full lg:sticky lg:top-8">
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
            <div className="m-auto flex items-center justify-center rounded-lg p-1 md:w-full">
              <Image
                width={1000}
                height={1000}
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
</div>

  );
}
