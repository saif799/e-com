import CartSheet from "@/components/CartSheet";
import Navbar from "@/components/Navbar";
import { CartContextProvider } from "@/hooks/useCart";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

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
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="h-screen">
          <Navbar />
          <CartContextProvider>
            <CartSheet />
            {children}
          </CartContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
