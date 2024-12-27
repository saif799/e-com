import { z } from "zod";

export type customerType = {
  fullName: string;
  phone: string;
  wilaya: string;
  baladia: string;
  livraison: string;
};

export type CartProductType = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  size: number;
};

export type CartOrderType = {
  id: string;
  customerInfo: customerType;
  products: CartProductType[];
  deliveryPrice: number;
  status: string;
  // orderManager: string,
};
const phoneRegex = /^(05|06|07)\d{8}$/;

export const checkoutFormSchema = z.object({
  fullName: z.string({ required_error: "please fill your full Name" }),
  phone: z.string().refine((val) => phoneRegex.test(val), {
    message: "must start with 05, 06, or 07 and contain 10 digits.",
  }),
  wilaya: z.string().min(2, {
    message: "Please select a wilaya.",
  }),
  baladia: z.string().min(2, {
    message: "Please select a baladia.",
  }),
  livraison: z.string(),
});

export type OrderType = {
  id: string;
  customerInfo: z.infer<typeof checkoutFormSchema>;
  productId: string;
  price: number;
  quantity: number;
  status: string;
};
