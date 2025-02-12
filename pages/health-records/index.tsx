import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import HealthRecordForm from "../../components/HealthRecordForm";

export default function HealthRecordsPage() {
  const { data: session } = useSession();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // APIから記録を取得
    fetch("/api/health-records")
      .then((res) => res.json())
      .then((data) => setRecords(data));
  }, []);

  return (
    <div>
      <h1>健康記録</h1>
      <HealthRecordForm />
      <div>
        {records.map((record) => (
          <div key={record.id}>
            <p>日付: {record.recorded_at}</p>
            <p>体重: {record.weight} kg</p>
            <p>体脂肪率: {record.body_fat} %</p>
            <p>運動時間: {record.exercise_minutes} 分</p>
          </div>
        ))}
      </div>
    </div>
  );
}
