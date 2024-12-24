import type { Metadata } from "next";
// These styles apply to every route in the application
import './globals.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Liberate",
  description: "liberate app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Navbar />
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body> */}
       <main className="flex-grow p-4">{children}</main>
      <Footer />
    </html>
  );
}
