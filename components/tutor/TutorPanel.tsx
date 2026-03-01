'use client'

import { useState, useRef, useEffect } from 'react'
import { Question } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  question?: Question
  isOpen: boolean
  onClose: () => void
}

const SUGGESTED_PROMPTS = [
  'Explain this concept from scratch',
  'Walk me through the Nspire steps',
  'Why is the wrong answer wrong?',
  'Give me a similar practice problem',
  "What's the physical intuition here?",
]

export default function TutorPanel({ question, isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [tokenCount, setTokenCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || streaming) return

    const userMsg: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setStreaming(true)

    const assistantMsg: Message = { role: 'assistant', content: '' }
    setMessages((prev) => [...prev, assistantMsg])

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          questionContext: question
            ? `Q${question.originalNumber}: ${question.text}\nCorrect: ${question.correctAnswer}${question.knownBadQuestion ? `\nKnown issue: ${question.correctAnswerNote}` : ''}`
            : undefined,
          history: messages.slice(-10),
        }),
      })

      if (!res.ok) {
        throw new Error(`Tutor API error: ${res.status}`)
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let fullContent = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          fullContent += chunk
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              role: 'assistant',
              content: fullContent,
            }
            return updated
          })
        }
        setTokenCount((prev) => prev + Math.ceil(fullContent.length / 4))
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Error connecting to tutor. Check your API key.',
        }
        return updated
      })
    } finally {
      setStreaming(false)
    }
  }

  const estimatedCost = (tokenCount / 1000000) * 3
  const budgetRemaining = Math.max(0, 50 - estimatedCost)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-bg border-l border-tutor-accent/30 z-50 flex flex-col"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-tutor-accent">
                Claude Tutor
              </h3>
              <p className="text-xs text-gray-500">
                ~${budgetRemaining.toFixed(2)} remaining
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white text-lg px-2"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-gray-500 text-sm">
                  Ask me about this question or any AC circuits concept.
                </p>
                <div className="space-y-1">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="block w-full text-left px-3 py-2 text-sm text-tutor-accent/80 bg-tutor-accent/5 border border-tutor-accent/10 rounded hover:bg-tutor-accent/10 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm ${
                  msg.role === 'user'
                    ? 'text-white bg-surface/50 px-3 py-2 rounded-lg ml-8'
                    : 'text-gray-300'
                }`}
              >
                <div className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
                  {msg.content}
                  {streaming && i === messages.length - 1 && msg.role === 'assistant' && (
                    <span className="animate-pulse text-tutor-accent">▊</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask the tutor..."
                className="flex-1 px-3 py-2 bg-surface border border-border rounded text-sm text-white placeholder-gray-500 focus:border-tutor-accent focus:outline-none"
                disabled={streaming}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={streaming || !input.trim()}
                className="px-4 py-2 bg-tutor-accent text-black text-sm font-semibold rounded disabled:opacity-30 hover:bg-tutor-accent/80 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
