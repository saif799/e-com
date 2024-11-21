import Image from "next/image";

type ProductImageProps = {
  imageUrl: string;
  imageTitle?: string;
  price?: string;
  category?: string;
};

export default function ProductCard({ imageUrl }: ProductImageProps) {
  return (
    <div className="min-w-40 md:min-w-52 basis-1/4 flex flex-col gap-5 pb-4">
      <div className="border h-[45vh] rounded-2xl overflow-hidden flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={`Product image `}
          width={500}
          height={500}
          className="object-cover block w-full" 
        />
      </div>
      <div className="pl-3 flex flex-col gap-2">
        <h2 className="font-medium md:text-md">Lebron NXXT Gen</h2>
        <p className="text-secondary md:text-md">Nike | Man’s shoes</p>
        <p className="text-purple-900 md:text-md font-medium">25,000 DA</p>
      </div>
    </div>
  );
}
