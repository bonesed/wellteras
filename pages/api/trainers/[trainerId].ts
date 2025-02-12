import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { trainerId } = req.query;

  if (req.method === "GET") {
    // trainerIdに紐づくトレーナー情報を返す
    const { data, error } = await supabaseClient
      .from("trainers")
      .select("*, user:users(*)") // JOINしてユーザー情報を取得
      .eq("id", trainerId)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

