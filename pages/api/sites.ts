import { getAllSites } from '@/lib/db-admin';
import db from '@/lib/firebase-admin';

export default async function handler(_: any, res: any) {
  const { sites, error } = await getAllSites();

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json({ sites });
  }
}
