import { GetShowCaseProducts } from "@/actions/getProduct";
import Listings from "@/components/Listings";
import { MainCarousel } from "@/components/mainCarousel";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { type products, type productSizes, shoeModels } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type formattedProductsType = {
  products: InferSelectModel<typeof products>;
  shoe_models: InferSelectModel<typeof shoeModels>;
  product_sizes: InferSelectModel<typeof productSizes>[] | null;
}
export default async function HomePage() {
  const [products, models] = await Promise.all([
    GetShowCaseProducts(),
    db.select().from(shoeModels),
  ]);
  if (!products) return;
  try {
  } catch (error) {
    console.log(error);
  }
  let iterator = { index: 0, id: "" };
  const formattedProducts : formattedProductsType[] = [];
  products.forEach((p, index) => {
    if (p.products.id !== iterator.id) {
      iterator = { index: index, id: p.products.id };
      formattedProducts.push({products : p.products,shoe_models: p.shoe_models, product_sizes: [p.product_sizes]});
    }
    else if(p.products.id === iterator.id) {
      formattedProducts[iterator.index]?.product_sizes?.push(p.product_sizes);
    }
  });

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-8 pb-8">
        <MainCarousel models={models.filter((p)=>{
          return (p.desktopImage) && (p.mobileImage);
        })} />

        <Button
          variant={"ghost"}
          className="text-md mx-auto hidden px-8 py-6 font-light transition ease-in hover:bg-white hover:drop-shadow-[0_0px_45px_rgba(0,0,0,0.16)] md:inline-flex"
        >
          View Product
        </Button>
        <Listings products={formattedProducts} models={models} />
      </div>
    </main>
  );
}
