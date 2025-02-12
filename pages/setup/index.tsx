import { useState } from "react";

export default function SetupPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ bodyType: "", goal: "", activity: "" });

  const questions = [
    { key: "bodyType", text: "現在の体型を教えてください" },
    { key: "goal", text: "あなたの目標は何ですか？" },
    { key: "activity", text: "日々のアクティビティレベルは？ (低/中/高)" },
  ];

  const handleNext = async () => {
    if (step === questions.length - 1) {
      // すべての回答を送信
      await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      // プロフィール画面やトップページなどにリダイレクト
      window.location.href = "/health-records";
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div>
      <h1>初期登録</h1>
      <p>{questions[step].text}</p>
      <input
        value={answers[questions[step].key]}
        onChange={(e) =>
          setAnswers({ ...answers, [questions[step].key]: e.target.value })
        }
      />
      <button onClick={handleNext}>
        {step === questions.length - 1 ? "完了" : "次へ"}
      </button>
    </div>
  );
}
