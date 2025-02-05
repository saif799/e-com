"use client";
import type { formattedProductsType } from "@/app/page";
import ProductCard from "./productCard";
import FilterTool from "./filterTool";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Filter, FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export default function Listings({
  products,
  models,
}: {
  products: formattedProductsType[];
  models: formattedProductsType["shoe_models"][];
}) {
  const [listings, setListings] = useState<formattedProductsType[]>(products);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  //   "models",
  //   parseAsArrayOf(parseAsString),
  // );
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [priceLimit, setPriceLimit] = useState<{
    min: number;
    max: number;
  } | null>(null);

  const sizes: number[] = [];
  products.forEach((p) => {
    p.product_sizes!.forEach((s) => {
      if (!sizes.includes(parseFloat(s.size))) {
        sizes.push(parseFloat(s.size));
      }
    });
  });
  sizes.sort((a, b) => a - b);
  function selectModelFilter(modelsArr: string[]) {
    setSelectedModels(modelsArr);
  }

  const strModels = models.map((m) => m.modelName);

  function selectSizesFilter(sizesArr: number[]) {
    setSelectedSizes(sizesArr);
  }

  function updatePriceLimit(limit: { min: number; max: number }) {
    setPriceLimit(limit);
  }

  useEffect(() => {
    let filtered = products;

    if (selectedModels.length > 0) {
      filtered = filtered.filter((l) =>
        selectedModels.includes(l.shoe_models.modelName),
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((l) =>
        l.product_sizes?.some((s) =>
          selectedSizes.includes(parseFloat(s.size)),
        ),
      );
    }

    if (priceLimit) {
      filtered = filtered.filter(
        (l) =>
          l.products.price >= priceLimit.min &&
          l.products.price <= priceLimit.max,
      );
    }

    setListings(filtered);
  }, [selectedModels, selectedSizes, priceLimit, products]);

  function scrollToListings() {
    const element = document.getElementById("listings");
    if (element) {
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }
  return (
    <div id="listings" className="grid w-full lg:grid-cols-4">
      <div className="hidden flex-col lg:col-span-1 lg:ml-4 lg:mr-14 lg:inline-flex">
        <FilterTool
          models={strModels}
          sizes={sizes}
          selectModelFilter={selectModelFilter}
          selectSizesFilter={selectSizesFilter}
          setPricelimit={updatePriceLimit}
        />
      </div>
      <div className="col-span-3 w-full">
        <div className="flex w-full items-center justify-between px-4">
          <h3 className="w-full text-left text-xl font-medium md:pl-8 lg:pb-4 lg:pl-12">
            Listings ({listings.length})
          </h3>
          <Drawer>
            <DrawerTrigger asChild className="lg:hidden">
              <Button
                onClick={() => scrollToListings()}
                variant="outline"
                className={cn(
                  "",

                  ((selectedModels && selectedModels.length > 0) ||
                    selectedSizes.length > 0 ||
                    priceLimit) &&
                    "font-medium text-purple-900",
                )}
              >
                Filter <FilterIcon className="size-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[90vh]">
              <DrawerHeader>
                <div className="flex w-full items-center justify-between pb-4">
                  <h3 className="w-full text-left text-xl font-medium">
                    Filters
                  </h3>
                  <Filter className="size-6" color="#000" strokeWidth={2} />
                </div>{" "}
              </DrawerHeader>
              <DrawerDescription>
                <FilterTool
                  models={strModels}
                  sizes={sizes}
                  selectModelFilter={selectModelFilter}
                  selectSizesFilter={selectSizesFilter}
                  setPricelimit={updatePriceLimit}
                />
              </DrawerDescription>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 px-3 pb-10 md:grid-cols-3 md:gap-4 lg:gap-4 lg:pr-8">
          {listings.map((p) => (
            <ProductCard
              key={p.products.id}
              href={p.products.id}
              imageUrl={p.products.showCase}
              productTitle={p.products.name}
              brand={"NIKE"}
              price={p.products.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
