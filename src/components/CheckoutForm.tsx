"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { getWilayaNames } from "@/hooks/getWilayas";
import { useState } from "react";
import { CartOrderType } from "@/lib/types";

const phoneRegex = /^(05|06|07)\d{8}$/;

const formSchema = z.object({
  firstName: z.string(),
  familyName: z.string(),
  phone: z.string().refine((val) => phoneRegex.test(val), {
    message: "must start with 05, 06, or 07 and contain 10 digits.",
  }),
  wilaya: z.string().min(2, {
    message: "Please select a wilaya.",
  }),
  baladia: z.string().min(2, {
    message: "Please select a baladia.",
  }),
  city: z.string(),
});

type CheckoutFormProps = {
  productPrice: number;
  productId: string;
  selectedPiece: { size: number; quantity: number } | undefined;
};
export default function CheckoutForm({
  productId,
  selectedPiece,
  productPrice,
}: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const wilayas = getWilayaNames();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      familyName: "",
      phone: "",
      wilaya: "",
      baladia: "",
      city: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const order: CartOrderType = {
      buyerInfo: data,
      deliveryPrice: 1,
      status: "pending",
      products: [{ productId: "", productName: "", price: 3, quantity: 3 }],
    };
    try {
      // const res=
    } catch (err) {}
    return;
  }

  return (
    <Sheet>
      <SheetTrigger
        disabled={!selectedPiece}
        className="w-full rounded-2xl border py-2 text-lg font-semibold md:py-8 md:text-xl"
      >
        {" "}
        Order Now
      </SheetTrigger>

      <SheetContent side="bottom" className="max-h-[90%] overflow-scroll">
        <SheetHeader>
          <SheetTitle className="pb-5">
            <h2>Checkout</h2>
            <p className="text-sm font-normal text-secondary">
              1 item : 24,000 DA
            </p>
          </SheetTitle>

          <SheetDescription>
            <div className="flex gap-2 pb-4">
              <div>
                <Image
                  src="/image 5.svg"
                  alt="checkout product image"
                  width={500}
                  height={500}
                  className="object-fit h-full max-h-24 w-full flex-shrink-0"
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <h3 className="font-medium text-black">
                  Lebron NXXT Gen 20” - Lakers
                </h3>
                <p>ref : 105293</p>
                <p>color : purple</p>
                <p>size : {selectedPiece?.size}</p>
                <p>qty : {quantity}</p>
                <p>{productPrice * quantity} DA</p>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <h2 className="text-start text-black">Delivery Info</h2>
                <div className="flex gap-3">
                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="firstName" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="familyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="FamilyName" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-3">
                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="wilaya"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="wilaya" />
                              </SelectTrigger>
                              <SelectContent>
                                {wilayas.map((w, i) => (
                                  <SelectItem key={w} value={w}>
                                    {i + 1}. {w}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="baladia"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="baladia" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="phone number"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="city"
                            // className="w-full"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="item-center flex justify-around gap-3">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* {cartCounter && (
                      <div className="text-muted-foreground">Quantity </div>
                    )} */}
                    <div className="flex items-center gap-4 text-base">
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity === 1}
                      >
                        -
                      </Button>
                      <span>{quantity}</span>
                      <Button
                        type="button"
                        variant={"outline"}
                        disabled={quantity === selectedPiece?.quantity}
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="flex-1">
                    Confirm Order
                  </Button>
                </div>
              </form>
            </Form>{" "}
            <p className="pt-3 text-start text-black">
              * Delivery time might vary from 3 to 7 days
            </p>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
