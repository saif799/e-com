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
import { type CartOrderType, checkoutFormSchema } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { generateId } from "@/lib/generateId";
import toast from "react-hot-toast";
import type { OrderProductType } from "./OrderData";
import { addOrderAction } from "@/actions/addOrderAction";

type CheckoutFormProps = {
  product: OrderProductType;
  selectedPiece: { size: number; quantity: number };
};
export default function CheckoutForm({
  selectedPiece,
  product,
}: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { handleAddOrder } = useCart();
  const wilayas = getWilayaNames();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      wilaya: "",
      baladia: "",
      city: "",
    },
  });

  const { watch } = form;

  async function onSubmit(data: z.infer<typeof checkoutFormSchema>) {
    setIsLoading(true);
    const id = generateId();

    const order: CartOrderType = {
      id,
      customerInfo: data,

      status: "pending",
      deliveryPrice: 2,
      products: [
        {
          image: product.image,
          price: product.price,
          productId: product.id,
          productName: product.name,
          quantity,
          size: selectedPiece.size,
        },
      ],

    };
   

    const { success } = await addOrderAction(order);
    // TODO : try and improve this piece of crap and think more about the ordercarte price (its no longer a piece of crap but still needs improvments)
    if (success) {
      handleAddOrder({
        id,
        customerInfo: data,
        products: [
          {
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity,
            image: product.image,
            size: selectedPiece.size,
          },
        ],
        status: "pending",
        deliveryPrice: 0,
      });
      toast.success("Ordered successfully!");
    } else {
      toast.error("order Failed");
    }
    try {
    } catch (err) {
      console.log("post request failed while creating the order :", err);
      toast.error("order Failed");
    }
  }

  return (
    <SheetContent side="bottom" className="max-h-[90%] overflow-scroll">
      <SheetHeader>
        <SheetTitle className="pb-5">
          <h2>Checkout</h2>
          <p className="text-sm font-normal text-secondary">
            1 item : 24,000 DA
          </p>
        </SheetTitle>
        <div className="flex gap-2 pb-3">
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
            <h3 className="text-md font-medium text-black">
              Lebron NXXT Gen 20” - Lakers
            </h3>
            {/* <p className="text-sm text-secondary">ref : 105293</p> */}
            {/* <p className="text-sm text-secondary">color : purple</p> */}
            {/* <div className="flex w-full justify-around"> */}
            <p className="text-sm text-secondary">
              size : {selectedPiece.size}
            </p>
            <p className="text-sm text-secondary">qty : {quantity}</p>
            {/* </div> */}

            <p className="text-sm text-secondary text-yellow-600">
              price: {product.price * quantity} DA
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <h2 className="text-start text-black">Delivery Info</h2>
            <div className="flex gap-3">
              <div className="grow">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="full Name" {...field} />
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
                            {wilayas.map((w) => (
                              <SelectItem key={w.wilayaId} value={w.wilayaName}>
                                {w.wilayaId}. {w.wilayaName}
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
                            {wilayas
                              .find((w) => w.wilayaName === watch("wilaya"))
                              ?.communes.map((c) => (
                                <SelectItem key={c.name} value={c.name}>
                                  {c.name}
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
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="phone number" type="tel" {...field} />
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
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span>{quantity === 0 ? "0" : quantity}</span>
                  <Button
                    type="button"
                    variant={"outline"}
                    disabled={
                      selectedPiece && quantity >= selectedPiece.quantity
                    }
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
      </SheetHeader>
    </SheetContent>
  );
}
