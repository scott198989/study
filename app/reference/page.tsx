'use client'

import { useRouter } from 'next/navigation'

interface FormulaEntry {
  expression: string
  variables?: { symbol: string; definition: string }[]
}

interface Section {
  title: string
  accent: string
  principle: string
  formulas: FormulaEntry[]
  notes?: string[]
}

const SECTIONS: Section[] = [
  {
    title: 'AC Fundamentals & Phasors',
    accent: 'text-[#0abde3] border-[#0abde3]',
    principle:
      'AC signals are sinusoids described by amplitude, frequency, and phase. Phasors represent sinusoids as complex numbers (magnitude + angle), enabling algebraic AC circuit analysis.',
    formulas: [
      {
        expression: 'v(t) = Vm · sin(ωt + θ)',
        variables: [
          { symbol: 'Vm', definition: 'Peak voltage' },
          { symbol: 'ω', definition: 'Angular frequency (rad/s)' },
          { symbol: 'θ', definition: 'Phase angle (degrees or radians)' },
        ],
      },
      {
        expression: 'Vrms = Vm / √2  ≈  Vm × 0.707',
        variables: [
          { symbol: 'Vrms', definition: 'RMS (effective) voltage' },
          { symbol: 'Vm', definition: 'Peak voltage' },
        ],
      },
      {
        expression: 'ω = 2πf',
        variables: [
          { symbol: 'ω', definition: 'Angular frequency (rad/s)' },
          { symbol: 'f', definition: 'Frequency (Hz)' },
        ],
      },
      {
        expression: 'Phasor (rms): (Vm/√2) ∠ θ°',
        variables: [
          { symbol: 'Vm∠θ°', definition: 'Peak phasor form' },
          { symbol: '(Vm/√2)∠θ°', definition: 'RMS phasor form' },
        ],
      },
      {
        expression: 'd/dt [sin(ωt)] = ω·cos(ωt)',
      },
      {
        expression: 'd/dt [cos(ωt)] = −ω·sin(ωt)',
      },
    ],
    notes: [
      'Standard phasor form uses cosine: v(t) = Vm·cos(ωt + θ)',
      'Derivative of sine → cosine; derivative of cosine → negative sine',
      'Phasor analysis only valid when all sources share the same frequency',
    ],
  },
  {
    title: 'Capacitors — DC Behavior',
    accent: 'text-[#54a0ff] border-[#54a0ff]',
    principle:
      'A capacitor stores energy in an electric field. In DC circuits it charges exponentially through a resistor (τ = RC). Once fully charged it acts as an open circuit to DC.',
    formulas: [
      {
        expression: 'C = Q / V',
        variables: [
          { symbol: 'C', definition: 'Capacitance (farads, F)' },
          { symbol: 'Q', definition: 'Charge (coulombs, C)' },
          { symbol: 'V', definition: 'Voltage (V)' },
        ],
      },
      {
        expression: 'i = C · (dv/dt)',
        variables: [
          { symbol: 'i', definition: 'Instantaneous current' },
          { symbol: 'dv/dt', definition: 'Rate of voltage change' },
        ],
      },
      {
        expression: 'τ = R · C',
        variables: [
          { symbol: 'τ', definition: 'Time constant (seconds)' },
          { symbol: 'R', definition: 'Series resistance (Ω)' },
          { symbol: 'C', definition: 'Capacitance (F)' },
        ],
      },
      {
        expression: 'v(t) = Vs · (1 − e^(−t/τ))   [charging from 0]',
        variables: [
          { symbol: 'Vs', definition: 'Source voltage' },
          { symbol: 't', definition: 'Time elapsed after switch closes' },
        ],
      },
      {
        expression: '1/CT = 1/C1 + 1/C2 + ...   [series]',
      },
      {
        expression: 'CT = C1 + C2 + ...   [parallel]',
      },
      {
        expression: 'W = ½ · C · V²',
        variables: [
          { symbol: 'W', definition: 'Energy stored (joules)' },
        ],
      },
      {
        expression: 'C = ε · A / d',
        variables: [
          { symbol: 'ε', definition: 'Permittivity of dielectric (F/m)' },
          { symbol: 'A', definition: 'Plate area (m²)' },
          { symbol: 'd', definition: 'Plate separation (m)' },
        ],
      },
    ],
    notes: [
      'Capacitors in SERIES behave like resistors in PARALLEL (reciprocal sum)',
      'Capacitors in PARALLEL: just add them (more area = more capacitance)',
      'Fully charged capacitor = open circuit to DC',
      '99% charged after 5 time constants (5τ)',
    ],
  },
  {
    title: 'Capacitors — AC Behavior',
    accent: 'text-[#54a0ff] border-[#54a0ff]',
    principle:
      'In AC circuits, capacitive reactance decreases as frequency increases. Current leads voltage by 90° (ICE). Capacitors store and return energy — they do NOT dissipate it.',
    formulas: [
      {
        expression: 'Xc = 1 / (2πfC)  =  1 / (ωC)',
        variables: [
          { symbol: 'Xc', definition: 'Capacitive reactance (Ω)' },
          { symbol: 'f', definition: 'Frequency (Hz)' },
          { symbol: 'C', definition: 'Capacitance (F)' },
        ],
      },
      {
        expression: 'I leads V by 90°',
      },
    ],
    notes: [
      'ICE — for a Capacitor: Current (I) leads Voltage (E) by 90°',
      'Xc ↑ as f ↓ (low frequency → high reactance → acts like open)',
      'Xc ↓ as f ↑ (high frequency → low reactance → acts like short)',
      'Capacitive reactance does NOT dissipate energy as heat',
    ],
  },
  {
    title: 'Inductors — DC Behavior',
    accent: 'text-[#a29bfe] border-[#a29bfe]',
    principle:
      'An inductor stores energy in a magnetic field. It opposes changes in current. In DC circuits, current builds exponentially (τ = L/R). At steady state, an ideal inductor acts as a short circuit (wire).',
    formulas: [
      {
        expression: 'v = L · (di/dt)',
        variables: [
          { symbol: 'v', definition: 'Induced voltage (V)' },
          { symbol: 'L', definition: 'Inductance (henrys, H)' },
          { symbol: 'di/dt', definition: 'Rate of current change (A/s)' },
        ],
      },
      {
        expression: 'τ = L / R',
        variables: [
          { symbol: 'τ', definition: 'Time constant (seconds)' },
          { symbol: 'L', definition: 'Inductance (H)' },
          { symbol: 'R', definition: 'Series resistance (Ω)' },
        ],
      },
      {
        expression: 'i(t) = (Vs/R) · (1 − e^(−t/τ))   [building from 0]',
        variables: [
          { symbol: 'Vs/R', definition: 'Final steady-state current' },
        ],
      },
      {
        expression: 'LT = L1 + L2 + ...   [series]',
      },
      {
        expression: '1/LT = 1/L1 + 1/L2 + ...   [parallel]',
      },
      {
        expression: 'W = ½ · L · I²',
        variables: [
          { symbol: 'W', definition: 'Energy stored (joules)' },
        ],
      },
      {
        expression: 'L = (μ · N² · A) / l',
        variables: [
          { symbol: 'μ', definition: 'Permeability of core (H/m)' },
          { symbol: 'N', definition: 'Number of turns' },
          { symbol: 'A', definition: 'Core cross-section area (m²)' },
          { symbol: 'l', definition: 'Core length (m)' },
        ],
      },
    ],
    notes: [
      'Inductors in SERIES: just add them (same as resistors in series)',
      'Inductors in PARALLEL: reciprocal sum (same as resistors in parallel)',
      'Fully charged inductor = short circuit to DC (current flows freely)',
      'Lenz\'s Law: induced effect always opposes the cause that produced it',
    ],
  },
  {
    title: 'Inductors — AC Behavior',
    accent: 'text-[#a29bfe] border-[#a29bfe]',
    principle:
      'In AC circuits, inductive reactance increases with frequency. Voltage leads current by 90° (ELI). Inductors store and return energy — they do NOT dissipate it.',
    formulas: [
      {
        expression: 'XL = 2πfL  =  ωL',
        variables: [
          { symbol: 'XL', definition: 'Inductive reactance (Ω)' },
          { symbol: 'f', definition: 'Frequency (Hz)' },
          { symbol: 'L', definition: 'Inductance (H)' },
        ],
      },
      {
        expression: 'Z = √(R² + XL²)',
        variables: [
          { symbol: 'Z', definition: 'Impedance magnitude (Ω)' },
        ],
      },
      {
        expression: 'V leads I by 90°',
      },
    ],
    notes: [
      'ELI — for an inductor: Voltage (E) Leads Current (I) by 90°',
      'ELI the ICE man: ELI (inductor) vs ICE (capacitor)',
      'XL ↑ as f ↑ (high frequency → high reactance → acts like open)',
      'XL ↓ as f ↓ (low frequency → low reactance → acts like short)',
      'Inductive reactance does NOT dissipate energy as heat',
    ],
  },
  {
    title: 'Complex Numbers & Phasor Math',
    accent: 'text-[#00d2d3] border-[#00d2d3]',
    principle:
      'Complex numbers represent impedances and phasors. Use rectangular form for addition/subtraction; use polar form for multiplication/division.',
    formulas: [
      {
        expression: 'Rectangular: Z = a + jb',
        variables: [
          { symbol: 'a', definition: 'Real part (resistance component)' },
          { symbol: 'b', definition: 'Imaginary part (reactance component)' },
          { symbol: 'j', definition: '√(−1)' },
        ],
      },
      {
        expression: 'Polar: Z = M∠θ',
        variables: [
          { symbol: 'M', definition: 'Magnitude = √(a² + b²)' },
          { symbol: 'θ', definition: 'Angle = arctan(b/a)' },
        ],
      },
      {
        expression: 'Rect → Polar:  M = √(a²+b²),  θ = arctan(b/a)',
      },
      {
        expression: 'Polar → Rect:  a = M·cos(θ),  b = M·sin(θ)',
      },
      {
        expression: '(M1∠θ1) × (M2∠θ2) = (M1·M2) ∠ (θ1+θ2)',
      },
      {
        expression: '(M1∠θ1) ÷ (M2∠θ2) = (M1/M2) ∠ (θ1−θ2)',
      },
      {
        expression: '(a+jb)(c+jd) = (ac−bd) + j(ad+bc)',
      },
      {
        expression: 'Complex conjugate of (a+jb) = (a−jb)',
      },
    ],
    notes: [
      'Change sign of imaginary part to find conjugate (NOT real part)',
      'Add/subtract in rectangular form',
      'Multiply/divide in polar form',
    ],
  },
  {
    title: 'Power Factor & AC Power',
    accent: 'text-[#ffd32a] border-[#ffd32a]',
    principle:
      'Power factor (PF) describes how effectively power is delivered to the load. PF = 1 is ideal (purely resistive). Only resistance dissipates real power — reactive elements store and return it.',
    formulas: [
      {
        expression: 'P = ½ · Vp · Ip · cos(θv − θi)',
        variables: [
          { symbol: 'P', definition: 'Average (real) power (watts)' },
          { symbol: 'Vp, Ip', definition: 'Peak voltage and current' },
          { symbol: 'θv − θi', definition: 'Phase angle between V and I' },
        ],
      },
      {
        expression: 'P = Vrms · Irms · cos(θ)',
        variables: [
          { symbol: 'Vrms, Irms', definition: 'RMS voltage and current' },
        ],
      },
      {
        expression: 'PF = cos(θv − θi)',
        variables: [
          { symbol: 'PF', definition: 'Power factor (0 to 1)' },
          { symbol: 'θ', definition: 'Angle between voltage and current' },
        ],
      },
      {
        expression: 'S = Vrms · Irms   (apparent power, VA)',
      },
      {
        expression: 'P = S · PF   (real power, W)',
      },
    ],
    notes: [
      'PF = 1 → purely resistive load → maximum real power delivered',
      'PF = 0 → purely reactive load → zero real power delivered',
      'Lagging PF → inductive circuit (current lags voltage)',
      'Leading PF → capacitive circuit (current leads voltage)',
      'More reactive the load → lower the power factor',
    ],
  },
]

function FormulaBlock({ formula }: { formula: FormulaEntry }) {
  return (
    <div className="mb-3">
      <p className="font-mono text-sm text-white bg-[#1a1a2e] px-3 py-1.5 rounded inline-block">
        {formula.expression}
      </p>
      {formula.variables && formula.variables.length > 0 && (
        <div className="mt-1 pl-2 flex flex-wrap gap-x-4 gap-y-0.5">
          {formula.variables.map((v, i) => (
            <span key={i} className="text-xs text-gray-400">
              <span className="font-mono text-gray-300">{v.symbol}</span> = {v.definition}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ReferencePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen px-4 py-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push('/')}
          className="text-gray-500 hover:text-white text-sm"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Formula Reference</h1>
      </div>

      <div className="space-y-4">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className={`rounded-lg border overflow-hidden ${section.accent.split(' ')[1]}`}
          >
            <div className={`px-4 py-2.5 bg-surface/60 border-b ${section.accent.split(' ')[1]}`}>
              <h2 className={`font-semibold text-sm ${section.accent.split(' ')[0]}`}>
                {section.title}
              </h2>
            </div>

            <div className="px-4 py-4 bg-surface/20 space-y-4">
              <p className="text-xs text-gray-400 leading-relaxed">{section.principle}</p>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Formulas</p>
                {section.formulas.map((f, i) => (
                  <FormulaBlock key={i} formula={f} />
                ))}
              </div>

              {section.notes && section.notes.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Key Notes</p>
                  <ul className="space-y-1">
                    {section.notes.map((note, i) => (
                      <li key={i} className="text-xs text-gray-300 flex gap-2">
                        <span className="text-gray-600 shrink-0">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
