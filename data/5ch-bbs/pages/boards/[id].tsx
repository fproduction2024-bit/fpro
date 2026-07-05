import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Plus, MessageSquare, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface Thread {
  id: number
  board_id: number
  title: string
  created_at: string
  updated_at: string
  post_count: number
}

interface Board {
  id: number
  name: string
  description: string
}

export default function BoardPage() {
  const router = useRouter()
  const { id } = router.query
  const boardId = parseInt(id as string, 10)

  const [board, setBoard] = useState<Board | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ title: '', name: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!id || isNaN(boardId)) return

    // 板情報を取得
    fetch('/api/boards')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch boards')
        return res.json()
      })
      .then((boards: Board[]) => {
        const foundBoard = boards.find(b => b.id === boardId)
        setBoard(foundBoard || null)
      })
      .catch(err => {
        console.error('Error fetching boards:', err)
      })

    // スレッド一覧を取得
    fetch(`/api/boards/${boardId}/threads`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch threads')
        return res.json()
      })
      .then(data => {
        // データが配列であることを保証
        if (Array.isArray(data)) {
          setThreads(data)
        } else {
          console.error('Invalid data format:', data)
          setThreads([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching threads:', err)
        setThreads([])
        setLoading(false)
      })
  }, [id, boardId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch(`/api/boards/${boardId}/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const data = await res.json()
        setDialogOpen(false)
        setFormData({ title: '', name: '', content: '' })
        router.push(`/threads/${data.threadId}`)
      } else {
        const error = await res.json()
        alert(error.error || 'スレッドの作成に失敗しました')
      }
    } catch (err) {
      console.error('Error creating thread:', err)
      alert('スレッドの作成に失敗しました')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
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

  if (!board) {
    return (
      <div>
        <p className="text-destructive">板が見つかりません</p>
        <Link href="/">
          <Button variant="outline" className="mt-4">板一覧に戻る</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              板一覧に戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{board.name}</h1>
          <p className="text-muted-foreground mt-1">{board.description}</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新規スレッド作成
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>新規スレッド作成</DialogTitle>
                <DialogDescription>
                  新しいスレッドを作成します。タイトルと本文は必須です。
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">タイトル *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="スレッドタイトル"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">名前（任意）</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="名無し"
                    maxLength={30}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">本文 *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="スレッドの最初の投稿"
                    rows={6}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? '作成中...' : '作成'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!Array.isArray(threads) || threads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>まだスレッドがありません。最初のスレッドを作成しましょう！</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {threads.map((thread, index) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/threads/${thread.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{thread.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>レス数: {thread.post_count}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>最終更新: {formatDate(thread.updated_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

