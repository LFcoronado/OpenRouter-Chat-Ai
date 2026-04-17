import { useState, useRef } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";

function App() {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const readerRef = useRef(null);

  const [chatId, setChatId] = useState(() => Date.now());

const [chats, setChats] = useState(() => {
  const id = Date.now();
  return {
    [id]: []
  };
});

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };

    const updatedChats = {
      ...chats,
      [chatId]: [...(chats[chatId] || []), userMessage]
    };

    setChats(updatedChats);

    setMessage("");
    setLoading(true);

    const res = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, chatId })
    });

    const reader = res.body.getReader();
    readerRef.current = reader;

    const decoder = new TextDecoder();

    let aiMessage = "";

    while (true) {

      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);

      aiMessage += chunk;

      setChats({
        ...updatedChats,
        [chatId]: [
          ...(updatedChats[chatId] || []),
          { role: "assistant", content: aiMessage }
        ]
      });

    }

    setLoading(false);

  };

  const stopResponse = () => {

    if(readerRef.current){
      readerRef.current.cancel();
      setLoading(false);
    }

  };

  

  return (
  <div className="layout">

    <div className="sidebar">

      <button
        className="new-chat"
        onClick={() => {
          const id = Date.now();
          setChats({ ...chats, [id]: [] });
          setChatId(id);
        }}
      >
        + Nuevo chat
      </button>

      {Object.keys(chats).map((id) => {
        const firstMessage = chats[id][0]?.content || "Nuevo chat";

        return (
          <div
            key={id}
            className={`chat-item ${chatId == id ? "active" : ""}`}
            onClick={() => setChatId(id)}
          >
            {firstMessage.slice(0, 30)}
          </div>
        );
      })}

    </div>

    <div className="main">

      <div className={`chatContainer ${chats[chatId]?.length === 0 ? "empty" : ""}`}>

        {(chats[chatId] || []).map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="message assistant typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

      </div>

      <div className="inputContainer">

  <div className="inputWrapper">

    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Escribe un mensaje..."
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />

    {loading ? (
      <button onClick={stopResponse}>■</button>
    ) : (
      <button onClick={sendMessage}></button>
    )}

  </div>

</div>

    </div>

  </div>
);
}

export default App;