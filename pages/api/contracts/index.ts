import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { supabaseClient } from "../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") {
    const { trainerId, contractText } = req.body;
    const { data, error } = await supabaseClient.from("contracts").insert([
      {
        user_id: session.user.id,
        trainer_id: trainerId,
        contract_text: contractText,
        signed_at: new Date(),
      },
    ]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
