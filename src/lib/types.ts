
export type customerType = {
    id: string,
    username: string,
    phone: string,
    wilaya: string,
    baladia: string,
    city: string,
    destination: "HOME" | "OFFICE",
}

export type CartProductType = {
    productId: string,
    productName: string,
    price: number,
    quantity: number,
  
}

export type CartOrderType = {
    id: string,
    buyerInfo: customerType,
    products: CartProductType[],
    totalAmount: number,
    deliveryPrice: number,
    status: string,
    // orderManager: string,
}
