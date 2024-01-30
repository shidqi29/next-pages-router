// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  message: string;
};

/**
 * Handles the registration API request.
 * 
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the response to be sent.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    await signUp(req.body, ({ status, message }: Data) => {
      if (status) {
        res.status(200).json({ status, message });
      } else {
        res.status(400).json({ status, message });
      }
    });
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
