import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://www.agad.in"),
  title: "Agad - Healthcare, Instantly",
  description: "Consult top doctors in minutes, track your vital statistics, and manage prescriptions securely with the Agad app. Minimalistic, swift, secure. Your health in your hands.",
  keywords: "Agad, healthcare, telemedicine, vitals tracker, consultation, doctor appointment, health app",
  authors: [{ name: "Agad Health" }],
  alternates: {
    canonical: "https://www.agad.in",
  },
  openGraph: {
    title: "Agad - Healthcare, Instantly",
    description: "Consult top doctors in minutes, track your vital statistics, and manage prescriptions securely with the Agad app.",
    url: "https://www.agad.in",
    siteName: "Agad",
    images: [
      {
        url: "https://ik.imagekit.io/zftua2pck/agadbanner-min.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agad - Healthcare, Instantly",
    description: "Consult top doctors in minutes, track your vital statistics, and manage prescriptions securely with the Agad app.",
    images: ["https://ik.imagekit.io/zftua2pck/agadbanner-min.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
