'use client'

import { useState } from 'react'
import { ConceptData } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  concept: ConceptData
  defaultOpen?: boolean
  locked?: boolean
}

export default function ConceptPanel({ concept, defaultOpen = false, locked = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  if (locked) {
    return (
      <div className="mt-4 px-4 py-3 bg-surface/30 border border-border rounded-lg text-gray-500 text-sm">
        Concept panel available after answering
      </div>
    )
  }

  return (
    <div className="mt-4 border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between bg-surface/50 hover:bg-surface/80 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-300">
          Concept Panel
        </span>
        <span className="text-gray-500 text-xs">
          {open ? '▲ Hide' : '▼ Show'} (C)
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4 bg-surface/20">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-calc-accent mb-1">
                  Principle
                </h4>
                <p className="text-sm text-gray-300">{concept.principle}</p>
              </div>

              {concept.formulas.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-calc-accent mb-2">
                    Formulas
                  </h4>
                  {concept.formulas.map((f, i) => (
                    <div key={i} className="mb-2">
                      <p className="font-mono text-sm text-white bg-[#1a1a2e] px-3 py-1.5 rounded inline-block">
                        {f.expression}
                      </p>
                      <div className="mt-1 pl-2 text-xs text-gray-400">
                        {f.variables.map((v, j) => (
                          <span key={j} className="mr-3">
                            <span className="font-mono text-gray-300">
                              {v.symbol}
                            </span>{' '}
                            = {v.definition}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase tracking-wider text-calc-accent mb-1">
                  Worked Example
                </h4>
                <p className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {concept.workedExample}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-calc-accent mb-1">
                  Why Other Answers Are Wrong
                </h4>
                <p className="text-sm text-gray-400">
                  {concept.wrongAnswerAnalysis}
                </p>
              </div>

              {concept.relatedTopics.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-calc-accent mb-1">
                    Related
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {concept.relatedTopics.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 bg-border rounded text-gray-400"
                      >
                        Q{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
