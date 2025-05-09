"use client";
import { ChevronDown, MessageSquare } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { v4 as uuidv4 } from "uuid";
import MessageEditor from "./messagetextarea";

const Message = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string>();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookieName = "anon_id";
    const existingId = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`))
      ?.split("=")[1];

    const finalId = existingId || uuidv4();
    if (!existingId) {
      document.cookie = `${cookieName}=${finalId}; path=/; SameSite=Lax`;
    }
    setId(finalId);
  }, []);

  useEffect(() => {
    if (id) fetchMessages();
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
    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: html.trim(), sender: id }),
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
    <>
      <motion.div
        whileTap={{ scale: [0.1, 1.2, 1] }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800 w-fit rounded-full p-3 right-4 z-50  
        text-white fixed bottom-6 hover:scale-105 transition-transform duration-300
        cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? <MessageSquare /> : <ChevronDown />}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="message-box"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="right-4 fixed bottom-20 bg-white text-black rounded-xl shadow-lg  w-100 h-180 z-[100] flex flex-col"
          >
            <div className="w-full p-4 shadow font-bold flex items-center space-x-2">
              <img
                src="music_anim.webp"
                width={40}
                height={40}
                className="rounded-full object-cover"
                alt="admin"
              />
              <span>Aman Negi</span>
            </div>

            <div className="p-2 flex-1 overflow-y-auto space-y-4">
              <motion.p
                animate={{ y: [-50, 0] }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-200 w-fit p-2 rounded-md max-w-[70%]"
              >
                Hey there! Pitch your idea
              </motion.p>

              {messages.map((mes: any, key) => (
                <div key={key} className="w-full flex">
                  {mes?.isAdmin ? (
                    <p
                      className="bg-zinc-200 w-fit p-2 rounded-md max-w-[70%] message"
                      dangerouslySetInnerHTML={{ __html: mes?.message || "" }}
                    ></p>
                  ) : (
                    <p
                      className="bg-zinc-800 text-white w-fit p-2 rounded-md ml-auto max-w-[70%] message"
                      dangerouslySetInnerHTML={{ __html: mes?.message || "" }}
                    ></p>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="w-full p-3 ">
              <MessageEditor onSend={sendMessage} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Message;
