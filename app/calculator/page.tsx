'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/lib/questions'
import { Question } from '@/lib/types'
import { recordAnswer } from '@/lib/progress'
import QuestionRenderer from '@/components/questions/QuestionRenderer'
import NspirePanel from '@/components/calculator/NspirePanel'
import ConceptPanel from '@/components/questions/ConceptPanel'

export default function CalculatorDrillPage() {
  const router = useRouter()
  const [calcQuestions, setCalcQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    const cqs = questions.filter((q) => q.calculatorRequired && q.nspireSteps)
    // Shuffle
    for (let i = cqs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[cqs[i], cqs[j]] = [cqs[j], cqs[i]]
    }
    setCalcQuestions(cqs)
  }, [])

  const handleAnswer = useCallback(
    (correct: boolean, format: string) => {
      const q = calcQuestions[currentIdx]
      setAnswered(true)
      recordAnswer(q.id, correct, format)
    },
    [currentIdx, calcQuestions]
  )

  const nextQuestion = () => {
    if (currentIdx + 1 < calcQuestions.length) {
      setCurrentIdx((i) => i + 1)
      setAnswered(false)
    }
  }

  if (calcQuestions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Loading calculator questions...
      </main>
    )
  }

  const currentQ = calcQuestions[currentIdx]

  return (
    <main className="min-h-screen px-4 py-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push('/')} className="text-gray-500 hover:text-white text-sm">
          ← Back
        </button>
        <span className="text-sm text-gray-500">
          Calculator Drill · {currentIdx + 1}/{calcQuestions.length}
        </span>
      </div>

      <QuestionRenderer
        question={currentQ}
        onAnswer={handleAnswer}
        showResult={answered}
        formatOverride="numerical"
      />

      {currentQ.nspireSteps && (
        <NspirePanel guide={currentQ.nspireSteps} defaultOpen={true} />
      )}

      {answered && (
        <ConceptPanel concept={currentQ.concept} defaultOpen={false} />
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
            disabled={currentIdx + 1 >= calcQuestions.length}
            className="px-6 py-2 bg-calc-accent text-black font-semibold rounded-lg hover:bg-calc-accent/80 disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </main>
  )
}
