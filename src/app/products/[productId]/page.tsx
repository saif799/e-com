import Image from "next/image";
import ProductCard from "@/components/productCard";
import ImageSlide from "@/components/imageSlide";
import { GetProduct } from "@/actions/getProduct";
import { OrderData } from "@/components/OrderData";

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

  if (!product) return;
  const sizes = product
    .map((p) => ({
      size: p.product_sizes!.size,
      quantity: p.product_sizes!.stock,
    }))
    .sort((a, b) => a.size - b.size);

  return (
    <div className="flex flex-col items-center gap-8 pt-20 lg:flex-row">
      <div className="w-full lg:w-3/4">
        <div className="px-4">
          <p className="mb-3 font-normal text-zinc-500"> Men &gt; shoes </p>
          <h1 className="mb-3 text-xl font-medium">
            {product[0]!.products.name}” - Lakers Purple
          </h1>
          <h2 className="mb-5 text-xl font-semibold text-purple-900">
            {product[0]?.products.price} DA
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
        <OrderData
          productId={productId}
          sizes={sizes}
          productPrice={product[0]!.products.price}
        />
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
