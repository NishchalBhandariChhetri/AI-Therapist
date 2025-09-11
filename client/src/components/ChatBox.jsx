function ChatBox({ chat, setChat }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat.messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setInput("");

    const newMessages = [...chat.messages, { sender: "user", text: userInput }];
    setChat({ ...chat, messages: newMessages });

    setIsTyping(true);

    try {
      const res = await sendMessage(userInput);

      setIsTyping(false);
      setChat({
        ...chat,
        messages: [
          ...newMessages,
          { sender: "bot", text: res.reply || "⚠️ Error: " + res.error },
        ],
      });
    } catch (err) {
      setIsTyping(false);
      setChat({
        ...chat,
        messages: [
          ...newMessages,
          { sender: "bot", text: "⚠️ Failed to get a response." },
        ],
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
      <h2 className="text-xl font-bold mb-4">{chat.title}</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4 rounded">
        {chat.messages.map((msg, i) => (
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
