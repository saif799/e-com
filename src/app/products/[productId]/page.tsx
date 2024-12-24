import Image from "next/image";
import ProductCard from "@/components/productCard";
import ImageSlide from "@/components/imageSlide";
import { GetProduct, GetSimilarProducts } from "@/actions/getProduct";
import { OrderData, type OrderProductType } from "@/components/OrderData";

const colorOptions = [
  "/Shoe.jpg",
  "/Shoe.jpg",
  "/Shoe.jpg",
  "/Shoe.jpg",
  "/Shoe.jpg",
];

const productImages: string[] = [
  "/Shoe.jpg",
  "/Shoe.jpg",
  "/Shoe.jpg",
  "/Shoe.jpg",
  "/Shoe.jpg",
];

type Props = { params: { productId: string } };
export default async function Component({ params: { productId } }: Props) {
  const products = await GetProduct(productId);

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (!products || !products[0]?.products) return;
  const similarProducts = await GetSimilarProducts(
    products[0].products.categoryId,
    productId,
  );

  const product: OrderProductType = {
    id: productId,
    name: products[0].products.name,
    price: products[0].products.price,
    image: products[0].products.showcaseImage,
    sizes: products
      .map((p) => ({
        size: p.product_sizes!.size,
        quantity: p.product_sizes!.stock,
      }))
      .sort((a, b) => a.size - b.size),
  };

  return (
    <div className="flex flex-col items-center gap-8 pt-5 lg:flex-row lg:items-start lg:justify-center lg:gap-0 lg:px-28">
      {/* <div className="w-full lg:w-3/4 xl:w-2/3"> */}
      <div className="w-fit px-4">
        <p className="mb-3 font-normal text-zinc-500"> Men &gt; shoes </p>
        <h1 className="mb-3 text-lg font-medium lg:text-xl">
          {products[0].products.name}
        </h1>
        <h2 className="text-lg font-medium text-purple-900 lg:text-xl">
          {products[0]?.products.price} DA
        </h2>
        <ImageSlide productImages={productImages} />
      </div>
      <div className="w-fit">
        <div className="flex flex-col gap-1 px-3 py-1 md:w-2/3">
          <h3 className="text-md font-medium md:text-xl"> Description</h3>
          <p className="pt-5 text-sm font-light md:text-base">
            {products[0].products.description}
          </p>
        </div>
        <div className="w-full md:w-2/3">
          <OrderData Product={product} />
          <h3 className="text-md px-3 pt-3 font-medium md:text-2xl">
            Similar Products
          </h3>
          <div className="flex gap-1 overflow-scroll px-2 pb-8">
            {similarProducts!.map((p, i) => (
              <ProductCard
                key={i}
                href={p.id}
                imageUrl={p.showcaseImage}
                productTitle="Lebron NXXT Gen"
                brand="NIKE"
                category="Men's Shoes"
                price={p.price}
                className="basis-2/3"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
