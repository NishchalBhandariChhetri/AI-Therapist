import { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { sender: "bot", text: data.reply };

    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
      <h2 className="text-xl font-bold mb-4">AI Therapist</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4 rounded">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === "user" ? "text-right mb-2" : "text-left mb-2"}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-grow border rounded-l-lg px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Share your thoughts..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
