<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bc03cbd1ced04cfad0ccfeb987ae3f4006b8813e
Build a Next.js study application and deploy it to Vercel. This is an AC Circuits 
exam prep app for a Mechatronics Engineering Technology student with a test Monday.

## SOURCE MATERIAL
The corrected PDF is attached. 109 questions, answer key at the end. Answer key 
is ground truth — where question body and key conflict, key wins. Known bad 
questions (errors in both question AND key): Q10, Q28, Q32, Q95 — flag these 
with worked solutions showing correct math alongside what the key says.

## TECH STACK
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion for transitions
- Recharts for any graphs
- SVG for ALL circuit diagrams (see diagram specs below)
- Anthropic SDK (@anthropic-ai/sdk) for Claude tutor
- localStorage for progress persistence
- Deploy target: Vercel

## PROJECT STRUCTURE
/app
  /page.tsx              — landing/mode select
  /quiz/page.tsx         — quiz mode
  /study/page.tsx        — study mode  
  /calculator/page.tsx   — calculator drill mode
  /api/tutor/route.ts    — Claude API route (streaming)
/components
  /questions/            — question renderer components
  /diagrams/             — SVG circuit diagram components (one per figure)
  /calculator/           — TI-Nspire step panels
  /tutor/                — Claude chat interface
/lib
  /questions.ts          — full question bank data
  /answers.ts            — answer key
  /calculator-guides.ts  — Nspire steps per question

## CIRCUIT DIAGRAMS — RENDER ALL AS SVG COMPONENTS
Every diagram referenced in the PDF must be a proper rendered SVG component.
No placeholders. No "diagram not available." Build every single one.

Here are the figures and their circuit descriptions:

**Figure 10.1** — Series RC circuit: 10V DC source, switch in series, 10kΩ resistor, 
50µF capacitor to ground. Show component labels and voltage polarity markers on cap.

**Figure 10.2** — Voltage waveform graph: Vc on Y-axis (0-15V), time on X-axis 
(0-8ms). Voltage starts at 0, ramps linearly to 10V at t=3ms, then drops linearly 
to 5V at t=5ms, holds at 5V through t=8ms. Render using Recharts LineChart.

**Figure 10.3** — Mixed capacitor network: 10V source. Top branch: two 100µF caps 
in series. Bottom branch: two 25µF caps in parallel. Both branches in parallel 
across source. CT arrow pointing into the network.

**Figure 10.4** — Parallel capacitor circuit: 25V source with 10µF and 5µF 
capacitors in parallel across source.

**Figure 10.5** — Two-branch RC voltage divider: 15V source. Left branch top: 
5kΩ resistor in series with 10µF cap. Left branch bottom: 10kΩ resistor in series 
with 5µF cap. Branches in parallel across source.

**Figure 10.6 (appears twice — Q39 version)** — Series-parallel cap circuit: 60V 
source. 30µF in series with a parallel combination of 20µF and 40µF. 
(Q65 version uses same figure with 20µF + 40µF parallel group)

**Figure 11.1** — Series RL circuit: 10V DC source, switch, 10kΩ resistor, 
50mH inductor. Show current direction arrow.

**Figure 11.2** — Inductor current waveform: IL on Y-axis (0-15mA), time on 
X-axis (0-8ms). Current ramps from 0 to 10mA over t=0 to t=3ms, drops to 5mA 
at t=5ms, holds at 5mA through t=8ms. Render using Recharts.

**Figure 11.3** — RL circuit with parallel branch: 10V source, 1kΩ series 
resistor, then parallel combination of 10kΩ resistor and 10mH inductor.

<<<<<<< HEAD
=======
## INSTRUCTIONS FOR CLAUDE CODE

Build a Next.js study application and deploy it to Vercel. This is an AC Circuits 
exam prep app for a Mechatronics Engineering Technology student with a test Monday.

## SOURCE MATERIAL
The corrected PDF is attached. 109 questions, answer key at the end. Answer key 
is ground truth — where question body and key conflict, key wins. Known bad 
questions (errors in both question AND key): Q10, Q28, Q32, Q95 — flag these 
with worked solutions showing correct math alongside what the key says.

## TECH STACK
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion for transitions
- Recharts for any graphs
- SVG for ALL circuit diagrams (see diagram specs below)
- Anthropic SDK (@anthropic-ai/sdk) for Claude tutor
- localStorage for progress persistence
- Deploy target: Vercel

## PROJECT STRUCTURE
/app
  /page.tsx              — landing/mode select
  /quiz/page.tsx         — quiz mode
  /study/page.tsx        — study mode  
  /calculator/page.tsx   — calculator drill mode
  /api/tutor/route.ts    — Claude API route (streaming)
/components
  /questions/            — question renderer components
  /diagrams/             — SVG circuit diagram components (one per figure)
  /calculator/           — TI-Nspire step panels
  /tutor/                — Claude chat interface
/lib
  /questions.ts          — full question bank data
  /answers.ts            — answer key
  /calculator-guides.ts  — Nspire steps per question

## CIRCUIT DIAGRAMS — RENDER ALL AS SVG COMPONENTS
Every diagram referenced in the PDF must be a proper rendered SVG component.
No placeholders. No "diagram not available." Build every single one.

Here are the figures and their circuit descriptions:

**Figure 10.1** — Series RC circuit: 10V DC source, switch in series, 10kΩ resistor, 
50µF capacitor to ground. Show component labels and voltage polarity markers on cap.

**Figure 10.2** — Voltage waveform graph: Vc on Y-axis (0-15V), time on X-axis 
(0-8ms). Voltage starts at 0, ramps linearly to 10V at t=3ms, then drops linearly 
to 5V at t=5ms, holds at 5V through t=8ms. Render using Recharts LineChart.

**Figure 10.3** — Mixed capacitor network: 10V source. Top branch: two 100µF caps 
in series. Bottom branch: two 25µF caps in parallel. Both branches in parallel 
across source. CT arrow pointing into the network.

**Figure 10.4** — Parallel capacitor circuit: 25V source with 10µF and 5µF 
capacitors in parallel across source.

**Figure 10.5** — Two-branch RC voltage divider: 15V source. Left branch top: 
5kΩ resistor in series with 10µF cap. Left branch bottom: 10kΩ resistor in series 
with 5µF cap. Branches in parallel across source.

**Figure 10.6 (appears twice — Q39 version)** — Series-parallel cap circuit: 60V 
source. 30µF in series with a parallel combination of 20µF and 40µF. 
(Q65 version uses same figure with 20µF + 40µF parallel group)

**Figure 11.1** — Series RL circuit: 10V DC source, switch, 10kΩ resistor, 
50mH inductor. Show current direction arrow.

**Figure 11.2** — Inductor current waveform: IL on Y-axis (0-15mA), time on 
X-axis (0-8ms). Current ramps from 0 to 10mA over t=0 to t=3ms, drops to 5mA 
at t=5ms, holds at 5mA through t=8ms. Render using Recharts.

**Figure 11.3** — RL circuit with parallel branch: 10V source, 1kΩ series 
resistor, then parallel combination of 10kΩ resistor and 10mH inductor.

>>>>>>> 8b17a9f (initial)
=======
>>>>>>> bc03cbd1ced04cfad0ccfeb987ae3f4006b8813e
**Figure 11.4** — Inductor network: 1kΩ series resistor, then LT pointing into 
parallel/series inductor combination: 60mH in parallel with series(30mH), 
all in series with 100mH, and separate 500mH branch. Show LT label.

**Figure 11.5** — Dual exponential curves: Y-axis 0-1.0 (normalized), 
X-axis 0-6τ. One curve rising (current, 1-e^(-t/τ)), one falling (voltage, 
e^(-t/τ)). Curves cross at approximately τ=0.69. Render with Recharts, 
label both curves.

**Figure 11.6** — Complex RLC network: 10V source. Series: 1kΩ, then parallel 
group of (4kΩ series 10mH) and (10µF). Then series: 10kΩ, then parallel 
group of (10kΩ) and (1µF). Then 50mH to ground. Current I labeled at top.

**Figure 14.3** — Two sinusoidal voltage waveforms: V1 and V2 on same axes, 
same amplitude, same frequency. V1 peaks at π/2, V2 peaks later at 3π/4 
(V1 leads V2 by π/4 radians = 45°). X-axis labeled in terms of π. 
Render with Recharts, both curves clearly labeled.

For all SVG circuits use:
- Dark background (#1a1a2e), bright component lines (#e0e0e0)
- Color coded: resistors (#ff9f43), capacitors (#54a0ff), inductors (#5f27cd)
- Component values labeled clearly
- Standard circuit symbols: resistor = zigzag, capacitor = parallel lines, 
  inductor = loops/bumps, voltage source = circle with +/-

## FULL QUESTION BANK
Embed all 109 questions in /lib/questions.ts with this schema:

interface Question {
  id: number
  originalNumber: number
  text: string
  type: 'multiple_choice' | 'true_false' | 'calculation'
  options?: { label: string; text: string }[]
  correctAnswer: string
  category: Category
  calculatorRequired: boolean
  diagramRef?: string        // e.g. 'figure_10_1'
  knownBadQuestion?: boolean // flag for Q10, Q28, Q32, Q95
  correctAnswerNote?: string // for bad questions: what's actually correct vs key
  concept: ConceptData
  nspireSteps?: NspireGuide
}

## QUESTION RANDOMIZATION & MULTI-FORMAT DELIVERY
Each question renders in a randomly selected format:
- original format (MC or T/F as written)
- fill-in-the-blank (key numerical value blanked out, user types it)
- numerical entry (calculation questions, user types answer)
- reverse question (show the answer, ask what question it answers — for concepts)

Never repeat same question in same format within one session.

## CONCEPT PANEL (required on every question)
Collapsible panel, available in Study Mode before answering:

interface ConceptData {
  principle: string          // plain English, 2-3 sentences max
  formulas: Formula[]        // with variable definitions
  workedExample: string      // similar problem fully solved
  wrongAnswerAnalysis: string // why each distractor is wrong
  relatedTopics: string[]    // links to related questions
}

## TI-NSPIRE CX II CALCULATOR GUIDE
For every calculatorRequired question, a dedicated panel:

interface NspireGuide {
  mode: 'degrees' | 'radians' | 'standard'  // what mode to set first
  modeSetupSteps: string[]   // exact keystrokes to set mode
  inputSteps: NspireStep[]   // step by step
  expectedOutput: string     // what screen shows
  interpretOutput: string    // how to map to answer choices
  warnings: string[]         // gotchas (degree vs radian, unit prefixes, etc)
}

interface NspireStep {
  stepNumber: number
  action: string    // "Press [menu]" or "Type: 2π×800×0.001"
  display: string   // what calculator screen shows after this step
  note?: string     // why you're doing this
}

Cover these operations explicitly:
- Setting degree vs radian mode: [home] > Settings > Document Settings
- Polar to rectangular: Press [menu] > 2 > 9 (Complex number tools)
- Rectangular to polar: same menu, use abs() and angle()
- Complex arithmetic: type directly as (a+b*i) notation, Nspire handles it
- Unit prefix entry: m = ×10⁻³, µ = ×10⁻⁶, k = ×10³
- arctan for phase angles: use tan⁻¹() in degree mode

## CLAUDE TUTOR INTEGRATION

### API Route: /api/tutor/route.ts
- Use @anthropic-ai/sdk with streaming
- Model: claude-sonnet-4-5 (cost efficient, fast)
- ANTHROPIC_API_KEY from environment variable (Vercel env vars)
- Stream response back to client

### System Prompt for the tutor (embed this):
"""
You are an AC circuits tutor built into a study app. The student is preparing 
for a test Monday on AC circuits, capacitors, inductors, phasors, complex 
numbers, and power factor.

The student is a Mechatronics Engineering Technology student at Austin Peay 
State University with strong hands-on manufacturing experience. He understands 
physical intuition well — connect abstract circuit concepts to physical reality 
when possible.

He uses a TI-Nspire CX II calculator for all math. When explaining calculations, 
always include exact Nspire keystrokes. Assume degree mode for phasor problems 
unless told otherwise.

Known problem areas from the question bank:
- Q10: Answer key says D (5.3µF) but correct is B (499µF) — key has an error
- Q28: Power calculation, angle subtraction done wrong in key, no correct 
  answer exists in choices (~161W)
- Q32: Power factor calculation, angle wrong in key, true answer ~0.5
- Q95: Time constant answer key off by 4 orders of magnitude (5µs, not 50ms)

Question bank topics: AC fundamentals, phasors, capacitor DC/AC behavior, 
inductor DC/AC behavior, complex number math, power in AC circuits.

Be direct and concise. Show the math. Give Nspire steps. Don't pad responses.
When a student asks about a bad question, explain both what the key says 
AND what the correct answer is.
"""

### Tutor UI Component
- Slide-in panel from right side, available on every question
- Shows current question context automatically
- Streaming text display
- Suggested prompts:
  - "Explain this concept from scratch"
  - "Walk me through the Nspire steps"
  - "Why is [wrong answer] wrong?"
  - "Give me a similar practice problem"
  - "What's the physical intuition here?"
- Token usage display (student has ~$50 budget, show approximate remaining)

## STUDY MODES

### 1. Quiz Mode
- Timed (configurable: 1min, 2min, or no limit per question)
- No concept panel until after answering
- Score tracking, end-of-quiz breakdown by category
- Flag questions during quiz for review

### 2. Study Mode  
- Untimed
- Concept panel available BEFORE answering
- Tutor available
- Nspire panel always visible for calculation questions

### 3. Weak Spots Mode
- Only shows questions previously answered wrong or flagged
- Tracks improvement across sessions

### 4. Category Drill
Filter by:
- AC Fundamentals & Phasors
- Capacitors (DC Behavior)
- Capacitors (AC Behavior)  
- Inductors (DC Behavior)
- Inductors (AC Behavior)
- Complex Numbers & Phasor Math
- Power Factor & AC Power

### 5. Calculator Drill Mode
- Only calculation questions
- Full Nspire walkthrough shown alongside
- Input the answer, app confirms and explains any discrepancy
- Good for building calculator muscle memory before Monday

## PROGRESS & PERSISTENCE
localStorage schema:
- questionHistory: { [id]: { attempts: number, correct: number, 
  flagged: boolean, lastSeen: Date } }
- sessionHistory: last 10 sessions with score/date/mode
- weakSpots: question IDs where accuracy < 70%

Dashboard on home screen:
- Overall % correct
- Questions attempted vs total (109)
- Weakest category
- Streak (days studied)
- Estimated readiness score

## UI/UX
- Dark mode only (#0f0f23 background)
- Font: Inter for UI, JetBrains Mono for formulas and calculator steps
- Color system: 
  - Correct: #00d2d3
  - Wrong: #ff6b6b  
  - Flagged: #ffd32a
  - Calculator accent: #0abde3 (Nspire blue)
  - Claude tutor accent: #a29bfe
- Mobile responsive — he may study on phone
- Keyboard shortcuts: Space = show answer, C = concept, N = Nspire, 
  T = tutor, Arrow keys = navigate

## ENVIRONMENT VARIABLES (Vercel)
ANTHROPIC_API_KEY=<student provides>

## VERCEL CONFIG
- vercel.json with appropriate function timeout for streaming (30s)
- .env.local.example file showing required vars

## DELIVERABLE CHECKLIST
Before considering this done:
[ ] All 109 questions embedded with correct answers from key
[ ] All 13 figures rendered as actual SVG/chart components
[ ] Every calculation question has complete Nspire steps
[ ] Every question has concept panel content
[ ] Claude tutor streams correctly via API route  
[ ] All 5 study modes functional
[ ] localStorage persistence working
[ ] Deploys to Vercel without errors
[ ] Q10, Q28, Q32, Q95 flagged with both key answer and correct answer
<<<<<<< HEAD
<<<<<<< HEAD
[ ] Mobile responsive
=======
[ ] Mobile responsive
>>>>>>> 8b17a9f (initial)
=======
[ ] Mobile responsive
>>>>>>> bc03cbd1ced04cfad0ccfeb987ae3f4006b8813e
