'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadProgress, getStats } from '@/lib/progress'
import { motion } from 'framer-motion'

const TOTAL_QUESTIONS = 109

const modes = [
  {
    title: 'Quiz Mode',
    description: 'Timed quiz with score tracking. No concept panels until after answering.',
    href: '/quiz',
    color: 'bg-correct/10 border-correct/30 hover:border-correct',
    icon: '⏱',
  },
  {
    title: 'Study Mode',
    description: 'Untimed with concept panels, tutor access, and Nspire guides.',
    href: '/study',
    color: 'bg-calc-accent/10 border-calc-accent/30 hover:border-calc-accent',
    icon: '📖',
  },
  {
    title: 'Weak Spots',
    description: 'Review questions you got wrong or flagged for review.',
    href: '/study?mode=weakspots',
    color: 'bg-wrong/10 border-wrong/30 hover:border-wrong',
    icon: '🎯',
  },
  {
    title: 'Category Drill',
    description: 'Focus on a specific topic area.',
    href: '/study?mode=category',
    color: 'bg-tutor-accent/10 border-tutor-accent/30 hover:border-tutor-accent',
    icon: '📂',
  },
  {
    title: 'Calculator Drill',
    description: 'Practice TI-Nspire CX II steps on calculation-heavy questions.',
    href: '/calculator',
    color: 'bg-flagged/10 border-flagged/30 hover:border-flagged',
    icon: '🔢',
  },
]

export default function Home() {
  const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null)

  useEffect(() => {
    const progress = loadProgress()
    setStats(getStats(progress, TOTAL_QUESTIONS))
  }, [])

  return (
    <main className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-1">
          AC Circuits Exam Prep
        </h1>
        <p className="text-gray-500 text-sm">
          109 questions &middot; Capacitors &middot; Inductors &middot; Phasors &middot; Power Factor
        </p>
      </motion.div>

      {stats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8"
        >
          <DashCard label="Correct" value={`${stats.overallPercent}%`} color="text-correct" />
          <DashCard label="Attempted" value={`${stats.attempted}/${stats.totalQuestions}`} color="text-calc-accent" />
          <DashCard label="Weak Spots" value={String(stats.weakSpots.length)} color="text-wrong" />
          <DashCard label="Streak" value={`${stats.streak}d`} color="text-flagged" />
          <DashCard label="Readiness" value={`${stats.readiness}%`} color="text-tutor-accent" />
        </motion.div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {modes.map((mode, i) => (
          <motion.div
            key={mode.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <Link href={mode.href} className={`block p-4 rounded-lg border transition-all ${mode.color}`}>
              <div className="text-2xl mb-2">{mode.icon}</div>
              <h2 className="font-semibold text-white mb-1">{mode.title}</h2>
              <p className="text-sm text-gray-400">{mode.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-xs text-gray-600"
      >
        <p>
          Shortcuts: <Kbd>Space</Kbd> show answer &middot; <Kbd>C</Kbd> concept &middot;{' '}
          <Kbd>N</Kbd> Nspire &middot; <Kbd>T</Kbd> tutor &middot; <Kbd>←→</Kbd> navigate
        </p>
      </motion.div>
    </main>
  )
}

function DashCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-surface/50 border border-border rounded-lg p-3 text-center">
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-gray-400 font-mono">
      {children}
    </kbd>
  )
}
