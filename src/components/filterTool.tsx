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
import { type ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Filter } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterTool({
  models,
  sizes,
}: {
  models: string[];
  sizes: number[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get filters from URL
  const modelParam = searchParams.get("models")?.split(",") ?? [];
  const sizeParam =
    searchParams
      .get("sizes")
      ?.split(",")
      .map((size) => parseFloat(size)) ?? [];
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  function createQueryString(name: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  }

  function selectModelFilterS(newModel: string) {
    const Check = modelParam.includes(newModel)
      ? modelParam.filter((m) => m !== newModel)
      : [...modelParam, newModel];

    const newValue = Check.length > 0 ? Check.join(",") : "";

    router.push(`${pathname}?${createQueryString("models", newValue)}`, {
      // Use encodeURIComponent here
      scroll: false,
    });
  }

  function selectSizesFilterS(size: number) {
    const Check = sizeParam.includes(size)
      ? sizeParam.filter((m) => m !== size)
      : [...sizeParam, size];

    const newValue = Check.length > 0 ? Check.join(",") : "";

    router.push(`${pathname}?${createQueryString("sizes", newValue)}`, {
      scroll: false,
    });
  }

  function updatePrice(name: string, value: number) {
    router.push(`${pathname}?${createQueryString(name, value.toString())}`, {
      scroll: false,
    });
  }

  function minPriceCtrl(e: ChangeEvent<HTMLInputElement>) {
    const numValue = parseFloat(e.target.value);
    updatePrice("minPrice", !isNaN(numValue) ? numValue : 0);
  }

  function maxPriceCtrl(e: ChangeEvent<HTMLInputElement>) {
    const numValue = parseFloat(e.target.value);
    updatePrice("maxPrice", !isNaN(numValue) ? numValue : Infinity);
  }

  return (
    <div className="px-5 lg:px-0 lg:sticky lg:top-[73px]">
      <div className="hidden w-full items-center justify-between pb-4 lg:flex">
        <h3 className="w-full text-left text-xl font-medium">Filters</h3>
        <Filter className="size-6" color={(modelParam.length > 0 || sizeParam.length > 0 || minPrice || maxPrice) ? "#581c87" :"#aaa"} strokeWidth={2} />
      </div>

      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="model">
          <AccordionTrigger
            className={cn(
              "pl-2 text-lg font-light text-black [&[data-state=open]>]:font-medium",
              modelParam.length > 0 ? "font-medium text-purple-900" : "",
            )}
          >
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
                    checked={modelParam.includes(m)}
                    onCheckedChange={() => selectModelFilterS(m)}
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
          <AccordionTrigger
            className={cn(
              "pl-2 text-lg font-light text-black [&[data-state=open]>]:font-medium",
              sizeParam.length > 0 ? "font-medium text-purple-900" : "",
            )}
          >
            <p>Size</p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-wrap items-center gap-2">
            {sizes.map((s) => (
              <SizeButton
                key={s}
                disabled={false}
                selectHandler={() => selectSizesFilterS(s)}
                size={s}
                isSelected={sizeParam.includes(s)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger
            className={cn(
              "pl-2 text-lg font-light text-black [&[data-state=open]>]:font-medium",
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
                  value={minPrice ? parseFloat(minPrice) : undefined}
                  id="minprice"
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
                  value={maxPrice ? parseFloat(maxPrice) : undefined}
                  id="maxprice"
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
