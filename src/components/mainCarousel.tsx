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
          <CarouselItem key={index}>
            <div className="m-auto flex h-[78vh] items-center justify-center p-1 md:h-[70vh]">
              <picture>
                <source srcSet="/shoe.jpg" media="(min-width: 768px)" />
                <img
                  src="/shoe-mobile.jpg"
                  alt=""
                  className="m-auto object-fill"
                />
              </picture>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
