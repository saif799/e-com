import ProductCard from "@/components/productCard";
import { db } from "@/server/db";
import { products, shoeModels } from "@/server/db/schema";
import { eq } from "drizzle-orm";

type Props = { params: { modelId: string } };

export default async function page({ params: { modelId } }: Props) {
  const shoes = await db
    .select()
    .from(products)
    .innerJoin(shoeModels, eq(shoeModels.id, products.modelId))
    .where(eq(products.modelId, modelId));
  return (
    <div className="min-h-screen pt-20">
      <h1 className="w-full px-4 text-center text-lg font-light md:px-10 md:text-2xl">
        All {shoes[0]?.shoe_models.modelName}
      </h1>
      <div className="grid w-full grid-cols-2 gap-3 px-3 pb-44 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 lg:px-8">
        {shoes.map((shoe, index) => (
          <ProductCard
            priority={index < 6 ? "eager" : "lazy"}
            key={shoe.products.id}
            href={shoe.products.id}
            imageUrl={shoe.products.showCase}
            productTitle={shoe.products.name}
            brand={shoe.shoe_models.brand}
            price={shoe.products.price}
          />
        ))}
      </div>
    </div>
  );
}
