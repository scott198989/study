'use client'

export default function Figure10_3() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <svg
        viewBox="0 0 520 360"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: '#1a1a2e', borderRadius: 8 }}
      >
        {/* Voltage Source */}
        <circle cx="70" cy="180" r="30" fill="none" stroke="#e0e0e0" strokeWidth="2" />
        <text x="70" y="168" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">+</text>
        <text x="70" y="198" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">&minus;</text>
        <text x="70" y="228" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">10V</text>

        {/* Top wire from source */}
        <line x1="70" y1="150" x2="70" y2="60" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="70" y1="60" x2="180" y2="60" stroke="#e0e0e0" strokeWidth="2" />

        {/* CT arrow */}
        <line x1="140" y1="60" x2="140" y2="100" stroke="#00d2d3" strokeWidth="1.5" />
        <polygon points="140,105 136,97 144,97" fill="#00d2d3" />
        <text x="155" y="105" textAnchor="start" fill="#00d2d3" fontSize="12" fontFamily="monospace">CT</text>

        {/* Junction point top */}
        <circle cx="180" cy="60" r="3" fill="#e0e0e0" />
        <line x1="180" y1="60" x2="440" y2="60" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom wire from source */}
        <line x1="70" y1="210" x2="70" y2="300" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="70" y1="300" x2="180" y2="300" stroke="#e0e0e0" strokeWidth="2" />

        {/* Junction point bottom */}
        <circle cx="180" cy="300" r="3" fill="#e0e0e0" />
        <line x1="180" y1="300" x2="440" y2="300" stroke="#e0e0e0" strokeWidth="2" />

        {/* === Top Branch: Two 100µF caps in series === */}
        {/* Wire to first cap */}
        <line x1="180" y1="60" x2="180" y2="120" stroke="#e0e0e0" strokeWidth="2" />

        {/* First capacitor (100µF) */}
        <line x1="165" y1="120" x2="195" y2="120" stroke="#54a0ff" strokeWidth="3" />
        <line x1="165" y1="135" x2="195" y2="135" stroke="#54a0ff" strokeWidth="3" />
        <text x="205" y="132" textAnchor="start" fill="#fff" fontSize="12" fontFamily="monospace">100&mu;F</text>

        {/* Wire between caps */}
        <line x1="180" y1="135" x2="180" y2="165" stroke="#e0e0e0" strokeWidth="2" />

        {/* Second capacitor (100µF) */}
        <line x1="165" y1="165" x2="195" y2="165" stroke="#54a0ff" strokeWidth="3" />
        <line x1="165" y1="180" x2="195" y2="180" stroke="#54a0ff" strokeWidth="3" />
        <text x="205" y="177" textAnchor="start" fill="#fff" fontSize="12" fontFamily="monospace">100&mu;F</text>

        {/* Wire from second cap to bottom */}
        <line x1="180" y1="180" x2="180" y2="300" stroke="#e0e0e0" strokeWidth="2" />

        {/* Top branch label */}
        <text x="250" y="150" textAnchor="start" fill="#54a0ff" fontSize="11" fontFamily="monospace">Series</text>

        {/* === Bottom Branch: Two 25µF caps in parallel === */}
        {/* Top junction */}
        <line x1="440" y1="60" x2="440" y2="120" stroke="#e0e0e0" strokeWidth="2" />

        {/* Split into two parallel paths */}
        <circle cx="440" cy="120" r="3" fill="#e0e0e0" />

        {/* Left parallel cap */}
        <line x1="440" y1="120" x2="390" y2="120" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="390" y1="120" x2="390" y2="165" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="375" y1="165" x2="405" y2="165" stroke="#54a0ff" strokeWidth="3" />
        <line x1="375" y1="180" x2="405" y2="180" stroke="#54a0ff" strokeWidth="3" />
        <text x="345" y="177" textAnchor="end" fill="#fff" fontSize="12" fontFamily="monospace">25&mu;F</text>
        <line x1="390" y1="180" x2="390" y2="240" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="390" y1="240" x2="440" y2="240" stroke="#e0e0e0" strokeWidth="2" />

        {/* Right parallel cap */}
        <line x1="440" y1="120" x2="490" y2="120" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="490" y1="120" x2="490" y2="165" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="475" y1="165" x2="505" y2="165" stroke="#54a0ff" strokeWidth="3" />
        <line x1="475" y1="180" x2="505" y2="180" stroke="#54a0ff" strokeWidth="3" />
        <text x="500" y="160" textAnchor="start" fill="#fff" fontSize="12" fontFamily="monospace">25&mu;F</text>
        <line x1="490" y1="180" x2="490" y2="240" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="490" y1="240" x2="440" y2="240" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom junction */}
        <circle cx="440" cy="240" r="3" fill="#e0e0e0" />
        <line x1="440" y1="240" x2="440" y2="300" stroke="#e0e0e0" strokeWidth="2" />

        {/* Parallel label */}
        <text x="440" y="268" textAnchor="middle" fill="#54a0ff" fontSize="11" fontFamily="monospace">Parallel</text>

        {/* Title */}
        <text x="260" y="340" textAnchor="middle" fill="#a0a0b0" fontSize="13" fontFamily="monospace">
          Figure 10.3 &mdash; Mixed Capacitor Network
        </text>
      </svg>
    </div>
  )
}
