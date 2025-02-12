import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TrainerDetail() {
  const router = useRouter();
  const { trainerId } = router.query;
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    if (trainerId) {
      fetch(`/api/trainers/${trainerId}`)
        .then((res) => res.json())
        .then((data) => setTrainer(data));
    }
  }, [trainerId]);

  const handleMatchingRequest = async () => {
    const res = await fetch("/api/matching/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trainerId }),
    });
    if (res.ok) {
      alert("マッチングリクエストを送信しました。");
    }
  };

  if (!trainer) return <div>読み込み中...</div>;

  return (
    <div>
      <h1>{trainer.user?.name} さんのプロフィール</h1>
      <p>専門分野: {trainer.specialty}</p>
      <p>料金: {trainer.price_per_session}円/セッション</p>
      <button onClick={handleMatchingRequest}>予約リクエスト</button>
    </div>
  );
}
