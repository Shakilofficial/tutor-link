import Providers from "@/providers";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const poppins = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tutor Link",
  description: "Tutor Link is a platform for tutors to connect with students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
