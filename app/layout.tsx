import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/context/CartContext";
import { ToastProvider } from "@/lib/context/ToastContext";

export const metadata: Metadata = {
  title: "JavaGem - Coffee Shop",
  description: "Your cozy coffee corner where every cup is a delightful experience",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#E8E8E8]">
        <CartProvider>
          <ToastProvider>
            <div className="mx-auto max-w-[430px] min-h-screen bg-[#F9F2ED] relative shadow-xl">
              {children}
            </div>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
