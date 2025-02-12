import { NextApiRequest, NextApiResponse } from "next";
// import OpenAIなど
import { supabaseClient } from "../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // トレーナーのデータやユーザーの運動データを参照し、AI(例えばOpenAI API)で要約する例
    // const { data } = await supabaseClient.from("health_records").select("*");
    // const aiResponse = await openai.createCompletion(...);

    // 簡易例
    return res.status(200).json({ report: "AI生成レポートのサンプルです" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
