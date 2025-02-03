import ProductCard from "@/components/productCard";
import ImageSlide from "@/components/imageSlide";
import {
  GetProduct,
  GetSimilarProducts,
  GetSimilarProductsSizes,
} from "@/actions/getProduct";
import { OrderData, type OrderProductType } from "@/components/OrderData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = { params: { productId: string } };
export default async function Component({ params: { productId } }: Props) {
  const products = await GetProduct(productId);

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (!products || !products[0]?.products) return;
  const sizes = products
    .map((p) => p.product_sizes!.size)
    .filter((item, index, self) => index === self.findIndex((t) => t === item));

  const [similarProducts, ProductsWithSimilarSizes] = await Promise.all([
    GetSimilarProducts(products[0].products.modelId, productId),
    GetSimilarProductsSizes(sizes, productId),
  ]);

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
        size: Number(p.product_sizes!.size),
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

      <div className="w-full ">
        {ProductsWithSimilarSizes ? (
          <>
            {" "}
            <h3 className="text-md px-3 pt-1 font-medium md:text-2xl pb-2">
              Shoes with similar sizes
            </h3>
            <ScrollArea>
            <div className="flex flex-grow gap-3 px-2 pb-4">
              {ProductsWithSimilarSizes.map((p, i) => (
                <ProductCard
                  key={i}
                  href={p.id}
                  imageUrl={p.showCase}
                  productTitle={p.name}
                  brand={"Nike"}
                  price={p.price}
                  className="basis-2/3 lg:basis-1/4"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />

            </ScrollArea>
          </>
        ) : null}
      </div>
      <div className="w-full pb-4">
        {similarProducts?.length ? (
          <>
            <h3 className="text-md px-3 pt-1 font-medium md:text-2xl pb-2">
              Similar Products
            </h3>
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-full space-x-4 px-2 pb-4">
              {similarProducts.map((p, i) => (
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
            <ScrollBar orientation="horizontal" />

            </ScrollArea>
          </>
        ) : null}
      </div>
    </div>
  );
}
