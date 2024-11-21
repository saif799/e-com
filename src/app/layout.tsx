import Navbar from "@/components/Navbar";
import { CartContextProvider } from "@/hooks/useCart";
import "@/styles/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { type Metadata } from "next";
import { DM_Mono } from 'next/font/google'

const dmMono = DM_Mono({
  subsets : ["latin"] ,
  weight : ["300" , "400" , "500"]
})
export const metadata: Metadata = {
  title: "shoes selling store",
  description: "shoes selling store",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
      <ClerkProvider>
    <html lang="en" className={`${dmMono.className}`}>

      <body className="h-screen">
        <Navbar />
        <div>

        <CartContextProvider>
        {children}
        </CartContextProvider>
        </div>
      </body>
    </html>
      </ClerkProvider>
  );
}
