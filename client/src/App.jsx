import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";

function App() {
  const [chats, setChats] = useState([]); // Chat history
  const [activeChatIndex, setActiveChatIndex] = useState(null);

  const handleNewChat = () => {
    const newChat = { title: `Chat ${chats.length + 1}`, messages: [] };
    setChats([...chats, newChat]);
    setActiveChatIndex(chats.length);
  };

  const handleSelectChat = (index) => {
    setActiveChatIndex(index);
  };

  return (
    <div className="flex">
      <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
      <div className="flex-1 flex justify-center items-center">
        {activeChatIndex !== null ? (
          <ChatBox
            chat={chats[activeChatIndex]}
            setChat={(updatedChat) => {
              const updatedChats = [...chats];
              updatedChats[activeChatIndex] = updatedChat;
              setChats(updatedChats);
            }}
          />
        ) : (
          <p className="text-gray-500">Start a new chat to begin!</p>
        )}
      </div>
    </div>
  );
}

export default App;
