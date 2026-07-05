import type { NextApiRequest, NextApiResponse } from 'next';
import { dbOperations } from '@/lib/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const threadId = parseInt(id as string, 10);

  if (isNaN(threadId)) {
    return res.status(400).json({ error: 'Invalid thread ID' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 50;

    // スレッド情報を取得
    const thread = dbOperations.getThread(threadId);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }

    // レス一覧を取得
    const posts = dbOperations.getPosts(threadId, page, limit);

    // 総レス数を取得
    const totalPosts = dbOperations.getPostCount(threadId);

    res.status(200).json({
      thread,
      posts,
      totalPosts,
      page,
      totalPages: Math.ceil(totalPosts / limit)
    });
  } catch (error) {
    console.error('Error fetching thread:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

