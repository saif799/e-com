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
  selectedPiece: { size: number; quantity: number } | null;
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

  const deliveryPrice = 400; // Fixed delivery price
  const totalPrice = selectedPiece
    ? product.price * quantity + deliveryPrice
    : 0;

  async function onSubmit(data: z.infer<typeof checkoutFormSchema>) {
    if (!selectedPiece) return;

    setIsLoading(true);
    try {
      const id = generateId();
      const order: CartOrderType = {
        id,
        customerInfo: data,
        status: "pending",
        deliveryPrice,
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
          deliveryPrice,
        });
        toast.success("Ordered successfully!");
        form.reset(); // Reset form after successful submission
        setQuantity(1); // Reset quantity
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      console.error("Post request failed while creating the order:", err);
      toast.error("Order failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="pb-2 text-center font-medium">Checkout</h2>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <h2 className="text-start text-black">Order Info</h2>

            <div className="grow">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Wilaya" />
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
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Baladia" />
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

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone number" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="City" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-4">
              <p>Quantity:</p>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1 || !selectedPiece}
                >
                  -
                </Button>
                <span>{selectedPiece ? quantity : "0"}</span>
                <Button
                  type="button"
                  variant="outline"
                  disabled={
                    !selectedPiece || quantity >= selectedPiece.quantity
                  }
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <h3 className="pb-3 font-medium">Order Summary</h3>
            {selectedPiece ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-secondary">
                      Size: {selectedPiece.size}
                    </p>
                    <p className="text-sm text-secondary">
                      Quantity: {quantity}
                    </p>
                    <p className="font-medium">
                      {product.price} DA × {quantity}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <p>Delivery</p>
                    <p>{deliveryPrice} DA</p>
                  </div>
                  <div className="my-4 border-t border-black" />
                  <div className="flex justify-between font-medium">
                    <p>Total</p>
                    <p>{totalPrice} DA</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="py-5 text-center font-medium text-red-400">
                Please select a size
              </p>
            )}

            <p className="text-xs text-gray-600">
              * Delivery time might vary from 3 to 7 days
            </p>

            <Button
              type="submit"
              className="w-full py-6 text-sm"
              disabled={!selectedPiece || isLoading}
            >
              {isLoading ? "Processing..." : "Order Now"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
