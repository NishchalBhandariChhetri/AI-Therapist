import { useState } from "react";
import axios from 'axios'; 
import Sidebar from "./components/Sidebar";
import ChatBox from './components/ChatBox';

function App() {
  const [chats, setChats] = useState([]); 
  const [activeChatIndex, setActiveChatIndex] = useState(null);

  const handleNewChat = () => {
    const newChat = { title: `Chat ${chats.length + 1}`, messages: [] };
    setChats([...chats, newChat]);
    setActiveChatIndex(chats.length);
  };

  const handleSelectChat = (index) => {
    setActiveChatIndex(index);
  };

  const sendMessage = async (message) => {
    try {
      const response = await axios.post('/api/chat', { message });
      return response.data; 
    } catch (error) {
      throw new Error('Failed to get a response: ' + error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white p-4">
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
            sendMessage={sendMessage} 
          />
        ) : (
          <p className="text-gray-500">Start a new chat to begin!</p>
        )}
      </div>
    </div>
  );
}

export default App;