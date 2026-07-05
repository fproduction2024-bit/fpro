import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-shippori",
  display: "swap",
});

export const metadata: Metadata = {
  title: "タングルシード公式HP | TangleSeed Official",
  description: "15分の静寂で、社会を整える。美大卒CZTが贈る、世界で最も優しい自分へのご褒美。タングルシードは、あなたの「線」の時間を支えます。",
  keywords: ["ゼンタングル", "タングルシード", "マインドフルネス", "アートセラピー", "古橋緑"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable} ${shipporiMincho.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
