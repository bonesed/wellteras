import { useState, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // 既存メッセージをロード
    fetch("/api/community/chats")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const sendMessage = async () => {
    if (!text) return;
    const res = await fetch("/api/community/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      setText("");
      // 再読み込み
      fetch("/api/community/chats")
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  };

  return (
    <div>
      <h2>コミュニティチャット</h2>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.user_name}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>送信</button>
    </div>
  );
}
