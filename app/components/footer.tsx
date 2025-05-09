import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-300  bg-inherit hover:underline flow-hidden">
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 px-4 py-6 text-zinc-600 text-xs sm:text-sm max-w-screen overflow-x-hidden">
        <Link href="/writings" className="hover:underline">
          Writings
        </Link>
        <Link href="/gallery" className="hover:underline">
          Gallery
        </Link>
        <Link href="/code-writings/code" className="hover:underline">
          Code
        </Link>
        <Link
          href="https://github.com/soamn"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/soamn/"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
        <Link
          href="https://t.me/amn_negi"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </Link>
        <Link href="/" className="hover:underline">
          Home
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
