import { useState } from "react";

export default function AIConsultingPage() {
  const [report, setReport] = useState("");

  const handleGenerateReport = async () => {
    const res = await fetch("/api/ai/report");
    if (res.ok) {
      const data = await res.json();
      setReport(data.report);
    }
  };

  return (
    <div>
      <h1>AIコンサルティング</h1>
      <button onClick={handleGenerateReport}>レポート生成</button>
      {report && <div>{report}</div>}
    </div>
  );
}
