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
    // すべてのメッセージを返す（または最新N件）
    const { data, error } = await supabaseClient
      .from("community_chats")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { text } = req.body;
    // user情報を取得
    const { data: userData, error: userError } = await supabaseClient
      .from("users")
      .select("name")
      .eq("id", userId)
      .single();
    if (userError) return res.status(500).json({ error: userError.message });

    const { data, error } = await supabaseClient.from("community_chats").insert([
      {
        user_id: userId,
        user_name: userData.name,
        text,
      },
    ]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  return res.status(405).json({ message: "Method not allowed" });
}
