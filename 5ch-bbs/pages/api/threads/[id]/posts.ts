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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // スレッドの存在確認
    const thread = dbOperations.getThread(threadId);
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }

    const { name, content } = req.body;

    // バリデーション
    if (!content || typeof content !== 'string' || content.trim().length === 0 || content.length > 1000) {
      return res.status(400).json({ error: 'Content is required and must be 1-1000 characters' });
    }
    if (name && (typeof name !== 'string' || name.length > 30)) {
      return res.status(400).json({ error: 'Name must be 30 characters or less' });
    }

    // HTMLエスケープ処理（簡易版）
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const sanitizedContent = escapeHtml(content.trim());
    const sanitizedName = name ? escapeHtml(name.trim()) || '名無し' : '名無し';

    const postId = dbOperations.createPost(threadId, sanitizedName, sanitizedContent);

    res.status(201).json({ postId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

