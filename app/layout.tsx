import type { Metadata } from "next";
import "./globals.css";

import Navigation from "./nav";
import Footer from "./components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://project-aman"),
  applicationName: "Readosphere",
  title: {
    default: "Project-aman",
    template: "%s | project-aman",
  },
  description: "Get Code snippets , Blogs , personally costumized by me.",

  keywords: ["Portfolio", "Profile", "Coding", "Blogs"],
  twitter: {
    card: "summary_large_image",
    description: "Get Code snippets , Blogs , personally costumized by me",
  },
  alternates: {
    canonical: "https://project-aman.com",
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
        <Navigation />
        <div className="flex-1  ">{children}</div>
        <div className="flex-end ">
          <Footer />
        </div>
      </body>
    </html>
  );
}
