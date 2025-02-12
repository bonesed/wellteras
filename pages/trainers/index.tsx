import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TrainersManagement() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({ specialty: "", price_per_session: 0 });

  useEffect(() => {
    // 現在のトレーナープロフィールをロード
    fetch("/api/trainers")
      .then((res) => res.json())
      .then((data) => {
        if (data) setProfile(data);
      });
  }, []);

  const handleSave = async () => {
    await fetch("/api/trainers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
  };

  return (
    <div>
      <h1>トレーナー管理画面</h1>
      <label>専門分野</label>
      <input
        type="text"
        value={profile.specialty}
        onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
      />
      <label>1セッションあたりの料金</label>
      <input
        type="number"
        value={profile.price_per_session}
        onChange={(e) =>
          setProfile({ ...profile, price_per_session: Number(e.target.value) })
        }
      />
      <button onClick={handleSave}>保存</button>
    </div>
  );
}
