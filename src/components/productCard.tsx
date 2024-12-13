import Image from "next/image";
import Link from "next/link";

type ProductImageProps = {
  imageUrl: string;
  productTitle?: string;
  href:string
  brand?: string ; 
  price?: number;
  category?: string;
};

export default function ProductCard({href, imageUrl , productTitle, brand , price , category  }: ProductImageProps) {
  return (
    <Link href={`/products/${href}`} className="w-full flex flex-col gap-5 py-4 hover:scale-105 rounded-2xl hover:bg-gray-50 transition-transform min-w-44">
      <div className="w-11/12 m-auto min-h-52 md:h-64 lg:h-[340px] bg-white rounded-2xl overflow-hidden flex items-center justify-center">
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
        <p className="text-purple-900 md:text-md font-medium">{price} DA</p>
      </div>
    </Link>
  );
}
