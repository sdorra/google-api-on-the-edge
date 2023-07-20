import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";

const display = Lora({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google API on the Edge",
  description: "Use Google APIs in edge functions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "container font-body grid grid-rows-[auto,1fr,auto] min-h-screen",
          display.variable,
          body.variable
        )}
      >
        <header className="py-10">
          <h1 className="font-display font-bold text-4xl">Google API on the Edge</h1>
          <p>Use Google APIs in edge functions</p>
        </header>
        <main>{children}</main>
        <footer>
          <p className="py-10 text-right text-xs text-muted-foreground">
            Made with ❤️ by <a href="https://sdorra.dev/">Sebastian Sdorra</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
