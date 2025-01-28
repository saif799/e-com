import { GetShowCaseProducts } from "@/actions/getProduct";
import { MainCarousel } from "@/components/mainCarousel";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { shoeModels } from "@/server/db/schema";
import { isNotNull } from "drizzle-orm";

export default async function HomePage() {
  const [products, models] = await Promise.all([
    GetShowCaseProducts(),
    db.select().from(shoeModels).where(isNotNull(shoeModels.desktopImage)),
  ]);
  if (!products) return;
  try {
  } catch (error) {
    console.log(error);
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-8 pb-8">
        <MainCarousel models={models} />

        <Button
          variant={"ghost"}
          className="text-md mx-auto hidden px-8 py-6 font-light transition ease-in hover:bg-white hover:drop-shadow-[0_0px_45px_rgba(0,0,0,0.16)] md:inline-flex"
        >
          View Product
        </Button>
        <h3 className="w-full pl-6 text-left text-xl font-medium md:pl-8 lg:pl-12">
          Listings
        </h3>
        <div className="grid w-full grid-cols-2 gap-3 px-3 pb-10 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 lg:px-8">
          {products.map((p) => (
            <ProductCard
              key={p.products.id}
              href={p.products.id}
              imageUrl={p.products.showCase}
              productTitle={p.products.name}
              brand={"NIKE"}
              price={p.products.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
