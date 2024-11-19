import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/productCard";
import SizeBlock from "@/components/SizeBlock";
import DirectOrderForm from "@/components/DirectOrderForm";
import ImageSlide from "@/components/imageSlide";
import { GetProduct } from "@/actions/getProduct";

const sizeOptions = [
  "EU 38.5",
  "EU 39",
  "EU 40",
  "EU 40.5",
  "EU 41",
  "EU 42",
  "EU 42.5",
  "EU 43",
  "EU 44",
  "EU 44.5",
  "EU 45",
  "EU 45.5",
  "EU 46",
  "EU 47",
  "EU 47.5",
  "EU 48.5",
  "EU 49.5",
];

const colorOptions = [
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
];

const productImages: string[] = [
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
  "/image 5.svg",
];

type Props = { params: { productId: string } };
export default async function Component({ params: { productId } }: Props) {
  const product = await GetProduct(productId);
  console.log(product);

  return (
    <div className="flex flex-col items-center gap-8 pt-20 lg:flex-row">
      <div className="w-full lg:w-3/4">
        <div className="px-4">
          <p className="mb-3 font-normal text-zinc-500"> Men &gt; shoes </p>
          <h1 className="mb-3 text-xl font-medium">
            {product?.products.name}” - Lakers Purple
          </h1>
          <h2 className="mb-5 text-xl font-semibold text-purple-900">
            {product?.products.price} DA
          </h2>
        </div>
        <ImageSlide productImages={productImages} />
      </div>
      <div className="w-full md:w-10/12">
        <div className="mb-6">
          <h3 className="mb-2 px-2 font-extralight text-gray-500 md:text-xl md:font-normal">
            Available colors
          </h3>
          <div className="grid grid-cols-4 gap-2 md:grid-cols-5 md:gap-4">
            {colorOptions.map((color, index) => (
              <div key={index} className="overflow-hidden">
                <Image
                  src={color}
                  alt={`Color ${index + 1}`}
                  width={200}
                  height={200}
                  className="h-20 w-20 object-cover md:h-36 md:w-36"
                />
                <h3 className="px-1 text-center text-sm font-extralight md:text-lg">
                  Lakers Purple{" "}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <OrderData />
        <h3 className="px-3 pb-5 text-lg font-semibold md:text-2xl">
          Similar Products
        </h3>
        <div className="flex gap-3 overflow-scroll pb-3">
          {productImages.map((p, i) => (
            <ProductCard key={i} imageUrl={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderData() {
  return (
    <>
      <div className="pb-5">
        <div className="flex justify-between px-3 pb-2">
          <h3 className="text-lg font-medium md:text-2xl">Select Size</h3>
          <p className="text-secondary md:text-lg">Size guide</p>
        </div>
        <div className="grid grid-cols-5 justify-items-center gap-1 px-2 md:grid-cols-8 md:gap-3">
          {[1, 3, 4, 5, 3, 3, 3, 3, 3, 3, 3, 3].map((s, i) => (
            <SizeBlock key={s + i} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 px-5 pb-5">
        <Button className="w-full rounded-2xl py-6 text-lg font-semibold md:py-8 md:text-xl">
          Add to Bag
        </Button>
        {/* <Button
            variant="outline"
            className="w-full rounded-2xl py-6 text-lg font-semibold md:py-8 md:text-xl"
          >
            Order Now
          </Button> */}
        <DirectOrderForm />
      </div>
    </>
  );
}
