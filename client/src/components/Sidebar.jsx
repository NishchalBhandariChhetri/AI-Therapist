import { useState } from "react";
import { PlusCircle } from "lucide-react"; // Icon for "New Chat"

function Sidebar({ chats, onSelectChat, onNewChat }) {
  return (
    <div className="bg-gray-900 text-white w-64 h-screen flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">AI Therapist</h1>

      {/* New Chat Button */}
      <button
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg mb-6"
        onClick={onNewChat}
      >
        <PlusCircle className="w-5 h-5" />
        New Chat
      </button>

      {/* Chat History */}
      <div className="flex flex-col gap-2 overflow-y-auto flex-grow">
        {chats.length === 0 && (
          <p className="text-gray-400 text-sm">No chats yet. Start a new one!</p>
        )}
        {chats.map((chat, index) => (
          <button
            key={index}
            onClick={() => onSelectChat(index)}
            className="text-left p-2 rounded-lg hover:bg-gray-800 truncate"
          >
            {chat.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
