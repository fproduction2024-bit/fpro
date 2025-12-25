import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
            <MessageSquare className="h-8 w-8" />
            <span>5ch風掲示板</span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>© 2024 5ch風掲示板 - 匿名で自由に議論できる掲示板</p>
        </div>
      </footer>
    </div>
  )
}

