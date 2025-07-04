import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "King Bar Augusta",
  description: "Inauguração 14 de Agosto de 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
