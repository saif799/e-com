import Image from "next/image";

type ProductImageProps = {
  imageUrl: string;
  imageTitle?: string;
  price?: string;
  category?: string;
};

export default function ProductCard({ imageUrl }: ProductImageProps) {
  return (
    <div className="min-w-40 md:min-w-52">
      <div className="relative pb-3">
        <Image
          src={imageUrl}
          alt={`Product image `}
          width={500}
          height={500}
          className="object-cover h-full w-full flex-shrink-0"
        />
      </div>
      <div className="pl-1">
        <h2 className="font-medium md:text-xl">Lebron NXXT Gen</h2>
        <p className="text-secondary md:text-lg">Nike | Man’s shoes</p>
        <p className="text-purple-900 md:text-lg">25,000 DA</p>
      </div>
    </div>
  );
}
