import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface Board {
  id: number
  name: string
  description: string
  thread_count: number
  last_post_at: string | null
}

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/boards')
      .then(res => res.json())
      .then(data => {
        setBoards(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching boards:', err)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '投稿なし'
    const date = new Date(dateString)
    return date.toLocaleString('ja-JP')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-muted-foreground">読み込み中...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">板一覧</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {boards.map((board, index) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/boards/${board.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    {board.name}
                  </CardTitle>
                  <CardDescription>{board.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>スレッド数: {board.thread_count}</div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>最終投稿: {formatDate(board.last_post_at)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

