import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, MessageSquare, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

interface Post {
  id: number
  thread_id: number
  name: string
  content: string
  created_at: string
}

interface Thread {
  id: number
  board_id: number
  title: string
  created_at: string
  updated_at: string
}

interface Board {
  id: number
  name: string
}

export default function ThreadPage() {
  const router = useRouter()
  const { id } = router.query
  const threadId = parseInt(id as string, 10)

  const [thread, setThread] = useState<Thread | null>(null)
  const [board, setBoard] = useState<Board | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!id || isNaN(threadId)) return

    fetchThread()
  }, [id, threadId])

  const fetchThread = async () => {
    try {
      const res = await fetch(`/api/threads/${threadId}`)
      if (!res.ok) {
        throw new Error('Thread not found')
      }
      const data = await res.json()
      setThread(data.thread)
      setPosts(data.posts)

      // 板情報を取得
      fetch('/api/boards')
        .then(res => res.json())
        .then((boards: Board[]) => {
          const foundBoard = boards.find(b => b.id === data.thread.board_id)
          setBoard(foundBoard || null)
        })

      setLoading(false)
    } catch (err) {
      console.error('Error fetching thread:', err)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch(`/api/threads/${threadId}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setDialogOpen(false)
        setFormData({ name: '', content: '' })
        // スレッド情報を再取得
        await fetchThread()
      } else {
        const error = await res.json()
        alert(error.error || '投稿に失敗しました')
      }
    } catch (err) {
      console.error('Error creating post:', err)
      alert('投稿に失敗しました')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ja-JP')
  }

  const formatContent = (content: string) => {
    // 改行を保持
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-muted-foreground">読み込み中...</div>
      </div>
    )
  }

  if (!thread) {
    return (
      <div>
        <p className="text-destructive">スレッドが見つかりません</p>
        <Link href="/">
          <Button variant="outline" className="mt-4">板一覧に戻る</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link href={board ? `/boards/${board.id}` : '/'}>
          <Button variant="ghost" size="sm" className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {board ? board.name : '板一覧'}に戻る
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{thread.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              スレッド番号: {thread.id} | 作成日時: {formatDate(thread.created_at)}
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                レス投稿
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>レス投稿</DialogTitle>
                  <DialogDescription>
                    スレッドにレスを投稿します。本文は必須です。
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
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
                      placeholder="レス内容"
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
                    {submitting ? '投稿中...' : '投稿'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{post.id}</span>
                    <span className="font-semibold">{post.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(post.created_at)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {formatContent(post.content)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>まだ投稿がありません。</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

