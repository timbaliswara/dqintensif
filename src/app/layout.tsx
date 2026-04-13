import type { Metadata } from "next";
import "./globals.css";
import { BaseJsonLd } from "@/components/seo/jsonld";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "DQS Cemani",
    template: "%s · DQS Cemani",
  },
  description:
    "DQS Cemani mengintegrasikan Pendidikan Tahfidzul Quran secara intensif di bawah naungan Yayasan Daarul Quran Surakarta bekerja sama dengan Yayasan Al Hadi Mustaqim.",
  applicationName: "DQS Cemani",
  metadataBase: new URL(getSiteUrl()),
  keywords: [
    "pondok terbaik surakarta",
    "pesantren terbaik surakarta",
    "darul quran solo",
    "darul quran surakarta",
    "darul quran program intensif solo",
    "pesantren tahfizh solo",
    "pesantren tahfidz surakarta",
    "pondok wanita solo",
    "pesantren wanita solo",
    "pesantren mahasiswa solo",
    "pesantren putri solo",
    "pondok santriwati solo",
    "dqs cemani",
    "tahfidz intensif",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "DQS Cemani",
    title: "DQS Cemani",
    description:
      "Pondok pesantren tahfidz (Solo Raya/Surakarta) dengan pembinaan intensif, holistik, dan integral.",
    images: [{ url: "/brand/logo-dq.png" }],
  },
  twitter: {
    card: "summary",
    title: "DQS Cemani",
    description:
      "Pondok pesantren tahfidz (Solo Raya/Surakarta) dengan pembinaan intensif, holistik, dan integral.",
    images: ["/brand/logo-dq.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col">
        <BaseJsonLd />
        {children}
      </body>
    </html>
  );
}
