import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ProductImageProps = {
  imageUrl: string;
  productTitle?: string;
  href: string;
  priority: "lazy" | "eager";
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
  priority,
  price,
  className,
}: ProductImageProps) {
  return (
    <Link
      href={`/products/${href}`}
      className={cn(className, "flex min-w-44 flex-col gap-5 px-3 py-4")}
    >
      <div className="bg-gray-white flex min-h-52 w-11/12 items-center justify-center overflow-hidden text-wrap md:size-[30vw] lg:size-[22vw]">
        <Image
          src={imageUrl}
          alt={`Product image `}
          width={500}
          height={500}
          loading={priority}
          className="block w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="md:text-md text-wrap font-medium md:text-xl">
          {productTitle}
        </h2>
        <p className="text-sm text-secondary md:text-lg">
          {brand?.toUpperCase()}
        </p>
        <p className="text-md font-medium text-purple-900 md:text-lg">
          {price?.toLocaleString("en-US", {
            style: "decimal",
            useGrouping: true,
          })}{" "}
          DA
        </p>
      </div>
    </Link>
  );
}
