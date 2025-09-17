import { PlusCircle } from "lucide-react";

function Sidebar({ chats, onSelectChat, onNewChat, activeChatIndex }) {
  return (
    <div className="fixed top-0 left-0 bg-gray-900 text-white w-64 h-screen flex flex-col p-4 sidebar">
      {/* Website Title - Stays on Top */}
      <h1 className="text-2xl font-bold mb-4 sticky top-0 bg-gray-900 z-10">
        AI Therapist
      </h1>

      {/* New Chat Button - Always Visible */}
      <button
        className="new-chat flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg mb-6 transition-colors w-full sticky top-[3.5rem] z-10 bg-blue-600"
        onClick={onNewChat}
      >
        <PlusCircle className="w-5 h-5" />
        New Chat
      </button>

      {/* Chat Section */}
      <h3 className="text-lg font-semibold mb-2 sticky top-[7.5rem] bg-gray-900 z-10">
        Chats
      </h3>

      <ul className="chat-history flex flex-col gap-1 overflow-y-auto flex-grow">
        {chats.length === 0 ? (
          <li className="text-gray-400 text-sm italic">No chats yet. Start one!</li>
        ) : (
          chats.map((chat, index) => (
            <li key={index}>
              <button
                onClick={() => onSelectChat(index)}
                className={`w-full text-left px-3 py-2 rounded-lg truncate transition-colors ${
                  activeChatIndex === index
                    ? "bg-gray-800 text-blue-400 font-semibold"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                {chat.messages.length > 0
                  ? chat.messages[0].text.slice(0, 30) + "..."
                  : chat.title}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
