import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ProductImageProps = {
  imageUrl: string;
  productTitle?: string;
  href: string;
  brand?: string;
  price?: number;
  category?: string;
  className?: string;
};

export default function ProductCard({
  href,
  imageUrl,
  productTitle,
  brand,
  price,
  className,
}: ProductImageProps) {
  return (
    <Link
      href={`/products/${href}`}
      className={cn(
        className,
        "flex min-w-44 flex-col gap-5 py-4 transition-transform hover:scale-105 ",
      )}
    >
      <div className="m-auto flex min-h-52 w-11/12 items-center justify-center overflow-hidden text-wrap rounded-2xl bg-gray-white md:h-64 lg:h-[340px]">
        <Image
          src={imageUrl}
          alt={`Product image `}
          width={500}
          height={500}
          className="block w-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2 pl-3">
        <h2 className="md:text-md text-wrap font-medium md:text-xl">
          {productTitle}
        </h2>
        <p className="text-sm text-secondary md:text-lg">{brand}</p>
        <p className="text-md font-medium text-purple-900 md:text-lg">
          {price?.toLocaleString("en-US",{style : "decimal", useGrouping : true})} DA
        </p>
      </div>
    </Link>
  );
}
