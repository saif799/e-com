// import { GetShowCaseProducts } from "@/actions/getProduct";
import { GetShowCaseProducts } from "@/actions/getProduct";
import { MainCarousel } from "@/components/mainCarousel";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";


export default async  function HomePage() {
  const products= await GetShowCaseProducts()
  if(!products) return 

  return (
    <main>
      
      <div className="flex flex-col items-center justify-center gap-8 pb-8">

        <MainCarousel/>

        <Button
          variant={"ghost"}
          className="hidden md:inline-flex text-md mx-auto px-8 py-6 font-light transition ease-in hover:bg-white hover:drop-shadow-[0_0px_45px_rgba(0,0,0,0.16)]"
        >
          View Product
        </Button>
        <h3 className="w-full pl-6 md:pl-8 lg:pl-12 text-left text-xl font-medium">Listings</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-4 w-full px-3 lg:px-8 pb-10">
          {
            products.map(p=>(   <ProductCard
            key={p.products.id}
              href={p.products.id}
                imageUrl={p.products.showcaseImage}
                productTitle={p.products.name}
                brand="NIKE"
                category={p.categories.name}
                price={p.products.price}
              />))
          }
        </div>
      </div>

    
    </main>
  );
}
