import type { Metadata } from "next";
import "./sass/globals.sass";
import Header from "./ui/header";
import { Nunito_Sans } from 'next/font/google'
import { Suspense } from "react";
import Loading from "./loading";

const nunito = Nunito_Sans({
  subsets: ["cyrillic","cyrillic-ext", "latin", "latin-ext", "vietnamese"]
})

export const metadata: Metadata = {
  title: {
    template: 'WitW | %s',
    default: 'WitW',
  },
  description: "Where in the World | Countries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header /> 
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
