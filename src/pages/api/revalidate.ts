// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    await res.revalidate("/products/static");
    return res.status(200).json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ revalidated: false });
  }
}
