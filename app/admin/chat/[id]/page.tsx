import ActiveIndicator from "@/app/components/activeindicator";
import { prisma } from "@/lib/prisma";
import React from "react";
import Chat from "./chats";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const messages = await prisma.message.findMany({
    where: {
      isAdmin: false,
    },
    select: {
      sender: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    distinct: ["sender"],
    take: 10,
  });

  const currentSlug = id;
  return (
    <div className="flex min-h-screen p-20">
      <aside className="w-64 p-4 fixed">
        <h2 className="text-lg font-bold mb-4">Code Writings</h2>
        <ul className="space-y-2 bg-red-500">
          {messages.map((message) => (
            <li key={message.sender}>
              <a
                href={`/admin/chat/${message.sender}`}
                className={`relative block px-2 py-1 pl-3 rounded transition-colors duration-300 ${
                  message.sender === currentSlug
                    ? "text-zinc-900 font-medium"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {message.sender === currentSlug && <ActiveIndicator />}
                {message.sender}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 ml-64">
        <Chat />
      </main>
    </div>
  );
};
export default Page;
