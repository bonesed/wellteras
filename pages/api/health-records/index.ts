import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { supabaseClient } from "../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = session.user.id;

  if (req.method === "GET") {
    // GET: ユーザーの健康記録を取得
    const { data, error } = await supabaseClient
      .from("health_records")
      .select("*")
      .eq("user_id", userId)
      .order("recorded_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    // POST: 新規記録の保存
    const { weight, bodyFat, exerciseMinutes } = req.body;
    const { data, error } = await supabaseClient.from("health_records").insert([
      {
        user_id: userId,
        weight,
        body_fat: bodyFat,
        exercise_minutes: exerciseMinutes,
        recorded_at: new Date(),
      },
    ]);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

