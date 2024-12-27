import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";

import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Liberate",
  description: "A Mindful Brain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Providers> */}
          <Navbar />
          <main style={{ minHeight: "80vh" }}>{children}</main>
          {/* Potential <Footer /> */}
        {/* </Providers> */}
      </body>
    </html>
  );
}
