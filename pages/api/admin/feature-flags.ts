import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../lib/supabaseClient";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  // 管理者かどうか確認
  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (req.method === "GET") {
    const { data, error } = await supabaseClient
      .from("feature_flags")
      .select("*");
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { feature_key } = req.body;
    // 現在の値を取得してトグル
    const { data: current } = await supabaseClient
      .from("feature_flags")
      .select("is_enabled")
      .eq("feature_key", feature_key)
      .single();
    const newValue = !current.is_enabled;

    const { data, error } = await supabaseClient
      .from("feature_flags")
      .update({ is_enabled: newValue })
      .eq("feature_key", feature_key);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
