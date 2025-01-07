"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type shoeModels } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

type mainCarouselProps = { models: Array<InferSelectModel<typeof shoeModels>> };
export function MainCarousel({ models }: mainCarouselProps) {
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
        {models.map((model) => (
          <CarouselItem key={model.id} className="flex-col items-center">
            <Link
              href={`models/${model.id}`}
              className="m-auto flex min-h-[70vh] items-center justify-center p-1 md:h-[70vh]"
            >
              <picture>
                <source
                  srcSet={model.desktopImage}
                  media="(min-width: 768px)"
                  className="object-fill"
                />
                <Image
                  width={1000}
                  height={1000}
                  src={model.mobileImage}
                  alt=""
                  className="w-full max-w-96 object-fill md:max-h-[75vh] md:max-w-4xl"
                />
              </picture>
            </Link>
            <div className="mx-auto w-full md:hidden">
              <p className="py-4 text-center text-sm font-thin">
                {model.modelName}
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
