# INSTRUCTIONS FOR CLAUDE CODE

**Build me an interactive AC Circuits study app as a single self-contained HTML file. 
Here is the source material: [ATTACH YOUR CORRECTED PDF HERE]

## CORE REQUIREMENTS

### Question Bank
- Ingest ALL 109 questions from the PDF, including all diagram-based questions
- For diagram questions, describe the circuit clearly in text (values, topology) since 
  we can't embed the original images
- Use the ANSWER KEY at the end of the document as ground truth — some questions in 
  the body of the guide have errors; the answer key is authoritative
- Store questions with metadata: topic category, question type, difficulty, 
  calculator-required flag

### Question Delivery — Randomized & Multi-Modal
Generate questions in randomized order. For each question, randomly select from 
multiple presentation formats:
- Original multiple choice (A/B/C/D)
- True/False (for T/F questions)
- Fill-in-the-blank (remove the key value from the question stem)
- Numerical entry (for calculation questions — user types the answer)
- Matching format (group related questions together occasionally)

Never present the same question in the same format twice in the same session.

### Concept Explainer (This is critical)
Every single question MUST have a "Show Concept" button that reveals:
1. The core principle being tested (plain English, no fluff)
2. The relevant formula(s) with variable definitions
3. A worked example similar to the question
4. Common traps/wrong answer reasoning (why the distractors are wrong)
5. How this concept connects to other topics in the guide

### TI-Nspire CX II Calculator Guide (THIS IS NON-NEGOTIABLE — treat as equal 
priority to the question itself)
For EVERY question involving any calculation, include a dedicated "TI-Nspire Steps" 
panel that shows:
- Exact keystrokes and menu navigation (e.g., "Press [menu] > 2:Number > 1:Convert")
- What mode to be in (degrees vs radians — critical for phasor problems)
- Exactly what to type into the calculator entry line, copy-paste style
- What the screen should show at each step
- How to interpret the output and map it back to the answer choices
- Any unit conversions needed before/after calculator entry
- For complex number operations: how to use the Nspire's rectangular/polar conversion
- For trig functions in phasor problems: degree mode setup explicitly stated every time

Categories requiring Nspire guidance (flag these):
- Inductive/capacitive reactance calculations
- Phasor conversions (polar ↔ rectangular)
- Power factor calculations  
- Time constant problems (τ = RC or τ = L/R)
- Capacitance/inductance from given values
- Complex number arithmetic (multiply, divide, add)
- Frequency calculations
- Charge calculations (Q = CV)
- Any derivative-based current/voltage problems

### Study Session Modes
1. **Quiz Mode** — timed, randomized, tracks score, shows results at end
2. **Study Mode** — untimed, concept panel available before answering, no pressure
3. **Weak Spots Mode** — re-queues questions the user got wrong or flagged
4. **Category Drill** — filter by topic: Capacitors, Inductors, Phasors, Power, 
   Complex Numbers, AC Fundamentals
5. **Calculator Practice Mode** — shows ONLY calculation problems with full 
   Nspire walkthrough, no time pressure

### Progress Tracking (localStorage)
- Track correct/incorrect per question
- Show running score and percentage
- Flag questions for review
- "Questions I'm shaky on" list
- Session history (last 5 sessions scores)

### UI Requirements
- Dark mode by default (studying at night, eye strain matters)
- Mobile-friendly (he may study on his phone)
- Large, readable text for formulas
- Color coding: green = correct, red = wrong, yellow = flagged for review
- Progress bar showing how far through the question bank
- Quick-access sidebar showing topic categories with completion %

## TOPIC CATEGORIES TO AUTO-DETECT AND LABEL
- AC Fundamentals (phasors, standard form, derivatives of sinusoids)
- Capacitors — DC behavior (charging, time constants, series/parallel)
- Capacitors — AC behavior (reactance, phase relationships)
- Inductors — DC behavior (steady state, time constants, energy storage)  
- Inductors — AC behavior (reactance, phase relationships)
- Complex Numbers & Phasor Math (rectangular, polar, arithmetic)
- Power in AC Circuits (real power, power factor, leading/lagging)

## KNOWN ISSUES IN SOURCE DOCUMENT
The question numbering in the source has duplicates and inconsistencies. 
ChatGPT has reviewed and corrected the document before this prompt was run. 
Trust the corrected PDF's answer key section as ground truth. Where a question 
body and answer key conflict, the answer key wins. Flag any remaining 
inconsistencies you detect in a dev notes section accessible from the app menu.

## TECHNICAL SPECS
- Single HTML file, no external dependencies except CDN-loaded libraries if needed
- All question data embedded in the JS — no backend, no server
- Must work offline after initial load
- Test the app logic — make sure scoring works, localStorage persists, 
  and the Nspire panels show for every flagged calculation question

## DELIVERABLE
-make ready to deploy to vercel
