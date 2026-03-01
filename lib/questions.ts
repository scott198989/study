import { Question, Category, ConceptData, NspireGuide } from './types'
import questionData from './question-data.json'
import rawAnswers from './answer-data.json'

interface RawQuestion {
  id: string
  number: number
  type: string
  stem: string
  choices: Record<string, string>
  figure_page_image: string | null
  [key: string]: unknown
}

const rawQuestions = questionData as unknown as RawQuestion[]

// Category assignment map: originalNumber -> Category
const categoryMap: Record<string, Category> = {
  '1': 'Inductors (AC Behavior)',
  '2': 'AC Fundamentals & Phasors',
  '3': 'Inductors (AC Behavior)',
  '4': 'Power Factor & AC Power',
  '5': 'AC Fundamentals & Phasors',
  '6': 'AC Fundamentals & Phasors',
  '7': 'Inductors (AC Behavior)',
  '8': 'AC Fundamentals & Phasors',
  '9': 'Capacitors (AC Behavior)',
  '10': 'Capacitors (AC Behavior)',
  '11': 'AC Fundamentals & Phasors',
  '12': 'Inductors (AC Behavior)',
  '13': 'Inductors (AC Behavior)',
  '14': 'Complex Numbers & Phasor Math',
  '15': 'AC Fundamentals & Phasors',
  '16': 'Inductors (AC Behavior)',
  '17': 'Capacitors (DC Behavior)',
  '18': 'Complex Numbers & Phasor Math',
  '19': 'Capacitors (AC Behavior)',
  '20': 'AC Fundamentals & Phasors',
  '21': 'AC Fundamentals & Phasors',
  '22': 'Inductors (AC Behavior)',
  '23': 'Inductors (AC Behavior)',
  '24': 'Power Factor & AC Power',
  '25': 'Power Factor & AC Power',
  '26': 'AC Fundamentals & Phasors',
  '27': 'Power Factor & AC Power',
  '28': 'Power Factor & AC Power',
  '29': 'Capacitors (AC Behavior)',
  '30': 'Power Factor & AC Power',
  '31': 'Power Factor & AC Power',
  '32': 'Power Factor & AC Power',
  '33': 'Inductors (AC Behavior)',
  '34': 'Inductors (AC Behavior)',
  '35': 'Complex Numbers & Phasor Math',
  '36': 'AC Fundamentals & Phasors',
  '37': 'Complex Numbers & Phasor Math',
  '38': 'Capacitors (DC Behavior)',
  '39': 'Capacitors (DC Behavior)',
  '40': 'Capacitors (DC Behavior)',
  '41': 'Capacitors (DC Behavior)',
  '42': 'Capacitors (DC Behavior)',
  '43': 'Capacitors (DC Behavior)',
  '44': 'Capacitors (DC Behavior)',
  '45': 'Capacitors (DC Behavior)',
  '46': 'Capacitors (DC Behavior)',
  '47': 'Capacitors (DC Behavior)',
  '48': 'Capacitors (DC Behavior)',
  '49': 'Capacitors (DC Behavior)',
  '50': 'Capacitors (AC Behavior)',
  '51': 'Capacitors (DC Behavior)',
  '52': 'Capacitors (DC Behavior)',
  '53': 'Capacitors (DC Behavior)',
  '54': 'Capacitors (DC Behavior)',
  '55': 'Capacitors (DC Behavior)',
  '56': 'Capacitors (DC Behavior)',
  '57': 'Capacitors (DC Behavior)',
  '58': 'Capacitors (DC Behavior)',
  '59': 'Capacitors (DC Behavior)',
  '60': 'Capacitors (DC Behavior)',
  '61': 'Capacitors (DC Behavior)',
  '62': 'Capacitors (DC Behavior)',
  '63': 'Capacitors (DC Behavior)',
  '64': 'Capacitors (DC Behavior)',
  '64b': 'Capacitors (DC Behavior)',
  '65': 'Capacitors (DC Behavior)',
  '66': 'Capacitors (DC Behavior)',
  '67': 'Capacitors (DC Behavior)',
  '68': 'Capacitors (DC Behavior)',
  '69': 'Capacitors (DC Behavior)',
  '70': 'Capacitors (DC Behavior)',
  '71': 'Capacitors (DC Behavior)',
  '72': 'Capacitors (DC Behavior)',
  '73': 'Inductors (DC Behavior)',
  '74': 'Inductors (DC Behavior)',
  '75': 'Inductors (DC Behavior)',
  '76': 'Inductors (DC Behavior)',
  '77': 'Inductors (DC Behavior)',
  '78': 'Inductors (DC Behavior)',
  '79': 'Inductors (DC Behavior)',
  '80': 'Inductors (DC Behavior)',
  '81': 'Inductors (DC Behavior)',
  '82': 'Inductors (DC Behavior)',
  '83': 'Inductors (DC Behavior)',
  '84': 'Inductors (DC Behavior)',
  '85': 'Inductors (DC Behavior)',
  '86': 'Inductors (DC Behavior)',
  '87': 'Inductors (DC Behavior)',
  '88': 'Inductors (DC Behavior)',
  '89': 'Inductors (DC Behavior)',
  '90': 'Inductors (DC Behavior)',
  '91': 'Inductors (DC Behavior)',
  '92': 'Inductors (DC Behavior)',
  '93': 'Inductors (DC Behavior)',
  '94': 'Inductors (DC Behavior)',
  '95': 'Inductors (DC Behavior)',
  '96': 'Inductors (DC Behavior)',
  '97': 'Inductors (DC Behavior)',
  '98': 'Inductors (DC Behavior)',
  '99': 'Inductors (DC Behavior)',
  '100': 'Inductors (DC Behavior)',
  '101': 'Inductors (DC Behavior)',
  '102': 'Inductors (DC Behavior)',
  '103': 'Capacitors (AC Behavior)',
  '104': 'Inductors (DC Behavior)',
  '105': 'Inductors (DC Behavior)',
  '106': 'Capacitors (DC Behavior)',
  '107': 'Inductors (AC Behavior)',
  '108': 'Power Factor & AC Power',
  '109': 'AC Fundamentals & Phasors',
}

// Diagram reference map
const diagramMap: Record<string, string> = {
  '15': 'figure_14_3',
  '33': 'figure_14_1',
  '39': 'figure_10_6',
  '47': 'figure_10_1',
  '48': 'figure_10_4',
  '50': 'figure_10_2',
  '57': 'figure_10_5',
  '62': 'figure_10_1',
  '64': 'figure_10_3',
  '65': 'figure_10_6',
  '66': 'figure_10_1',
  '69': 'figure_10_1',
  '81': 'figure_11_3',
  '83': 'figure_11_6',
  '88': 'figure_11_4',
  '89': 'figure_11_5',
  '91': 'figure_11_1',
  '95': 'figure_11_1',
  '96': 'figure_11_5',
  '97': 'figure_11_2',
  '98': 'figure_11_1',
  '99': 'figure_11_3',
  '101': 'figure_11_2',
  '103': 'figure_10_2',
}

// Calculator-required questions
const calcRequired = new Set([
  '5','10','11','12','14','19','23','28','30','32','33','35','36','37',
  '38','39','43','46','47','48','50','57','58','59','60','62','64','64b',
  '65','67','68','69','75','82','83','85','87','88','94','95','97','98',
  '99','101','103','104','105'
])

// Known bad questions
const badQuestions: Record<string, string> = {
  '10': 'Original answer key erroneously listed D (5.3µF). Correct answer is B (499µF). Xc = V/I = 100/18.8 = 5.32Ω, C = 1/(ωXc) = 1/(377 × 5.32) ≈ 499µF.',
  '28': 'The angle subtraction in the power calculation may be done differently depending on convention. P = ½VpIp cos(θv−θi) = ½(50)(10)cos(−20°−30°) = 250cos(−50°) ≈ 161W.',
  '32': 'PF = cos(θv−θi) = cos(20°−(−45°)) = cos(65°) ≈ 0.423. Key says "leading" but since voltage leads current, PF should be lagging.',
  '95': 'τ = L/R = 50mH/10kΩ = 5µs. Key says A (50ms) — off by 4 orders of magnitude. None of the answer choices is correct.',
}

// Concept data generator based on category and question content
function generateConcept(stem: string, type: string, category: Category, correctAnswer: string, choices: Record<string, string>, origNum: string): ConceptData {
  const concepts: Record<Category, { principle: string; formulas: { expression: string; variables: { symbol: string; definition: string }[] }[] }> = {
    'AC Fundamentals & Phasors': {
      principle: 'AC signals are sinusoidal waveforms described by amplitude, frequency, and phase. Phasors represent sinusoids as complex numbers with magnitude (rms value) and angle (phase), enabling algebraic analysis of AC circuits.',
      formulas: [
        { expression: 'v(t) = Vm sin(ωt + θ)', variables: [{ symbol: 'Vm', definition: 'Peak voltage' }, { symbol: 'ω', definition: 'Angular frequency (rad/s)' }, { symbol: 'θ', definition: 'Phase angle' }] },
        { expression: 'Vrms = Vm/√2', variables: [{ symbol: 'Vrms', definition: 'RMS voltage' }, { symbol: 'Vm', definition: 'Peak voltage' }] },
      ],
    },
    'Capacitors (DC Behavior)': {
      principle: 'A capacitor stores energy in an electric field between its plates. In DC circuits, it charges exponentially through a resistor with time constant τ = RC. Once fully charged, it acts as an open circuit to DC.',
      formulas: [
        { expression: 'C = Q/V', variables: [{ symbol: 'C', definition: 'Capacitance (F)' }, { symbol: 'Q', definition: 'Charge (C)' }, { symbol: 'V', definition: 'Voltage (V)' }] },
        { expression: 'τ = RC', variables: [{ symbol: 'τ', definition: 'Time constant (s)' }, { symbol: 'R', definition: 'Resistance (Ω)' }, { symbol: 'C', definition: 'Capacitance (F)' }] },
        { expression: 'C_series = 1/(1/C₁ + 1/C₂)', variables: [{ symbol: 'C_series', definition: 'Series equivalent' }] },
        { expression: 'C_parallel = C₁ + C₂', variables: [{ symbol: 'C_parallel', definition: 'Parallel equivalent' }] },
      ],
    },
    'Capacitors (AC Behavior)': {
      principle: 'In AC circuits, a capacitor\'s reactance decreases with frequency: Xc = 1/(2πfC). Current leads voltage by 90° in a pure capacitor. Capacitive reactance does not dissipate energy.',
      formulas: [
        { expression: 'Xc = 1/(2πfC)', variables: [{ symbol: 'Xc', definition: 'Capacitive reactance (Ω)' }, { symbol: 'f', definition: 'Frequency (Hz)' }, { symbol: 'C', definition: 'Capacitance (F)' }] },
        { expression: 'Xc = 1/(ωC)', variables: [{ symbol: 'ω', definition: 'Angular frequency = 2πf' }] },
        { expression: 'i = C(dv/dt)', variables: [{ symbol: 'i', definition: 'Current through capacitor' }, { symbol: 'dv/dt', definition: 'Rate of voltage change' }] },
      ],
    },
    'Inductors (DC Behavior)': {
      principle: 'An inductor stores energy in a magnetic field. In DC circuits, current builds exponentially with time constant τ = L/R. Once steady-state is reached, an ideal inductor acts as a short circuit (wire) to DC.',
      formulas: [
        { expression: 'v = L(di/dt)', variables: [{ symbol: 'v', definition: 'Induced voltage' }, { symbol: 'L', definition: 'Inductance (H)' }, { symbol: 'di/dt', definition: 'Rate of current change' }] },
        { expression: 'τ = L/R', variables: [{ symbol: 'τ', definition: 'Time constant (s)' }, { symbol: 'L', definition: 'Inductance (H)' }, { symbol: 'R', definition: 'Resistance (Ω)' }] },
        { expression: 'L_series = L₁ + L₂', variables: [{ symbol: 'L_series', definition: 'Series equivalent' }] },
        { expression: 'L_parallel = 1/(1/L₁ + 1/L₂)', variables: [{ symbol: 'L_parallel', definition: 'Parallel equivalent' }] },
      ],
    },
    'Inductors (AC Behavior)': {
      principle: 'In AC circuits, an inductor\'s reactance increases with frequency: XL = 2πfL. Voltage leads current by 90° in a pure inductor (ELI). Inductive reactance does not dissipate energy.',
      formulas: [
        { expression: 'XL = 2πfL', variables: [{ symbol: 'XL', definition: 'Inductive reactance (Ω)' }, { symbol: 'f', definition: 'Frequency (Hz)' }, { symbol: 'L', definition: 'Inductance (H)' }] },
        { expression: 'XL = ωL', variables: [{ symbol: 'ω', definition: 'Angular frequency = 2πf' }] },
        { expression: 'Z = √(R² + XL²)', variables: [{ symbol: 'Z', definition: 'Impedance magnitude' }] },
      ],
    },
    'Complex Numbers & Phasor Math': {
      principle: 'Complex numbers represent impedances and phasors. Rectangular form (a + jb) is useful for addition; polar form (M∠θ) is useful for multiplication/division. Convert between forms using trig.',
      formulas: [
        { expression: 'Polar: M∠θ = M·cos(θ) + j·M·sin(θ)', variables: [{ symbol: 'M', definition: 'Magnitude' }, { symbol: 'θ', definition: 'Angle' }] },
        { expression: 'Rect→Polar: M = √(a²+b²), θ = arctan(b/a)', variables: [{ symbol: 'a', definition: 'Real part' }, { symbol: 'b', definition: 'Imaginary part' }] },
        { expression: '(a+jb)(c+jd) = (ac-bd) + j(ad+bc)', variables: [] },
      ],
    },
    'Power Factor & AC Power': {
      principle: 'Power factor (PF) = cos(θ), where θ is the angle between voltage and current. PF = 1 means purely resistive (max power delivery). Real power P = VrmsIrms·cos(θ) is dissipated only by resistance.',
      formulas: [
        { expression: 'P = ½VpIp·cos(θv−θi)', variables: [{ symbol: 'P', definition: 'Average power (W)' }, { symbol: 'Vp,Ip', definition: 'Peak values' }, { symbol: 'θ', definition: 'Phase angles' }] },
        { expression: 'PF = cos(θv−θi)', variables: [{ symbol: 'PF', definition: 'Power factor (0 to 1)' }] },
        { expression: 'P = Vrms·Irms·PF', variables: [] },
      ],
    },
  }

  const catData = concepts[category]

  // Generate worked example based on question content
  let workedExample = 'Apply the relevant formula with the given values and solve step by step.'
  let wrongAnswerAnalysis = 'Each distractor tests a common misconception or calculation error for this topic.'

  if (type === 'TF') {
    workedExample = `Consider the statement: "${stem.substring(0, 80)}..." The correct answer is ${correctAnswer}. ${correctAnswer === 'True' ? 'This statement accurately describes the concept.' : 'This statement contains an error in the described relationship.'}`
    wrongAnswerAnalysis = correctAnswer === 'True'
      ? 'False would be incorrect because the statement accurately reflects the underlying physics.'
      : 'True would be incorrect because the statement misrepresents the actual behavior.'
  } else {
    const correctText = choices[correctAnswer] || correctAnswer
    workedExample = `The correct answer is ${correctAnswer}: ${correctText}. Work through the formula with the given values to verify.`
    const wrongOpts = Object.entries(choices)
      .filter(([k]) => k !== correctAnswer)
      .map(([k, v]) => `${k} (${v}): common error`)
      .join('. ')
    if (wrongOpts) wrongAnswerAnalysis = wrongOpts
  }

  return {
    principle: catData.principle,
    formulas: catData.formulas,
    workedExample,
    wrongAnswerAnalysis,
    relatedTopics: [],
  }
}

// Generate basic NspireGuide for calculator questions
function generateNspireGuide(stem: string, category: Category, correctAnswer: string, choices: Record<string, string>): NspireGuide {
  const needsDegrees = stem.includes('°') || stem.includes('sin') || stem.includes('cos') || stem.includes('angle') || stem.includes('phasor') || stem.includes('phase')

  if (needsDegrees) {
    return {
      mode: 'degrees',
      modeSetupSteps: [
        'Press [home] > Settings > Document Settings',
        'Set Angle to "Degree"',
        'Press [enter] to confirm',
      ],
      inputSteps: [
        { stepNumber: 1, action: 'Open Calculator app', display: 'Calculator screen', note: 'New calculation page' },
        { stepNumber: 2, action: 'Type the expression from the problem', display: 'Expression entered' },
        { stepNumber: 3, action: 'Press [enter] to evaluate', display: 'Result shown' },
      ],
      expectedOutput: `Result matching answer ${correctAnswer}: ${choices[correctAnswer] || correctAnswer}`,
      interpretOutput: `Compare the calculated result to answer choices. Select ${correctAnswer}.`,
      warnings: [
        'Ensure calculator is in DEGREE mode, not radians',
        'For µ (micro), enter ×10⁻⁶. For m (milli), enter ×10⁻³. For k (kilo), enter ×10³',
      ],
    }
  }

  return {
    mode: 'standard',
    modeSetupSteps: ['Standard calculator mode — no special setup needed'],
    inputSteps: [
      { stepNumber: 1, action: 'Open Calculator app', display: 'Calculator screen' },
      { stepNumber: 2, action: 'Enter the values and formula from the problem', display: 'Expression entered' },
      { stepNumber: 3, action: 'Press [enter] to evaluate', display: 'Numerical result' },
    ],
    expectedOutput: `Result matching answer ${correctAnswer}: ${choices[correctAnswer] || correctAnswer}`,
    interpretOutput: `Match result to closest answer choice. Watch unit prefixes (µ, m, k).`,
    warnings: [
      'Watch unit prefixes: µ = ×10⁻⁶, m = ×10⁻³, k = ×10³',
      'Capacitors in series use reciprocal formula (like resistors in parallel)',
    ],
  }
}

// Answer key with Q1 and Q2 added (missing from answer-data.json)
const answers: Record<string, string> = { '1': 'D', '2': 'False', ...(rawAnswers as Record<string, string>) }

// Track duplicate Q064 handling
let seenQ064 = false

// Build the questions array
export const questions: Question[] = rawQuestions.map((raw, idx) => {
  const origNum = raw.number
  let origKey = String(origNum)

  // Handle duplicate Q064: second occurrence is "64b"
  if (origNum === 64 && seenQ064) {
    origKey = '64b'
  }
  if (origNum === 64) seenQ064 = true

  // Determine answer key lookup
  // The answer key maps: original Q64 first → key "64", Q64 second (64b) → key "65"
  // Then original Q65→key"66", Q66→key"67", etc.
  let answerLookup = String(origNum)
  if (origKey === '64b') {
    answerLookup = '65'
  } else if (origNum >= 65 && seenQ064) {
    answerLookup = String(origNum + 1)
  }

  const correctAnswer = answers[answerLookup] || answers[String(origNum)] || 'A'
  const category = categoryMap[origKey] || categoryMap[String(origNum)] || 'AC Fundamentals & Phasors'
  const isCalcRequired = calcRequired.has(origKey) || calcRequired.has(String(origNum))
  const diagram = diagramMap[String(origNum)]
  const isBad = badQuestions[String(origNum)]

  const qType = raw.type === 'TF' ? 'true_false' as const : 'multiple_choice' as const
  const options = qType === 'true_false'
    ? undefined
    : Object.entries(raw.choices).map(([label, text]) => ({ label, text: text as string }))

  const concept = generateConcept(raw.stem, raw.type, category, correctAnswer, raw.choices, origKey)
  const nspire = isCalcRequired ? generateNspireGuide(raw.stem, category, correctAnswer, raw.choices) : undefined

  return {
    id: idx + 1,
    originalNumber: origKey === '64b' ? '64b' : origNum,
    text: raw.stem,
    type: qType,
    options,
    correctAnswer,
    category,
    calculatorRequired: isCalcRequired,
    diagramRef: diagram,
    knownBadQuestion: !!isBad,
    correctAnswerNote: isBad || undefined,
    concept,
    nspireSteps: nspire,
  } as Question
})
