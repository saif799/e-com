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
        "flex min-w-44 flex-col gap-5 rounded-2xl py-4 transition-transform hover:scale-105 hover:bg-gray-50",
      )}
    >
      <div className="bg-gray-white m-auto flex w-11/12 basis-1/2 items-center justify-center overflow-hidden text-wrap rounded-2xl md:h-64 lg:h-[340px]">
        <Image
          src={imageUrl}
          alt={`Product image `}
          width={500}
          height={500}
          className="block w-full rounded-md object-cover"
        />
      </div>
      <div className="flex basis-1/2 flex-col gap-2 pl-3">
        <h2 className="md:text-md text-wrap font-medium md:text-xl">
          {productTitle}
        </h2>
        <p className="text-sm text-secondary md:text-xl">{brand}</p>
        <p className="text-md font-medium text-purple-900 md:text-xl">
          {price} DA
        </p>
      </div>
    </Link>
  );
}
