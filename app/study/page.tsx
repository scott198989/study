'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { questions } from '@/lib/questions'
import { Question, Category } from '@/lib/types'
import { recordAnswer, toggleFlag, loadProgress, getWeakQuestionIds } from '@/lib/progress'
import QuestionRenderer from '@/components/questions/QuestionRenderer'
import ConceptPanel from '@/components/questions/ConceptPanel'
import NspirePanel from '@/components/calculator/NspirePanel'
import TutorPanel from '@/components/tutor/TutorPanel'

const CATEGORIES: Category[] = [
  'AC Fundamentals & Phasors',
  'Capacitors (DC Behavior)',
  'Capacitors (AC Behavior)',
  'Inductors (DC Behavior)',
  'Inductors (AC Behavior)',
  'Complex Numbers & Phasor Math',
  'Power Factor & AC Power',
]

function StudyContent() {
  const router = useRouter()
  const params = useSearchParams()
  const mode = params.get('mode') || 'study'
  const cat = params.get('cat') as Category | null

  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [tutorOpen, setTutorOpen] = useState(false)
  const [selectingCategory, setSelectingCategory] = useState(mode === 'category' && !cat)

  useEffect(() => {
    let qs = [...questions]

    if (mode === 'weakspots') {
      const progress = loadProgress()
      const weakIds = getWeakQuestionIds(progress)
      qs = questions.filter((q) => weakIds.includes(q.id))
      if (qs.length === 0) qs = questions.slice(0, 5)
    } else if (mode === 'category' && cat) {
      qs = questions.filter((q) => q.category === cat)
    }

    // Shuffle
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[qs[i], qs[j]] = [qs[j], qs[i]]
    }

    setFilteredQuestions(qs)
    setCurrentIdx(0)
    setAnswered(false)
  }, [mode, cat])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === 'c' || e.key === 'C') {
        // ConceptPanel toggle handled by component
      }
      if (e.key === 't' || e.key === 'T') {
        setTutorOpen((o) => !o)
      }
      if (e.key === 'ArrowRight' && answered) {
        nextQuestion()
      }
      if (e.key === 'ArrowLeft' && currentIdx > 0) {
        setCurrentIdx((i) => i - 1)
        setAnswered(false)
      }
      if (e.key === ' ') {
        e.preventDefault()
        if (!answered) setAnswered(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [answered, currentIdx])

  const handleAnswer = useCallback(
    (correct: boolean, format: string) => {
      const q = filteredQuestions[currentIdx]
      setAnswered(true)
      recordAnswer(q.id, correct, format)
    },
    [currentIdx, filteredQuestions]
  )

  const nextQuestion = () => {
    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx((i) => i + 1)
      setAnswered(false)
    }
  }

  if (selectingCategory) {
    return (
      <main className="min-h-screen px-4 py-8 max-w-lg mx-auto">
        <button onClick={() => router.push('/')} className="text-gray-500 hover:text-white text-sm mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white mb-6">Choose Category</h1>
        <div className="space-y-2">
          {CATEGORIES.map((c) => {
            const count = questions.filter((q) => q.category === c).length
            return (
              <button
                key={c}
                onClick={() => {
                  setSelectingCategory(false)
                  router.push(`/study?mode=category&cat=${encodeURIComponent(c)}`)
                }}
                className="w-full text-left px-4 py-3 bg-surface/50 border border-border rounded-lg hover:border-tutor-accent transition-colors"
              >
                <span className="text-white">{c}</span>
                <span className="float-right text-gray-500 text-sm">{count} Qs</span>
              </button>
            )
          })}
        </div>
      </main>
    )
  }

  if (filteredQuestions.length === 0) {
    return (
      <main className="min-h-screen px-4 py-8 max-w-lg mx-auto text-center">
        <p className="text-gray-400 mt-20">No questions found for this filter.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-surface border border-border rounded text-gray-300"
        >
          Home
        </button>
      </main>
    )
  }

  const currentQ = filteredQuestions[currentIdx]

  return (
    <main className="min-h-screen px-4 py-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push('/')} className="text-gray-500 hover:text-white text-sm">
          ← Back
        </button>
        <span className="text-sm text-gray-500">
          {mode === 'weakspots' && 'Weak Spots · '}
          {mode === 'category' && cat && `${cat} · `}
          {currentIdx + 1}/{filteredQuestions.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => toggleFlag(currentQ.id)}
            className="text-flagged/60 hover:text-flagged text-sm"
            title="Flag"
          >
            ⚑
          </button>
          <button
            onClick={() => setTutorOpen(true)}
            className="text-tutor-accent/60 hover:text-tutor-accent text-sm"
            title="Tutor (T)"
          >
            AI
          </button>
        </div>
      </div>

      <QuestionRenderer
        question={currentQ}
        onAnswer={handleAnswer}
        showConceptBefore={true}
        showResult={answered}
      />

      <ConceptPanel concept={currentQ.concept} defaultOpen={true} />

      {currentQ.nspireSteps && (
        <NspirePanel guide={currentQ.nspireSteps} defaultOpen={currentQ.calculatorRequired} />
      )}

      {answered && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              if (currentIdx > 0) {
                setCurrentIdx((i) => i - 1)
                setAnswered(false)
              }
            }}
            disabled={currentIdx === 0}
            className="px-4 py-2 text-gray-500 hover:text-white disabled:opacity-30"
          >
            ← Prev
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentIdx + 1 >= filteredQuestions.length}
            className="px-6 py-2 bg-calc-accent text-black font-semibold rounded-lg hover:bg-calc-accent/80 disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}

      <TutorPanel question={currentQ} isOpen={tutorOpen} onClose={() => setTutorOpen(false)} />
    </main>
  )
}

export default function StudyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <StudyContent />
    </Suspense>
  )
}
