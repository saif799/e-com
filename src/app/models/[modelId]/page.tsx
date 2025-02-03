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
    <div className="min-h-screen">
      <h1 className="px-4 text-lg text-center w-full font-light md:px-10 md:text-2xl pt-8">
       All {shoes[0]?.shoe_models.modelName}
      </h1>
      <div className="grid w-full grid-cols-2 gap-3 px-3 pb-44 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 lg:px-8">
        {shoes.map((shoe) => (
          <ProductCard
            key={shoe.products.id}
            href={shoe.products.id}
            imageUrl={shoe.products.showCase}
            productTitle={shoe.products.name}
            brand={"NIKE"}
            price={shoe.products.price}
          />
        ))}
      </div>
    </div>
  );
}
