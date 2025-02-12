import { useEffect, useState } from "react";

export default function AdminPage() {
  const [featureFlags, setFeatureFlags] = useState([]);

  useEffect(() => {
    fetch("/api/admin/feature-flags")
      .then((res) => res.json())
      .then((data) => setFeatureFlags(data));
  }, []);

  const toggleFeature = async (feature_key) => {
    await fetch("/api/admin/feature-flags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feature_key }),
    });
    // 再読み込み
    const res = await fetch("/api/admin/feature-flags");
    const updated = await res.json();
    setFeatureFlags(updated);
  };

  return (
    <div>
      <h1>管理画面</h1>
      <h2>機能フラグ</h2>
      {featureFlags.map((flag) => (
        <div key={flag.id}>
          <label>{flag.feature_key}</label>
          <input
            type="checkbox"
            checked={flag.is_enabled}
            onChange={() => toggleFeature(flag.feature_key)}
          />
        </div>
      ))}
    </div>
  );
}
