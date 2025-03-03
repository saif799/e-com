import Footer from "@/components/Footer";
import CartSheet from "@/components/CartSheet";
import Navbar from "@/components/Navbar";
import { CartContextProvider } from "@/hooks/useCart";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { DM_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import FacebookPixel from "@/lib/Providers/fbPixelProvider";
import NextTopLoader from "nextjs-toploader";
// TODO work on the pics and their state in the products page (there for the product in the db needs a related producs or something similar )

// todos add the brand thingy - show the most buyed products work more on the category feature and fucking host that bitch (we will probably need to switch to postgress or some other provider since sqlite doesnt work on a serverless env) and work on the repsonsivness of the product page
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
export const metadata: Metadata = {
  title: "Legenwear dz",
  description:
    "Legenwear dz is your go-to destination for original, high-quality sport shoes designed to bring style, comfort, performance and durability to every step. Whether you're looking for trendy sneakers or timeless classics, we've got the perfect pair for you.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmMono.className}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />

        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
      </head>
      <body className={`${dmMono.className} h-screen`}>
        <NextTopLoader
          color="#000000"
          shadow={false}
          showSpinner={false}
          height={2}
        />
        <GoogleAnalytics gaId="G-G4PF455X69" />
        <Navbar />
        <div className="pt-10">
          <CartContextProvider>
            <CartSheet />
            {children}
            <Toaster />
            <FacebookPixel />
          </CartContextProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
