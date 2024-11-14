import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";


export const metadata: Metadata = {
  title: "Tryout - Master Education",
  description: "Tryout Master Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.png" />
      </head>
      <body className={`text-[#111810]`}>
        <NextTopLoader showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
