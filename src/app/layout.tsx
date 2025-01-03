import Footer from "@/components/Footer";
import CartSheet from "@/components/CartSheet";
import Navbar from "@/components/Navbar";
import { CartContextProvider } from "@/hooks/useCart";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { DM_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

// TODO work on the pics and their state in the products page (there for the product in the db needs a related producs or something similar )

// todos add the brand thingy - show the most buyed products work more on the category feature and fucking host that bitch (we will probably need to switch to postgress or some other provider since sqlite doesnt work on a serverless env) and work on the repsonsivness of the product page
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
export const metadata: Metadata = {
  title: "shoes selling store",
  description: "shoes selling store",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmMono.className}`}>
      <body className={`${dmMono.className} h-screen`}>
        <GoogleAnalytics gaId="G-G4PF455X69" />
        <Navbar />
        <div>
          <CartContextProvider>
            <CartSheet />
            {children}
            <Toaster />
          </CartContextProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
