import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../lib/supabaseClient";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  const userId = session.user.id;

  if (req.method === "POST") {
    const { trainerId } = req.body;
    // マッチング作成
    const { data, error } = await supabaseClient.from("matchings").insert([
      {
        user_id: userId,
        trainer_id: trainerId,
        status: "requested",
      },
    ]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
