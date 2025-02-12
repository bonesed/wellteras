import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AvatarPage() {
  const { data: session } = useSession();
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    // Cloudinary へのアップロード（例: 署名付きURL or 直接Upload API）
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    const res = await fetch("https://api.cloudinary.com/v1_1/<cloud_name>/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      setAvatarUrl(data.secure_url);
    }
  };

  const handleSave = async () => {
    // ユーザーのアバターURLをDBに保存
    await fetch("/api/avatars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatarUrl }),
    });
  };

  return (
    <div>
      <h1>アバターカスタマイズ</h1>
      <input type="file" onChange={handleUpload} />
      {avatarUrl && <img src={avatarUrl} alt="avatar preview" width={150} />}
      <button onClick={handleSave}>保存</button>
    </div>
  );
}
