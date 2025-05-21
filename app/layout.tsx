import type { Metadata } from "next";
import "./globals.css";

import Navigation from "./nav";
import Footer from "./components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://sketched-down.vercel.app"),
  applicationName: "Sketched-Down",
  title: {
    default: "Sketched-down",
    template: "%s | Sketched-down",
  },
  description:
    "Anything and everything sketched down refers to the total documentation of thoughts, visuals, and concepts, typically in a rough or exploratory form, to ensure nothing is forgotten, ignored, or left out during a creative or planning process.",

  keywords: ["Portfolio", "Profile", "Coding", "Blogs"],
  twitter: {
    card: "summary_large_image",
    description:
      "Get Code snippets , Blogs on coding , visit exciting projects",
  },
  alternates: {
    canonical: "https://sketched-down.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-offwhite flex flex-col h-screen">
        <div className="flex-1  ">{children}</div>
        <div className="flex-end ">
          <Footer />
        </div>
      </body>
    </html>
  );
}
