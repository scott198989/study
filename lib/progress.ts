import { ProgressStore, QuestionHistory, SessionHistory, Category } from './types'

const STORAGE_KEY = 'ac-circuits-progress'

const defaultProgress: ProgressStore = {
  questionHistory: {},
  sessionHistory: [],
  weakSpots: [],
  streak: 0,
  lastStudiedDate: '',
}

export function loadProgress(): ProgressStore {
  if (typeof window === 'undefined') return defaultProgress
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress
    return JSON.parse(raw) as ProgressStore
  } catch {
    return defaultProgress
  }
}

export function saveProgress(progress: ProgressStore): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function recordAnswer(
  questionId: number,
  correct: boolean,
  format: string
): ProgressStore {
  const progress = loadProgress()
  const existing = progress.questionHistory[questionId] || {
    attempts: 0,
    correct: 0,
    flagged: false,
    lastSeen: '',
    formatHistory: [],
  }

  existing.attempts += 1
  if (correct) existing.correct += 1
  existing.lastSeen = new Date().toISOString()
  if (!existing.formatHistory.includes(format)) {
    existing.formatHistory.push(format)
  }

  progress.questionHistory[questionId] = existing
  recalcWeakSpots(progress)
  updateStreak(progress)
  saveProgress(progress)
  return progress
}

export function toggleFlag(questionId: number): ProgressStore {
  const progress = loadProgress()
  const existing = progress.questionHistory[questionId] || {
    attempts: 0,
    correct: 0,
    flagged: false,
    lastSeen: '',
    formatHistory: [],
  }
  existing.flagged = !existing.flagged
  progress.questionHistory[questionId] = existing
  saveProgress(progress)
  return progress
}

export function saveSession(session: SessionHistory): ProgressStore {
  const progress = loadProgress()
  progress.sessionHistory.unshift(session)
  if (progress.sessionHistory.length > 10) {
    progress.sessionHistory = progress.sessionHistory.slice(0, 10)
  }
  saveProgress(progress)
  return progress
}

function recalcWeakSpots(progress: ProgressStore): void {
  progress.weakSpots = []
  for (const [idStr, h] of Object.entries(progress.questionHistory)) {
    if (h.attempts >= 1 && h.correct / h.attempts < 0.7) {
      progress.weakSpots.push(Number(idStr))
    }
  }
}

function updateStreak(progress: ProgressStore): void {
  const today = new Date().toISOString().slice(0, 10)
  if (progress.lastStudiedDate === today) return

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (progress.lastStudiedDate === yesterday) {
    progress.streak += 1
  } else if (progress.lastStudiedDate !== today) {
    progress.streak = 1
  }
  progress.lastStudiedDate = today
}

export function getStats(progress: ProgressStore, totalQuestions: number) {
  const attempted = Object.keys(progress.questionHistory).length
  let totalCorrect = 0
  let totalAttempts = 0
  const categoryStats: Record<string, { correct: number; total: number }> = {}

  for (const h of Object.values(progress.questionHistory)) {
    totalCorrect += h.correct
    totalAttempts += h.attempts
  }

  const overallPercent = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0
  const readiness = Math.round((attempted / totalQuestions) * (overallPercent / 100) * 100)

  return {
    attempted,
    totalQuestions,
    overallPercent,
    weakSpots: progress.weakSpots,
    streak: progress.streak,
    readiness: Math.min(readiness, 100),
    sessionHistory: progress.sessionHistory,
  }
}

export function getWeakQuestionIds(progress: ProgressStore): number[] {
  const weak: number[] = [...progress.weakSpots]
  for (const [idStr, h] of Object.entries(progress.questionHistory)) {
    if (h.flagged && !weak.includes(Number(idStr))) {
      weak.push(Number(idStr))
    }
  }
  return weak
}
