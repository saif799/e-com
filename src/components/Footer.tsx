import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="flex flex-col items-center justify-center gap-8 bg-secondary-foreground py-12">
      <div className="flex flex-col items-center gap-6">
        <Image
          width={100}
          height={100}
          src="/logo-dark-bg.svg"
          alt=""
          className="aspect-auto w-40 object-cover lg:w-44"
        />
        <p className="w-4/5 text-center text-sm font-thin text-gray-300">
          Your go-to destination for original, high-quality shoes designed to
          bring style, comfort, and durability to every step. Whether
          you&apos;re looking for trendy sneakers or timeless classics,
          we&apos;ve got the perfect pair for you.
        </p>
        <p className="text-center text-lg font-thin text-white">follow us on</p>
        <div className="flex gap-8">
          <Link  href={"https://www.tiktok.com/@legenwear.dz"}>
            <Image
              width={100}
              height={100}
              src="/tiktok-icon.svg"
              alt=""
              color="white"
              className="aspect-auto w-6 object-cover lg:w-8"
            />
          </Link>
          <Link href={"https://www.instagram.com/legenwear.dz/"}>
            <Image
              width={100}
              height={100}
              src="/instagram-icon.svg"
              alt=""
              color="white"
              className="aspect-auto w-6 object-cover lg:w-8"
            />
          </Link>
          <Link href={"https://www.facebook.com/profile.php?id=61569910111728"}>
            <Image
              width={100}
              height={100}
              src="/facebook-icon.svg"
              alt=""
              color="white"
              className="aspect-auto w-6 object-cover lg:w-8"
            />
          </Link>
        </div>
        <p className="text-sm font-thin text-gray-300">
          LegenWear © {year} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
