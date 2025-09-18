import { useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";

function App() {
  const [chats, setChats] = useState([]);
  const [activeChatIndex, setActiveChatIndex] = useState(null);

  // Get backend URL from environment or fallback to Render
  const API_BASE_URL =
    process.env.REACT_APP_API_URL || "https://ai-therapist-backend-msta.onrender.com";

  console.log("Using backend API URL:", API_BASE_URL);

  // Create new chat and set as active
  const handleNewChat = () => {
    const newChat = { title: "New Chat", messages: [] };
    setChats([...chats, newChat]);
    setActiveChatIndex(chats.length);
  };

  // Switch to an existing chat
  const handleSelectChat = (index) => {
    setActiveChatIndex(index);
  };

  // Send message to backend
  const sendMessage = async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, { message });
      return response.data;
    } catch (error) {
      console.error("Failed to get a response:", error);
      throw error;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white pl-64">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        activeChatIndex={activeChatIndex}
      />

      {/* Chat Window */}
      <div className="flex-1 flex justify-center items-start p-6">
        {activeChatIndex !== null ? (
          <ChatBox
            chat={chats[activeChatIndex]}
            setChat={(updatedChat) => {
              const updatedChats = [...chats];
              updatedChats[activeChatIndex] = updatedChat;
              setChats(updatedChats);
            }}
            sendMessage={async (message) => {
              // Automatically set chat title from first message
              if (chats[activeChatIndex].messages.length === 0) {
                const updatedChats = [...chats];
                updatedChats[activeChatIndex].title =
                  message.slice(0, 30) + "...";
                setChats(updatedChats);
              }
              return sendMessage(message);
            }}
          />
        ) : (
          <p className="text-gray-400 text-lg">Start a new chat to begin!</p>
        )}
      </div>
    </div>
  );
}

export default App;
