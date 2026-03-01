'use client'

export default function Figure10_6() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <svg
        viewBox="0 0 520 320"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: '#1a1a2e', borderRadius: 8 }}
      >
        {/* Voltage Source */}
        <circle cx="70" cy="160" r="30" fill="none" stroke="#e0e0e0" strokeWidth="2" />
        <text x="70" y="148" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">+</text>
        <text x="70" y="178" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">&minus;</text>
        <text x="70" y="210" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">60V</text>

        {/* Top wire from source */}
        <line x1="70" y1="130" x2="70" y2="50" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="70" y1="50" x2="180" y2="50" stroke="#e0e0e0" strokeWidth="2" />

        {/* Series 30µF capacitor on top */}
        <line x1="180" y1="35" x2="180" y2="65" stroke="#54a0ff" strokeWidth="3" />
        <line x1="197" y1="35" x2="197" y2="65" stroke="#54a0ff" strokeWidth="3" />
        <text x="188" y="28" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">30&mu;F</text>
        <text x="188" y="85" textAnchor="middle" fill="#54a0ff" fontSize="11" fontFamily="monospace">C1</text>

        {/* Wire from series cap to parallel group */}
        <line x1="197" y1="50" x2="300" y2="50" stroke="#e0e0e0" strokeWidth="2" />

        {/* Junction before parallel */}
        <circle cx="300" cy="50" r="3" fill="#e0e0e0" />

        {/* Split to two parallel paths */}
        {/* Left parallel path: 20µF */}
        <line x1="300" y1="50" x2="300" y2="125" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="280" y1="125" x2="320" y2="125" stroke="#54a0ff" strokeWidth="3" />
        <line x1="280" y1="142" x2="320" y2="142" stroke="#54a0ff" strokeWidth="3" />
        <text x="260" y="138" textAnchor="end" fill="#fff" fontSize="13" fontFamily="monospace">20&mu;F</text>
        <text x="325" y="138" textAnchor="start" fill="#54a0ff" fontSize="11" fontFamily="monospace">C2</text>
        <line x1="300" y1="142" x2="300" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Right parallel path: 40µF */}
        <line x1="300" y1="50" x2="420" y2="50" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="420" y1="50" x2="420" y2="125" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="400" y1="125" x2="440" y2="125" stroke="#54a0ff" strokeWidth="3" />
        <line x1="400" y1="142" x2="440" y2="142" stroke="#54a0ff" strokeWidth="3" />
        <text x="450" y="138" textAnchor="start" fill="#fff" fontSize="13" fontFamily="monospace">40&mu;F</text>
        <text x="390" y="138" textAnchor="end" fill="#54a0ff" fontSize="11" fontFamily="monospace">C3</text>
        <line x1="420" y1="142" x2="420" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom junction */}
        <line x1="300" y1="260" x2="420" y2="260" stroke="#e0e0e0" strokeWidth="2" />
        <circle cx="300" cy="260" r="3" fill="#e0e0e0" />

        {/* Bottom wire back to source */}
        <line x1="70" y1="190" x2="70" y2="260" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="70" y1="260" x2="300" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Title */}
        <text x="260" y="300" textAnchor="middle" fill="#a0a0b0" fontSize="13" fontFamily="monospace">
          Figure 10.6 &mdash; Series-Parallel Capacitor Circuit
        </text>
      </svg>
    </div>
  )
}
