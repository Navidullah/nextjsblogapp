import { JetBrains_Mono, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/Providers";
import HeaderComponent from "./components/header/HeaderComponent";
import Footer from "./components/footer/Footer";
import "highlight.js/styles/github.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono", // this will be used in Tailwind
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BrainSparks",
  description: "Brain sparks",
  icons: {
    icon: "/favicon.png", // or "/favicon.ico"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center min-h-screen">
            <div className="w-[800px] h-[800px] bg-purple-500 opacity-30 dark:opacity-20 blur-[160px] rounded-full mx-auto" />
          </div>
        </div>
        <Providers>
          <HeaderComponent />
          <main className="pt-[170px] sm:pt-[145px] wrapper">{children}</main>
          <Footer />
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    function copyCode(button) {
      const codeElement = button.closest(".code-wrapper")?.querySelector("pre code");
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText).then(() => {
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 2000);
        });
      }
    }
  `,
          }}
        />
      </body>
    </html>
  );
}
