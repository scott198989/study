'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/lib/questions'
import { Question, Category } from '@/lib/types'
import { recordAnswer, toggleFlag, saveSession, loadProgress } from '@/lib/progress'
import QuestionRenderer from '@/components/questions/QuestionRenderer'
import ConceptPanel from '@/components/questions/ConceptPanel'
import { motion } from 'framer-motion'

type TimerSetting = 60 | 120 | 0

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuizPage() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [timerSetting, setTimerSetting] = useState<TimerSetting>(120)
  const [questionCount, setQuestionCount] = useState(20)
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [results, setResults] = useState<{ qId: number; correct: boolean; category: Category }[]>([])
  const [finished, setFinished] = useState(false)
  const [startTime] = useState(Date.now())
  const progress = loadProgress()

  useEffect(() => {
    if (!started || timerSetting === 0 || answered) return
    setTimeLeft(timerSetting)
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval)
          setAnswered(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [started, currentIdx, timerSetting, answered])

  const startQuiz = () => {
    const shuffled = shuffle(questions).slice(0, questionCount)
    setQuizQuestions(shuffled)
    setStarted(true)
  }

  const handleAnswer = useCallback(
    (correct: boolean, format: string) => {
      const q = quizQuestions[currentIdx]
      setAnswered(true)
      recordAnswer(q.id, correct, format)
      setResults((prev) => [...prev, { qId: q.id, correct, category: q.category }])
    },
    [currentIdx, quizQuestions]
  )

  const nextQuestion = () => {
    if (currentIdx + 1 >= quizQuestions.length) {
      finishQuiz()
      return
    }
    setCurrentIdx((i) => i + 1)
    setAnswered(false)
  }

  const finishQuiz = () => {
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {}
    for (const r of results) {
      if (!categoryBreakdown[r.category]) {
        categoryBreakdown[r.category] = { correct: 0, total: 0 }
      }
      categoryBreakdown[r.category].total += 1
      if (r.correct) categoryBreakdown[r.category].correct += 1
    }
    saveSession({
      date: new Date().toISOString(),
      mode: 'quiz',
      score: results.filter((r) => r.correct).length,
      total: results.length,
      durationMs: Date.now() - startTime,
      categoryBreakdown,
    })
    setFinished(true)
  }

  const currentQ = quizQuestions[currentIdx]

  if (finished) {
    const correct = results.filter((r) => r.correct).length
    const catMap: Record<string, { correct: number; total: number }> = {}
    for (const r of results) {
      if (!catMap[r.category]) catMap[r.category] = { correct: 0, total: 0 }
      catMap[r.category].total += 1
      if (r.correct) catMap[r.category].correct += 1
    }

    return (
      <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl font-bold text-white mb-4">Quiz Complete</h1>
          <div className="text-5xl font-bold font-mono text-center my-8">
            <span className={correct / results.length >= 0.7 ? 'text-correct' : 'text-wrong'}>
              {correct}
            </span>
            <span className="text-gray-500">/{results.length}</span>
          </div>
          <div className="space-y-2 mb-8">
            {Object.entries(catMap).map(([cat, s]) => (
              <div key={cat} className="flex justify-between text-sm px-3 py-2 bg-surface/50 rounded">
                <span className="text-gray-300">{cat}</span>
                <span className={s.correct / s.total >= 0.7 ? 'text-correct' : 'text-wrong'}>
                  {s.correct}/{s.total}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-surface border border-border rounded text-gray-300 hover:bg-surface/80"
            >
              Home
            </button>
            <button
              onClick={() => {
                setFinished(false)
                setStarted(false)
                setResults([])
                setCurrentIdx(0)
                setAnswered(false)
              }}
              className="px-4 py-2 bg-calc-accent text-black font-semibold rounded hover:bg-calc-accent/80"
            >
              New Quiz
            </button>
          </div>
        </motion.div>
      </main>
    )
  }

  if (!started) {
    return (
      <main className="min-h-screen px-4 py-8 max-w-lg mx-auto">
        <button onClick={() => router.push('/')} className="text-gray-500 hover:text-white text-sm mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white mb-6">Quiz Setup</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Timer per question</label>
            <div className="flex gap-2">
              {([60, 120, 0] as TimerSetting[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimerSetting(t)}
                  className={`px-4 py-2 rounded border text-sm ${
                    timerSetting === t
                      ? 'border-calc-accent bg-calc-accent/10 text-white'
                      : 'border-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {t === 0 ? 'No limit' : `${t}s`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Questions</label>
            <div className="flex gap-2">
              {[10, 20, 50, 109].map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`px-4 py-2 rounded border text-sm ${
                    questionCount === n
                      ? 'border-calc-accent bg-calc-accent/10 text-white'
                      : 'border-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {n === 109 ? 'All' : n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full mt-4 px-6 py-3 bg-correct text-black font-bold rounded-lg text-lg hover:bg-correct/80 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-500">
          {currentIdx + 1}/{quizQuestions.length}
        </span>
        <div className="flex items-center gap-3">
          {timerSetting > 0 && (
            <span className={`font-mono text-sm ${timeLeft <= 10 ? 'text-wrong' : 'text-gray-400'}`}>
              {timeLeft}s
            </span>
          )}
          <button
            onClick={() => {
              toggleFlag(currentQ.id)
            }}
            className="text-flagged/60 hover:text-flagged text-sm"
            title="Flag for review"
          >
            ⚑
          </button>
        </div>
      </div>

      <QuestionRenderer
        question={currentQ}
        onAnswer={handleAnswer}
        showResult={answered}
      />

      {answered && (
        <ConceptPanel concept={currentQ.concept} defaultOpen={false} />
      )}

      {answered && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-calc-accent text-black font-semibold rounded-lg hover:bg-calc-accent/80"
          >
            {currentIdx + 1 >= quizQuestions.length ? 'Finish' : 'Next →'}
          </button>
        </div>
      )}
    </main>
  )
}
