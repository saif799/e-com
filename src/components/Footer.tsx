const Footer = () => {
  return (
    <footer className="flex flex-col gap-6 items-center justify-center bg-secondary-foreground py-8">
      <img src="/logo-text-white.svg" alt="" />
      <div className="flex justify-between w-full px-6">
        <div className="flex flex-col">
          <h5 className="text-white pb-4">Links</h5>
          <a className="text-white font-thin text-sm pb-2 underline" href="/">
            About us
          </a>
          <a className="text-white font-thin text-sm pb-2 underline" href="/">
            Return Policy
          </a>
          <a className="text-white font-thin text-sm pb-2 underline" href="/">
            Terms of use
          </a>
        </div>
        <div className="border border-white"></div>
        <div className="flex flex-col">
          <h5 className="text-white pb-4" >Contact us</h5>
          <a  className="text-white font-thin text-sm pb-2 underline" href="/">About us</a>
          <a  className="text-white font-thin text-sm pb-2 underline" href="/">Return Policy</a>
          <a  className="text-white font-thin text-sm pb-2 underline" href="/">Terms of use</a>
        </div>
      </div>
      <p className="text-white text-sm font-thin">LegenWear © 2024 All rights reserved.</p>
    </footer>
  );
};

export default Footer;
