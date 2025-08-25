"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // import router
import { User } from "lucide-react"; // optional, using lucide-react icon

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  messages: { from: "me" | "them"; text: string }[];
}

const chats: Chat[] = [
  {
    id: 1,
    name: "Celina",
    lastMessage: "Hey there!",
    time: "10:33 AM",
    messages: [
      { from: "them", text: "Hi there!" },
      { from: "them", text: "How are you?" },
      { from: "me", text: "Hello!" },
      { from: "me", text: "I'm fine, thanks!" },
    ],
  },
  {
    id: 2,
    name: "Tim",
    lastMessage: "What’s up?",
    time: "9:12 AM",
    messages: [{ from: "them", text: "What’s up?" }],
  },
  {
    id: 3,
    name: "Joe",
    lastMessage: "Catch you later!",
    time: "Yesterday",
    messages: [{ from: "them", text: "Catch you later!" }],
  },
];

export default function DashboardPage() {
  const [activeChat, setActiveChat] = useState<Chat>(chats[0]);
  const router = useRouter(); // initialize router

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 border-r bg-white">
        <h2 className="p-4 text-lg font-semibold border-b">Chats</h2>
        <div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
                activeChat.id === chat.id ? "bg-gray-100" : ""
              }`}
            >
              <p className="font-medium">{chat.name}</p>
              <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              <span className="text-xs text-gray-400">{chat.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between bg-white">
          {/* Profile Icon */}
          <div
            onClick={() => router.push("/pages/profile")}
            className="cursor-pointer mr-3"
          >
            <User size={24} /> {/* icon from lucide-react */}
          </div>

          <h3 className="font-semibold flex-1">{activeChat.name}</h3>
          <div className="flex gap-3">
            <button>📞</button>
            <button>🎥</button>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
          {activeChat.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs p-2 rounded-lg ${
                msg.from === "me"
                  ? "bg-green-200 ml-auto text-right"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
}
