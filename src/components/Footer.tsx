const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-8 bg-secondary-foreground py-8">
      <img src="/logo-text-white.svg" alt="" className="lg:hidden" />
      <div className="flex w-full justify-around px-6 md:px-44 lg:pt-10">
        <div className="hidden basis-1/2 flex-col gap-4 lg:inline-flex">
          <img src="/logo-text-white.svg" alt="" className="md:w-24" />
          <p className="w-9/12 pb-2 text-sm font-thin text-gray-300">
            Your go-to destination for original, high-quality shoes designed to
            bring style, comfort, and durability to every step. Whether
            you&apos;re looking for trendy sneakers or timeless classics,
            we&apos;ve got the perfect pair for you.
          </p>
        </div>
        <div className="flex flex-col md:basis-1/4">
          <h5 className="py-2 text-white">Links</h5>
          <a
            className="pb-2 pt-3 text-sm font-thin text-gray-300 underline"
            href="/"
          >
            About us
          </a>
          <a
            className="pb-2 text-sm font-thin text-gray-300 underline"
            href="/"
          >
            Return Policy
          </a>
          <a
            className="pb-2 text-sm font-thin text-gray-300 underline"
            href="/"
          >
            Terms of use
          </a>
        </div>
        <div className="my-4 border border-white lg:hidden"></div>
        <div className="flex basis-1/4 flex-col">
          <h5 className="py-2 text-white">Contact us</h5>
          <a
            className="pb-2 pt-3 text-sm font-thin text-gray-300 underline"
            href="/"
          >
            About us
          </a>
          <a
            className="pb-2 text-sm font-thin text-gray-300 underline"
            href="/"
          >
            Return Policy
          </a>
          <a
            className="pb-2 text-sm font-thin text-gray-300 underline"
            href="/"
          >
            Terms of use
          </a>
        </div>
      </div>
      <p className="text-sm font-thin text-gray-300">
        LegenWear © 2024 All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
