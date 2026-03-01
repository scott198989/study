'use client'

import { useState } from 'react'
import { NspireGuide } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  guide: NspireGuide
  defaultOpen?: boolean
}

export default function NspirePanel({ guide, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mt-4 border border-calc-accent/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between bg-calc-accent/5 hover:bg-calc-accent/10 transition-colors"
      >
        <span className="text-sm font-semibold text-calc-accent">
          TI-Nspire CX II Guide
        </span>
        <span className="text-gray-500 text-xs">
          {open ? '▲ Hide' : '▼ Show'} (N)
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
            <div className="px-4 py-4 space-y-4 bg-[#0a1628] font-mono text-sm">
              {/* Mode Setup */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-calc-accent mb-2">
                  Mode: {guide.mode}
                </h4>
                {guide.modeSetupSteps.length > 0 && (
                  <div className="space-y-1">
                    {guide.modeSetupSteps.map((step, i) => (
                      <p key={i} className="text-gray-400 text-xs">
                        {step}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Steps */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-calc-accent mb-2">
                  Steps
                </h4>
                <div className="space-y-3">
                  {guide.inputSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="pl-3 border-l-2 border-calc-accent/30"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-calc-accent text-xs mt-0.5">
                          {step.stepNumber}.
                        </span>
                        <div className="flex-1">
                          <p className="text-white text-sm">{step.action}</p>
                          <p className="text-gray-500 text-xs mt-0.5">
                            Screen: {step.display}
                          </p>
                          {step.note && (
                            <p className="text-gray-600 text-xs italic mt-0.5">
                              {step.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Output */}
              <div className="p-3 bg-[#0f1f35] rounded border border-calc-accent/20">
                <h4 className="text-xs text-calc-accent mb-1">Expected Output</h4>
                <p className="text-white">{guide.expectedOutput}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {guide.interpretOutput}
                </p>
              </div>

              {/* Warnings */}
              {guide.warnings.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-flagged mb-1">
                    Watch Out
                  </h4>
                  {guide.warnings.map((w, i) => (
                    <p key={i} className="text-flagged/80 text-xs">
                      ⚠ {w}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
