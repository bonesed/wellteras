import { useState } from "react";

export default function HealthRecordForm() {
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [exerciseMinutes, setExerciseMinutes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/health-records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, bodyFat, exerciseMinutes }),
    });
    if (res.ok) {
      // 成功時の処理
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>体重:</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <label>体脂肪率:</label>
      <input
        type="number"
        value={bodyFat}
        onChange={(e) => setBodyFat(e.target.value)}
      />
      <label>運動時間(分):</label>
      <input
        type="number"
        value={exerciseMinutes}
        onChange={(e) => setExerciseMinutes(e.target.value)}
      />
      <button type="submit">記録</button>
    </form>
  );
}
