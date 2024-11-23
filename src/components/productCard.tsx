import Image from "next/image";

type ProductImageProps = {
  imageUrl: string;
  productTitle?: string;
  brand?: string ; 
  price?: string;
  category?: string;
};

export default function ProductCard({ imageUrl , productTitle, brand , price , category  }: ProductImageProps) {
  return (
    <div className="w-full flex flex-col gap-5 pb-4">
      <div className="border min-h-52 max-h-56 md:h-64 lg:h-[278px]  rounded-2xl overflow-hidden flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={`Product image `}
          width={500}
          height={500}
          className="object-cover block w-full" 
        />
      </div>
      <div className="pl-3 flex flex-col gap-2">
        <h2 className="font-medium md:text-md">{productTitle}</h2>
        <p className="text-secondary md:text-md">{brand} | {category}</p>
        <p className="text-purple-900 md:text-md font-medium">{price}</p>
      </div>
    </div>
  );
}
