import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function ChatBox({ chat, setChat, sendMessage }) {
  const safeChat = chat || { title: "Chat 1", messages: [] };
  const safeSetChat = setChat || (() => {});
  const safeSendMessage = sendMessage || (() => Promise.reject(new Error("sendMessage not provided")));

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [safeChat.messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userInput = input;
    setInput("");

    const newMessages = [...safeChat.messages, { sender: "user", text: userInput }];
    safeSetChat({ ...safeChat, messages: newMessages });

    setIsTyping(true);
    try {
      const res = await safeSendMessage(userInput);
      setIsTyping(false);
      safeSetChat({
        ...safeChat,
        messages: [...newMessages, { sender: "bot", text: res.reply || "⚠️ Error" }],
      });
    } catch (err) {
      setIsTyping(false);
      safeSetChat({
        ...safeChat,
        messages: [...newMessages, { sender: "bot", text: `⚠️ Failed: ${err.message}` }],
      });
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg flex flex-col flex-grow max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{safeChat.title}</h2>
      <div className="flex-1 overflow-y-auto border p-3 mb-4 rounded bg-white">
        {safeChat.messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="text-left mb-2">
            <span className="inline-block px-3 py-2 rounded-lg bg-gray-200 italic text-gray-600 animate-pulse">
              AI is thinking...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          className="flex-grow border rounded-l-lg px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Share your thoughts..."
          style={{ color: 'black' }}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

ChatBox.propTypes = {
  chat: PropTypes.shape({
    title: PropTypes.string,
    messages: PropTypes.arrayOf(
      PropTypes.shape({ sender: PropTypes.string, text: PropTypes.string })
    ),
  }),
  setChat: PropTypes.func,
  sendMessage: PropTypes.func,
};

export default ChatBox;
