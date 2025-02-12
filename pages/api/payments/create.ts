import { NextApiRequest, NextApiResponse } from "next";
// import { Stripe } from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { amount } = req.body; // 購入金額
    // Stripe Checkout セッション作成の例
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [{ price: "price_xxx", quantity: 1 }],
    //   mode: "payment",
    //   success_url: "https://yourapp.com/success",
    //   cancel_url: "https://yourapp.com/cancel",
    // });
    // return res.status(200).json({ url: session.url });

    // 今回は簡易的にモック
    return res.status(200).json({ url: "https://mock-payment-gateway" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
