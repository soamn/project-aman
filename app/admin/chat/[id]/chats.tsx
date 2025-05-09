"use client";
import MessageEditor from "@/app/components/messagetextarea";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const id = params?.id as string;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const res = await fetch(`/api/message/${id}`);
      const json = await res.json();
      if (json.success) {
        setMessages(json.message);
      }
    };
    fetchData();
  }, [id]);
  const fetchMessages = async () => {
    const res = await fetch(`/api/message/${id}`);
    const response = await res.json();
    if (response.success) {
      setMessages(response.message);
      scrollToBottom();
    }
  };

  const sendMessage = async (html: string) => {
    const res = await fetch(`/api/message/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: html.trim() }),
    });
    const response = await res.json();
    if (response.success) {
      fetchMessages();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="max-w-6xl m-auto">
      {messages &&
        messages.map((mes: any, key) => (
          <div key={key} className="w-full flex">
            {!mes?.isAdmin ? (
              <p
                className="bg-zinc-200 w-fit p-2 rounded-md max-w-[70%] mb-2 message"
                dangerouslySetInnerHTML={{ __html: mes?.message || "" }}
              ></p>
            ) : (
              <p
                className="bg-zinc-800 text-white w-fit p-2 rounded-md ml-auto max-w-[70%] mb-2 message"
                dangerouslySetInnerHTML={{ __html: mes?.message || "" }}
              ></p>
            )}
          </div>
        ))}
      <div ref={messagesEndRef} />
      <div className="w-full p-3 ">
        <MessageEditor onSend={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
