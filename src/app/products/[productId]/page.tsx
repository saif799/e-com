import ProductCard from "@/components/productCard";
import ImageSlide from "@/components/imageSlide";
import { GetProduct, GetSimilarProducts } from "@/actions/getProduct";
import { OrderData, type OrderProductType } from "@/components/OrderData";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = { params: { productId: string } };
export default async function Component({ params: { productId } }: Props) {
  const products = await GetProduct(productId);

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (!products || !products[0]?.products) return;
  const similarProducts = await GetSimilarProducts(
    products[0].products.modelId,
    productId,
  );

  const pImages = products[0].images
    ? products
        .map((p) => p.images!.imageUrl)
        .filter(
          (item, index, self) => index === self.findIndex((t) => t === item),
        )
    : [];
  const product: OrderProductType = {
    id: productId,
    name: products[0].products.name,
    price: products[0].products.price,
    image: products[0].products.showCase,
    sizes: products
      .map((p) => ({
        size: p.product_sizes!.size,
        quantity: p.product_sizes!.stock,
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.size === item.size),
      )
      .sort((a, b) => a.size - b.size),
  };

  return (
    <div className="flex flex-col items-stretch gap-8 pt-5 md:px-24 lg:flex-row lg:flex-wrap lg:px-16">
      {/* <div className="w-full lg:w-3/4 xl:w-2/3"> */}
      <div className="max-w-[100vw] lg:w-[60%]">
        <div className="lg:sticky lg:top-20">
          <div className="px-4">
            <p className="mb-3 font-normal text-zinc-500"> Men &gt; shoes </p>

            <div className="lg:hidden">
              <h1 className="mb-3 text-lg font-medium">
                {products[0].products.name}
              </h1>
              <h2 className="text-lg font-medium text-purple-900">
                {products[0]?.products.price} DA
              </h2>
            </div>

            <ImageSlide
              productImages={[products[0].products.showCase, ...pImages]}
            />
          </div>
        </div>
      </div>

      {/* </div> */}
      <div className="flex w-screen flex-col gap-1 px-3 py-1 md:w-2/3 lg:w-1/3">
        <div className="hidden pt-12 lg:inline-block">
          <h2 className="hidden">{/* {products[0]?.products.brand} DA */}</h2>
          <h1 className="mb-3 text-2xl font-medium">
            {products[0].products.name}
          </h1>
          <h2 className="text-xl font-medium text-purple-900">
            {products[0]?.products.price} DA
          </h2>
        </div>
        <p className="pt-5 text-sm font-light md:text-base lg:text-base">
          {products[0].products.description}
        </p>
        <OrderData Product={product} />
      </div>
      <div className="w-full">
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
        <h3 className="text-md px-3 pt-1 font-medium md:text-2xl">
          Similar Products
        </h3>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">

        <div className="flex flex-grow gap-4 overflow-scroll px-2 pb-8">
          {similarProducts!.map((p, i) => (
            <ProductCard
              key={i}
              href={p.products.id}
              imageUrl={p.products.showCase}
              productTitle={p.products.name}
              brand={p.shoe_models.brand}
              price={p.products.price}
              className="basis-2/3 lg:basis-1/4"
            />
          ))}
        </div>
        </ScrollArea>
      </div>
    </div>
  );
}
