import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Agad - Healthcare, Instantly | Doctor Consultations & Vitals Tracking",
  description: "Consult top doctors in minutes, track your vital statistics, and manage prescriptions securely with the Agad app. Minimalistic, swift, secure. Your health in your hands.",
  keywords: "Agad, healthcare, telemedicine, vitals tracker, consultation, doctor appointment, health app",
  authors: [{ name: "Agad Health" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
