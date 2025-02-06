/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import SizeButton from "./SizeButton";
import { useState, useEffect, type ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Filter } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

export default function FilterTool({
  models,
  sizes,
  selectModelFilter,
  selectSizesFilter,
  setPricelimit,
}: {
  models: string[];
  sizes: number[];
  selectModelFilter: (models: string[]) => void;
  selectSizesFilter: (sizes: number[]) => void;
  setPricelimit: (priceLimit: { min: number; max: number }) => void;
}) {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  // Ensure filter callbacks receive updated state
  useEffect(() => {
    selectModelFilter(selectedModels);
    console.log(selectedModels);
  }, [selectedModels, selectModelFilter]);

  useEffect(() => {
    selectSizesFilter(selectedSizes);
    console.log(selectedSizes);
  }, [selectedSizes, selectSizesFilter]);

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model],
    );
  };

  function handleSelectSize(size: number) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  }

  function minPriceCtrl(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setMinPrice(undefined);
      setPricelimit({ min: 0, max: maxPrice ? maxPrice : Infinity });
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setMinPrice(numValue);
      setPricelimit({ min: numValue, max: maxPrice ? maxPrice : Infinity });
    }
    console.log({ minPrice, maxPrice });
  }

  function maxPriceCtrl(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setMaxPrice(undefined);
      setPricelimit({ min: minPrice ? minPrice : 0, max: Infinity });
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setMaxPrice(numValue);
      setPricelimit({ min: minPrice ? minPrice : 0, max: numValue });
    }

    console.log({ minPrice, maxPrice });
  }

  return (
    <div className="px-5 lg:px-0">
      <div className="hidden w-full items-center justify-between pb-4 lg:flex">
        <h3 className="w-full text-left text-xl font-medium">Filters</h3>
        <Filter className="size-6" color="#aaa" strokeWidth={2} />
      </div>

      <Accordion type="single" className="w-full">
        <AccordionItem value="model">
          <AccordionTrigger className={cn(
              "text-lg font-light text-black [&[data-state=open]>]:font-medium",
              selectedModels.length>0 ? "font-medium text-purple-900" : "",
            )}>
            <p>Model</p>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ScrollArea className="relative h-[50vh] w-full pr-3 lg:h-full">
              {models.map((m) => (
                <div
                  key={m}
                  className="flex cursor-pointer items-center space-x-2 pl-3 hover:font-medium"
                >
                  <Checkbox
                    id={m}
                    checked={selectedModels.includes(m)}
                    onCheckedChange={() => handleModelChange(m)}
                  />
                  <label htmlFor={m} className="text-base">
                    {m}
                  </label>
                </div>
              ))}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="size">
          <AccordionTrigger className={cn(
              "text-lg font-light text-black [&[data-state=open]>]:font-medium",
              selectedSizes.length>0 ? "font-medium text-purple-900" : "",
            )}>
            <p>Size</p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-wrap items-center gap-2">
            {sizes.map((s) => (
              <SizeButton
                key={s}
                disabled={false}
                selectHandler={() => handleSelectSize(s)}
                size={s}
                isSelected={selectedSizes.includes(s)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger
            className={cn(
              "text-lg font-light text-black [&[data-state=open]>]:font-medium",
              minPrice || maxPrice ? "font-medium text-purple-900" : "",
            )}
            value={"open"}
          >
            <p>Price</p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-wrap items-center gap-2">
            <div className="flex flex-row items-center gap-4 px-1 py-1">
              <div className="w-full flex-grow">
                <Input
                  id="minprice"
                  value={minPrice ?? ""}
                  name="minprice"
                  type="number"
                  className="h-12 w-full rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="min DA"
                  onChange={minPriceCtrl}
                  min="0"
                />
              </div>
              <div className="my-0 w-5 border-t-[3px] border-black"></div>
              <div className="w-full flex-grow">
                <Input
                  id="maxprice"
                  value={maxPrice ?? ""}
                  name="maxprice"
                  type="number"
                  className="h-12 w-full rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="max DA"
                  onChange={maxPriceCtrl}
                  min="0"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
