export type Category =
  | 'AC Fundamentals & Phasors'
  | 'Capacitors (DC Behavior)'
  | 'Capacitors (AC Behavior)'
  | 'Inductors (DC Behavior)'
  | 'Inductors (AC Behavior)'
  | 'Complex Numbers & Phasor Math'
  | 'Power Factor & AC Power'

export interface Formula {
  expression: string
  variables: { symbol: string; definition: string }[]
}

export interface ConceptData {
  principle: string
  formulas: Formula[]
  workedExample: string
  wrongAnswerAnalysis: string
  relatedTopics: string[]
}

export interface NspireStep {
  stepNumber: number
  action: string
  display: string
  note?: string
}

export interface NspireGuide {
  mode: 'degrees' | 'radians' | 'standard'
  modeSetupSteps: string[]
  inputSteps: NspireStep[]
  expectedOutput: string
  interpretOutput: string
  warnings: string[]
}

export interface Question {
  id: number
  originalNumber: number | string
  text: string
  type: 'multiple_choice' | 'true_false' | 'calculation'
  options?: { label: string; text: string }[]
  correctAnswer: string
  category: Category
  calculatorRequired: boolean
  diagramRef?: string
  knownBadQuestion?: boolean
  correctAnswerNote?: string
  concept: ConceptData
  nspireSteps?: NspireGuide
}

export interface QuestionHistory {
  attempts: number
  correct: number
  flagged: boolean
  lastSeen: string
  formatHistory: string[]
}

export interface SessionHistory {
  date: string
  mode: string
  score: number
  total: number
  durationMs: number
  categoryBreakdown: Partial<Record<Category, { correct: number; total: number }>>
}

export interface ProgressStore {
  questionHistory: Record<number, QuestionHistory>
  sessionHistory: SessionHistory[]
  weakSpots: number[]
  streak: number
  lastStudiedDate: string
}
