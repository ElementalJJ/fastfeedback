import { getAllFeedback } from '@/lib/db-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const siteId = req.query.siteId;
  const { feedback, error } = await getAllFeedback(siteId);

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json({ feedback });
  }
}
