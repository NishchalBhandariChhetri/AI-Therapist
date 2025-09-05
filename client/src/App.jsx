import React, { useState } from "react";
import { sendMessage } from "./api";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSend = async () => {
    const data = await sendMessage(message);
    setReply(data.reply);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Therapist</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>

      {reply && (
        <div style={{ marginTop: "20px" }}>
          <strong>AI:</strong> {reply}
        </div>
      )}
    </div>
  );
}

export default App;
