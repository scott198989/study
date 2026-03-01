'use client'

import { useState, useEffect, useCallback } from 'react'
import { Question } from '@/lib/types'
import { getDiagram } from '@/lib/diagrams'
import { motion, AnimatePresence } from 'framer-motion'

type Format = 'original' | 'fill_blank' | 'numerical' | 'reverse'

interface Props {
  question: Question
  onAnswer: (correct: boolean, format: Format) => void
  showConceptBefore?: boolean
  showResult?: boolean
  formatOverride?: Format
}

function pickFormat(q: Question, used: string[]): Format {
  const allFormats: Format[] = ['original']
  if (q.type === 'multiple_choice') allFormats.push('reverse')
  if (q.calculatorRequired && q.type !== 'multiple_choice') allFormats.push('numerical')
  if (q.calculatorRequired && q.type !== 'multiple_choice') allFormats.push('fill_blank')

  const available = allFormats.filter((f) => !used.includes(f))
  if (available.length === 0) return 'original'
  return available[Math.floor(Math.random() * available.length)]
}

export default function QuestionRenderer({
  question,
  onAnswer,
  showConceptBefore = false,
  showResult: externalShowResult,
  formatOverride,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [textInput, setTextInput] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [format, setFormat] = useState<Format>('original')
  const Diagram = question.diagramRef ? getDiagram(question.diagramRef) : null

  useEffect(() => {
    const usedKey = `format_${question.id}`
    const used = JSON.parse(sessionStorage.getItem(usedKey) || '[]')
    const f = formatOverride || pickFormat(question, used)
    setFormat(f)
    used.push(f)
    sessionStorage.setItem(usedKey, JSON.stringify(used))
    setSelectedAnswer(null)
    setTextInput('')
    setShowResult(false)
  }, [question.id, formatOverride])

  useEffect(() => {
    if (externalShowResult !== undefined) setShowResult(externalShowResult)
  }, [externalShowResult])

  const handleSubmit = useCallback(() => {
    if (showResult) return

    let isCorrect = false
    if (format === 'original' || format === 'reverse') {
      isCorrect = selectedAnswer === question.correctAnswer
    } else {
      const cleaned = textInput.trim().toLowerCase()
      const correct = question.correctAnswer.toLowerCase()
      isCorrect = cleaned === correct
      if (question.options) {
        const matchOpt = question.options.find(
          (o) => o.label === question.correctAnswer
        )
        if (matchOpt) {
          const numMatch = matchOpt.text.match(/[\d.]+/)
          if (numMatch && cleaned === numMatch[0]) isCorrect = true
        }
      }
    }

    setShowResult(true)
    onAnswer(isCorrect, format)
  }, [format, selectedAnswer, textInput, question, showResult, onAnswer])

  const isCorrectAnswer = (label: string) => label === question.correctAnswer
  const isWrongSelected = (label: string) =>
    showResult && selectedAnswer === label && !isCorrectAnswer(label)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      {question.knownBadQuestion && (
        <div className="mb-4 px-4 py-2 bg-flagged/10 border border-flagged/30 rounded-lg text-flagged text-sm">
          <span className="font-semibold">Known Issue:</span>{' '}
          {question.correctAnswerNote}
        </div>
      )}

      {Diagram && (
        <div className="mb-6 p-4 rounded-lg bg-[#1a1a2e]">
          <Diagram />
        </div>
      )}

      <div className="mb-6">
        <span className="text-xs text-gray-500 font-mono">
          Q{question.originalNumber}
          {format !== 'original' && (
            <span className="ml-2 px-2 py-0.5 bg-surface rounded text-gray-400">
              {format === 'fill_blank'
                ? 'Fill in the Blank'
                : format === 'numerical'
                  ? 'Numerical Entry'
                  : 'Reverse'}
            </span>
          )}
        </span>

        {format === 'reverse' ? (
          <h2 className="text-lg mt-2 text-white">
            The answer is{' '}
            <span className="text-correct font-semibold">
              {question.options?.find((o) => o.label === question.correctAnswer)
                ?.text || question.correctAnswer}
            </span>
            . Which question does this answer?
          </h2>
        ) : (
          <h2 className="text-lg mt-2 text-white">{question.text}</h2>
        )}
      </div>

      {(format === 'original' || format === 'reverse' ||
        ((format === 'fill_blank' || format === 'numerical') && question.type === 'multiple_choice')) &&
        question.type !== 'true_false' && (
          <div className="space-y-2">
            {question.options?.map((opt) => (
              <button
                key={opt.label}
                onClick={() => !showResult && setSelectedAnswer(opt.label)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                  showResult && isCorrectAnswer(opt.label)
                    ? 'border-correct bg-correct/10 text-correct'
                    : isWrongSelected(opt.label)
                      ? 'border-wrong bg-wrong/10 text-wrong'
                      : selectedAnswer === opt.label
                        ? 'border-calc-accent bg-calc-accent/10 text-white'
                        : 'border-border bg-surface/50 text-gray-300 hover:border-gray-500'
                }`}
                disabled={showResult}
              >
                <span className="font-mono text-sm mr-3 opacity-60">
                  {opt.label}.
                </span>
                {opt.text}
              </button>
            ))}
          </div>
        )}

      {(format === 'original' || format === 'reverse' ||
        ((format === 'fill_blank' || format === 'numerical') && question.type === 'true_false')) &&
        question.type === 'true_false' && (
          <div className="flex gap-3">
            {['True', 'False'].map((val) => (
              <button
                key={val}
                onClick={() => !showResult && setSelectedAnswer(val)}
                className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                  showResult && val === question.correctAnswer
                    ? 'border-correct bg-correct/10 text-correct'
                    : showResult &&
                        selectedAnswer === val &&
                        val !== question.correctAnswer
                      ? 'border-wrong bg-wrong/10 text-wrong'
                      : selectedAnswer === val
                        ? 'border-calc-accent bg-calc-accent/10 text-white'
                        : 'border-border bg-surface/50 text-gray-300 hover:border-gray-500'
                }`}
                disabled={showResult}
              >
                {val}
              </button>
            ))}
          </div>
        )}

      {(format === 'fill_blank' || format === 'numerical') && question.type !== 'multiple_choice' && question.type !== 'true_false' && (
        <div className="mt-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={
              format === 'fill_blank'
                ? 'Type the missing value...'
                : 'Type your answer...'
            }
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white font-mono placeholder-gray-500 focus:border-calc-accent focus:outline-none"
            disabled={showResult}
          />
          {showResult && (
            <p className="mt-2 text-sm text-correct font-mono">
              Correct answer: {question.correctAnswer}
              {question.options?.find(
                (o) => o.label === question.correctAnswer
              ) &&
                ` — ${question.options.find((o) => o.label === question.correctAnswer)?.text}`}
            </p>
          )}
        </div>
      )}

      {!showResult && (selectedAnswer || textInput) && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-calc-accent text-black font-semibold rounded-lg hover:bg-calc-accent/80 transition-colors"
        >
          Submit
        </button>
      )}

      {showResult && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 rounded-lg bg-surface/50 border border-border"
          >
            <p
              className={`font-semibold ${
                selectedAnswer === question.correctAnswer ||
                textInput.trim().toLowerCase() ===
                  question.correctAnswer.toLowerCase()
                  ? 'text-correct'
                  : 'text-wrong'
              }`}
            >
              {selectedAnswer === question.correctAnswer ||
              textInput.trim().toLowerCase() ===
                question.correctAnswer.toLowerCase()
                ? 'Correct!'
                : `Incorrect. The answer is ${question.correctAnswer}.`}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}
