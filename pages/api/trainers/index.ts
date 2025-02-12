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
    // トレーナー本人の情報を取得
    const { data, error } = await supabaseClient
      .from("trainers")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    // トレーナープロフィールを作成/更新
    const { specialty, price_per_session } = req.body;
    const { data, error } = await supabaseClient
      .from("trainers")
      .upsert({
        user_id: userId,
        specialty,
        price_per_session,
      })
      .eq("user_id", userId)
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
