"use client";

import { useState } from "react";

type Size = {
  id: number;
  name: string;
};

export function ProductTestForm() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    sizes: [] as { sizeId: number; stock: number }[],
  });

  const availableSizes: Size[] = [
    { id: 1, name: "38" },
    { id: 2, name: "39" },
  ];

  const handleSizeChange = (sizeId: number, stock: number) => {
    const existingSize = productData.sizes.find((s) => s.sizeId === sizeId);
    if (existingSize) {
      setProductData({
        ...productData,
        sizes: productData.sizes.map((s) =>
          s.sizeId === sizeId ? { ...s, stock } : s,
        ),
      });
    } else {
      setProductData({
        ...productData,
        sizes: [...productData.sizes, { sizeId, stock }],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");
      setProductData({
        name: "",
        description: "",
        sizes: [],
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          value={productData.name}
          onChange={(e) =>
            setProductData({ ...productData, name: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sizes</label>
        <div className="space-y-2">
          {availableSizes.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <span>{size.name}</span>
              <input
                type="number"
                min="0"
                placeholder="Stock"
                onChange={(e) =>
                  handleSizeChange(size.id, parseInt(e.target.value))
                }
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Add Product
      </button>
    </form>
  );
}
