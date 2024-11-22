/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { createContext, useContext, useEffect } from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CartOrderType, CartProductType } from "@/lib/types";
import { useState } from "react";

export type CartContextType = {
  cartProducts: CartProductType[];
  cartOrders: CartOrderType[];
  handleAddOrder: (order: CartOrderType) => void;
  handleAddProduct: (product: CartProductType) => void;
  handleClearCart: () => void;
  handleClearOrders: () => void;
  handleProductDecrease: (product: CartProductType) => void;
  handleProductIncrease: (product: CartProductType) => void;
  handleRemoveOrders: (orderId: string) => void;
  handleRemoveProduct: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Record<string, unknown>) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [cartOrders, setCartOrders] = useState<CartOrderType[]>([]);

  useEffect(() => {
    const cartItems: string | null = localStorage.getItem("cart_Products");
    const cartOrders: string | null = localStorage.getItem("orders");
    const cProducts: CartProductType[] = cartItems ? JSON.parse(cartItems) : [];
    const cOrders: CartOrderType[] = cartOrders ? JSON.parse(cartOrders) : [];

    setCartProducts(cProducts);
    setCartOrders(cOrders);
  }, []);

  function handleAddProduct(product: CartProductType) {
    setCartProducts((prev) => {
      const updatedCart = prev ? [...prev, product] : [product];
      localStorage.setItem("cart_Products", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  function handleAddOrder(order: CartOrderType) {
    setCartOrders((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, order];
      } else {
        updatedCart = [order];
      }

      localStorage.setItem("orders", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  function handleRemoveProduct(product: CartProductType) {
    if (cartProducts) {
      const updatedCart = cartProducts.filter(
        (p) => p.productId !== product.productId,
      );
      setCartProducts(updatedCart);
      localStorage.setItem("cart_Products", JSON.stringify(updatedCart));
    }
  }

  function handleRemoveOrders(orderId: string) {
    if (cartOrders) {
      const updatedCart = cartOrders.filter((p) => p.id !== orderId);
      setCartOrders(updatedCart || cartOrders);
      localStorage.setItem("orders", JSON.stringify(updatedCart));
    }
  }

  function handleProductDecrease(product: CartProductType) {
    if (cartProducts && product.quantity > 0) {
      const updatedCart = cartProducts.map((p) =>
        p.productId === product.productId
          ? { ...p, quantity: p.quantity - 1 }
          : p,
      );
      setCartProducts(updatedCart);
      localStorage.setItem("cart_Products", JSON.stringify(updatedCart));
    }
  }

  function handleProductIncrease(product: CartProductType) {
    if (cartProducts) {
      const updatedCart = cartProducts.map((p) =>
        p.productId === product.productId
          ? { ...p, quantity: p.quantity + 1 }
          : p,
      );
      setCartProducts(updatedCart);
      localStorage.setItem("cart_Products", JSON.stringify(updatedCart));
    }
  }

  const handleClearCart = () => {
    setCartProducts([]);
    localStorage.setItem("cart_Products", JSON.stringify(null));
  };

  const handleClearOrders = () => {
    setCartOrders([]);
    localStorage.setItem("orders", JSON.stringify(null));
  };

  const methods: CartContextType = {
    cartProducts,
    cartOrders,
    handleAddOrder,
    handleAddProduct,
    handleClearCart,
    handleClearOrders,
    handleProductDecrease,
    handleProductIncrease,
    handleRemoveOrders,
    handleRemoveProduct,
  };

  return <CartContext.Provider value={methods} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
