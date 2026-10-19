import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ma Bibliothèque de Révision — 9 sujets",
  description:
    "Plateforme de révision complète : Administration des Systèmes Linux, Applications Réparties, Virtualisation & Cloud, Android, IoT, Big Data et Machine Learning (K-Means, KNN, SVM) — cours intégral, schémas, référence de commandes et boucles de maîtrise (zéro erreur).",
  keywords: ["révision", "cours", "Linux", "réparties", "virtualisation", "Docker", "Kubernetes", "Android", "IoT", "Big Data", "Hadoop", "MongoDB", "Machine Learning", "K-Means", "KNN", "SVM"],
  openGraph: {
    title: "Ma Bibliothèque de Révision — 9 sujets",
    description: "Cours intégral + quiz en boucle de maîtrise : re-teste tes erreurs jusqu'au zéro erreur.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
