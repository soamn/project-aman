import { prisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { Edit, MessageCircle, Plus } from "lucide-react";
import Action from "./action";
import Logout from "./logout";
import DashButton from "./dashbutton";
enum ACTION {
  Delete,
  Copy,
}

async function getPosts() {
  return await prisma.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
}

async function getImageItems() {
  return await prisma.imagePiece.findMany();
}

async function getEmails() {
  return await prisma.email.findMany();
}

const Dashboard = async () => {
  const posts = await getPosts();
  const groupedPosts = posts.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  const imageItems = await getImageItems();
  const emails = await getEmails();
  return (
    <div className="flex">
      <aside className="w-64  text-black p-4 h-screen">
        <ul className="space-y-4">
          <li>
            <Link
              href="/admin/editor"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Plus className="inline" /> Create Post
            </Link>
          </li>

          <li>
            <Link
              href="/admin/gallery"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Plus className="inline" /> Add Image
            </Link>
          </li>
          <li>
            <Link
              href="/admin/chat/1"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <MessageCircle className="inline" /> Chat
            </Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </aside>

      <div className="flex-1 p-6">
        <h1 className="text-2xl mb-4 font-semibold">Dashboard</h1>

        <h2 className="text-xl mb-2 font-medium">Posts</h2>
        <table className="w-full table-auto border-collapse mb-8 overflow-scroll ">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedPosts).map(([category, postsInCategory]) => (
              <React.Fragment key={category}>
                <tr>
                  <td
                    colSpan={3}
                    className="bg-gray-200 font-bold p-2 text-left"
                  >
                    {category}
                  </td>
                </tr>
                {postsInCategory.map((post) => (
                  <tr key={post.slug}>
                    <td className="border p-2">{post.title}</td>
                    <td className="border p-2">{post.slug}</td>
                    <td className="border p-2">
                      <Link
                        className="   rounded mr-2 inline-flex items-center gap-1"
                        href={`editor/${post.id}`}
                      >
                        <Edit className="" />
                      </Link>
                      <Action url={post.slug} isPost={true} />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl mb-2 font-medium">Image Items</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Likes</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {imageItems.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">
                  <img
                    src={item.Image}
                    alt={`Image ${item.title}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-2">{item.Likes}</td>
                <td className="border p-2">
                  <Action url={item.id} isPost={false} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl mb-2 font-medium">Emails</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Emails</th>
              <th className="border p-2">copy</th>
              <th className="border p-2">delete</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.id}>
                <td className="border p-2">{email.email}</td>
                <td className="border p-2">
                  <DashButton action={ACTION.Copy} string={email.email} />
                </td>
                <td className="border p-2">
                  <DashButton action={ACTION.Delete} string={email.email} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
