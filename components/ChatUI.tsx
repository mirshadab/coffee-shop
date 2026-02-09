"use client";

import { useState, useEffect, useRef } from "react";
import { sendMessageAction, getMessagesAction } from "@/lib/actions/chat";

interface Message {
  id: string;
  message: string;
  createdAt: Date;
  sender: { id: string; name: string; role: string };
}

export default function ChatUI({ orderId, currentUserId }: { orderId: string; currentUserId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessagesAction(orderId);
      setMessages(msgs as Message[]);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);

    const result = await sendMessageAction(orderId, input.trim());
    if (result.success && result.message) {
      setMessages((prev) => [...prev, result.message as Message]);
    }
    setInput("");
    setSending(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-7 py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-[14px] text-[#9B9B9B] pt-8">No messages yet. Start a conversation!</p>
        )}
        {messages.map((msg) => {
          const isMe = msg.sender.id === currentUserId;
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  isMe
                    ? "bg-[#C67C4E] text-white rounded-br-md"
                    : "bg-[#F4F4F4] text-[#2F2D2C] rounded-bl-md"
                }`}
              >
                {!isMe && <p className="text-[11px] font-semibold mb-0.5 text-[#C67C4E]">{msg.sender.name}</p>}
                <p className="text-[14px]">{msg.message}</p>
                <p className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-[#9B9B9B]"}`}>
                  {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-7 pb-8 pt-3 border-t border-[#EAEAEA]">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 h-[48px] border border-[#DEDEDE] rounded-xl px-4 text-[14px] text-[#2F2D2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#C67C4E] transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="w-[48px] h-[48px] bg-[#C67C4E] rounded-xl flex items-center justify-center disabled:opacity-60"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
