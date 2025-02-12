import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    // 新規商品登録 (管理者や出店者用)
    const { name, description, price, image_url } = req.body;
    const { data, error } = await supabaseClient.from("products").insert([
      {
        name,
        description,
        price,
        image_url,
      },
    ]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
