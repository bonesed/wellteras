import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { supabaseClient } from "../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = session.user.id;

  if (req.method === "POST") {
    const { avatarUrl } = req.body;
    // ユーザーテーブルのavatar_urlを更新
    const { error } = await supabaseClient
      .from("users")
      .update({ avatar_url: avatarUrl })
      .eq("id", userId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ message: "Avatar updated" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

