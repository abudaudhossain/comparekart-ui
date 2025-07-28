import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import { StoreProvider } from '@/context/StoreContext';
import { Metadata } from 'next';

const outfit = Outfit({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Compare Prices Instantly | price-comparison - Smart Shopping for Everyone",
  description: "Find the best deals across top online stores. price-comparison helps you compare prices, track discounts, and make informed buying decisions on electronics, fashion, beauty, and more.",
  keywords: "price comparison, best deals, online shopping, product comparison, electronics deals, fashion discounts, cheapest prices, smart shopping",
  authors: [{ name: "price-comparison Team" }],
  openGraph: {
    title: "Smart Shopping Made Easy | price-comparison",
    description: "Compare prices and save on your next purchase. Explore verified offers from top online retailers.",
    images: ["/images/home/image-01.png"], // Update with a real image path
    url: "https://price-comparison-ui-rho.vercel.app/", // Replace with your actual URL
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find the Best Deals with price-comparison",
    description: "Track prices, compare products, and shop smarter with price-comparison.",
    images: ["/images/home/image-01.png"], // Same image for consistency
    site: "@pricecomparison", // Replace with your actual Twitter handle
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ToastContainer className="z-99999" />
        <StoreProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
