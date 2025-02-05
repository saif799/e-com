"use client";
import type { formattedProductsType } from "@/app/page";
import ProductCard from "./productCard";
import FilterTool from "./filterTool";
import { useEffect, useState } from "react";

export default function Listings({
  products,
  models,
}: {
  products: formattedProductsType[];
  models: formattedProductsType["shoe_models"][];
}) {
  // This state holds the currently displayed products after filtering.
  const [listings, setListings] = useState<formattedProductsType[]>(products);
  // Store selected filter values in separate state variables.
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [priceLimit, setPriceLimit] = useState<{ min: number; max: number } | null>(
    null
  );

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
        selectedModels.includes(l.shoe_models.modelName)
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((l) =>
        l.product_sizes?.some((s) =>
          selectedSizes.includes(parseFloat(s.size))
        )
      );
    }

    if (priceLimit) {
      filtered = filtered.filter(
        (l) =>
          l.products.price >= priceLimit.min &&
          l.products.price <= priceLimit.max
      );
    }

    setListings(filtered);
  }, [selectedModels, selectedSizes, priceLimit, products]);

  return (
    <div className="grid w-full lg:grid-cols-4">
      <FilterTool
        models={strModels}
        sizes={sizes}
        selectModelFilter={selectModelFilter}
        selectSizesFilter={selectSizesFilter}
        setPricelimit={updatePriceLimit}
      />
      <div className="w-full col-span-3">
        <h3 className="w-full pl-6 text-left text-xl font-medium md:pl-8 lg:pl-12 lg:pb-4">
          Listings ({listings.length})
        </h3>
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
