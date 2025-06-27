import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OOMA TRUST",
  description: "Digital Will on Sui Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}