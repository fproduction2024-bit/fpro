import type { NextApiRequest, NextApiResponse } from 'next';
import { dbOperations } from '@/lib/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const boardId = parseInt(id as string, 10);

  if (isNaN(boardId)) {
    return res.status(400).json({ error: 'Invalid board ID' });
  }

  if (req.method === 'GET') {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const threads = dbOperations.getThreads(boardId, page, 20);
      res.status(200).json(threads);
    } catch (error) {
      console.error('Error fetching threads:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, name, content } = req.body;

      // バリデーション
      if (!title || typeof title !== 'string' || title.trim().length === 0 || title.length > 100) {
        return res.status(400).json({ error: 'Title is required and must be 1-100 characters' });
      }
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

      const sanitizedTitle = escapeHtml(title.trim());
      const sanitizedContent = escapeHtml(content.trim());
      const sanitizedName = name ? escapeHtml(name.trim()) || '名無し' : '名無し';

      const threadId = dbOperations.createThread(boardId, sanitizedTitle, sanitizedName, sanitizedContent);

      res.status(201).json({ threadId });
    } catch (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

