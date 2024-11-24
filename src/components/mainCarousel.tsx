import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function MainCarousel() {
  return (
    <Carousel
      className="w-full md:px-8"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        loop: true,
        align: "center",
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="flex-col items-center">
            <div className="m-auto flex min-h-[70vh] items-center justify-center p-1 md:h-[70vh]">
              <picture>
                <source srcSet="/Shoe.jpg" media="(min-width: 768px)" className="object-fill" />
                <img
                  src="/shoe-mobile.jpg"
                  alt=""
                  className="object-fill w-full max-w-96 md:max-w-4xl md:max-h-[75vh]"
                />
              </picture>
            </div>
            <div className="md:hidden w-full mx-auto">
              <p className="text-center text-sm font-thin py-4">Lebron Nxxt Gen</p>
            </div>
          </CarouselItem>
        ))}
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
