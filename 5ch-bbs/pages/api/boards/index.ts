import type { NextApiRequest, NextApiResponse } from 'next';
import { dbOperations } from '@/lib/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const boards = dbOperations.getBoards();
    res.status(200).json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

