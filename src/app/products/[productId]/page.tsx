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
    <div className="flex flex-col items-center gap-8 pt-5 lg:flex-row lg:px-28">
      {/* <div className="w-full lg:w-3/4 xl:w-2/3"> */}
      <div className="px-4">
        <p className="mb-3 font-normal text-zinc-500"> Men &gt; shoes </p>
        <h1 className="mb-3 text-lg font-medium">
          {products[0].products.name}
        </h1>
        <h2 className="text-lg font-medium text-purple-900">
          {products[0]?.products.price} DA
        </h2><ImageSlide productImages={productImages} />
      </div>
      
      {/* </div> */}
      <div className="flex flex-col gap-1 px-3 py-1 md:w-2/3">
        <h3 className="text-md md:text-xl font-medium"> Description</h3>
        <p className="text-sm md:text-base font-light pt-5">{products[0].products.description}</p>
      </div>
      <div className="w-full md:w-2/3">
        {/* <div className="mb-6">
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
                  className="h-20 w-20 object-contain md:h-36 md:w-36"
                />
                <h3 className="px-1 text-center text-sm font-extralight md:text-lg">
                  Lakers Purple{" "}
                </h3>
              </div>
            ))}
          </div>
        </div> */}
        <OrderData Product={product} />
        <h3 className="px-3 text-md font-medium pt-3 md:text-2xl">
          Similar Products
        </h3>
        <div className="flex gap-1 overflow-scroll pb-8 px-2">
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
  );
}
