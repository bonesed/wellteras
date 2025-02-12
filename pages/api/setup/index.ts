import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { supabaseClient } from "../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") {
    const { bodyType, goal, activity } = req.body;
    // user_profiles などのテーブルに保存する例
    const { data, error } = await supabaseClient
      .from("user_profiles")
      .upsert({
        user_id: session.user.id,
        body_type: bodyType,
        goal,
        activity_level: activity,
      }, { onConflict: "user_id" });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
