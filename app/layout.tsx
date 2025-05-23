import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://amannegi.online"),
  applicationName: "Aman Negi",
  authors: [
    {
      name: "Aman Negi",
      url: "https://amannegi.online",
    },
  ],
  creator: "Aman Negi",
  publisher: "Aman Negi",
  title: {
    default: "Aman Negi",
    template: "%s | Aman Negi",
  },
  description:
    "Aman Negi is a software engineer and a passionate coder who loves to share knowledge through blogs and code snippets.",
  openGraph: {
    title: "Aman Negi",
    description:
      "Aman Negi is a software engineer and a passionate coder who loves to share knowledge through blogs and code snippets.",
    url: "https://amannegi.online",
    siteName: "Aman Negi",
    images: [
      {
        url: "https://amannegi.online/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Negi",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  keywords: [
    "Portfolio",
    "Profile",
    "Coding",
    "Blogs",
    "Projects",
    "Aman Negi",
    "Aman negi GitHub",
    "Aman negi LinkedIn",
    "Aman negi Twitter",
    "Aman negi Instagram",
    "Aman negi Facebook",
    "Aman negi Code Snippets",
    "Aman negi Blogs",
    "Aman negi Projects",
    "Aman negi Portfolio",
    "Aman negi Profile",
    "Aman negi Software Engineer",
    "Aman negi Web Developer",
    "Aman negi Frontend Developer",
    "Aman negi Backend Developer",
    "Aman negi Full Stack Developer",
    "Aman negi Software Developer",
    "Aman negi Software Engineer",
    "Aman negi Web Designer",
    "Aman negi Frontend Designer",
    "Aman negi Backend Designer",
    "Aman negi Full Stack Designer",
    "Aman negi Software Designer",
    "Aman negi Web Developer",
    "Software Engineer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Best Software Engineer",
    "Best Web Developer",
    "Best Frontend Developer",
    "Best Backend Developer",
    "Best Full Stack Developer",
    "Best Software Developer",
    "Indian Software Engineer",
    "Indian Web Developer",
    "Indian Frontend Developer",
  ],
  twitter: {
    card: "summary_large_image",
    description:
      "Get Code snippets , Blogs on coding , visit exciting projects",
  },
  alternates: {
    canonical: "https://amannegi.online",
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
