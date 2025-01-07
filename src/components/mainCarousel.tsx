"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

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
                <source
                  srcSet="/Shoe.jpg"
                  media="(min-width: 768px)"
                  className="object-fill"
                />
                <Image
                  width={1200}
                  height={1200}
                  src="/shoe-mobile.jpg"
                  alt=""
                  className="w-full max-w-96 object-fill md:max-h-[75vh] md:max-w-4xl"
                />
              </picture>
            </div>
            <div className="mx-auto w-full md:hidden">
              <p className="py-4 text-center text-sm font-thin">
                Lebron Nxxt Gen
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
