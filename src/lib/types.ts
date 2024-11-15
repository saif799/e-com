
export type customerType = {
    id?: string,
    username: string,
    phone: string,
    wilaya: string,
    baladia: string,
    destination: "HOME" | "OFFICE",
}

export type CartProductType = {
    productId: string,
    productName: string,
    price: number,
    quantity: number,
  
}

export type CartOrderType = {
    id?: string,
    buyerInfo: customerType,
    products: CartProductType[],
    deliveryPrice: number,
    status: string,
    // orderManager: string,
}
