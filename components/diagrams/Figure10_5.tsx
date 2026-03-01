'use client'

export default function Figure10_5() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <svg
        viewBox="0 0 500 380"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: '#1a1a2e', borderRadius: 8 }}
      >
        {/* Voltage Source */}
        <circle cx="70" cy="190" r="30" fill="none" stroke="#e0e0e0" strokeWidth="2" />
        <text x="70" y="178" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">+</text>
        <text x="70" y="208" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">&minus;</text>
        <text x="70" y="240" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">15V</text>

        {/* Top wire from source */}
        <line x1="70" y1="160" x2="70" y2="50" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="70" y1="50" x2="200" y2="50" stroke="#e0e0e0" strokeWidth="2" />

        {/* Top junction */}
        <circle cx="200" cy="50" r="3" fill="#e0e0e0" />
        <line x1="200" y1="50" x2="370" y2="50" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom wire from source */}
        <line x1="70" y1="220" x2="70" y2="330" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="70" y1="330" x2="200" y2="330" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom junction */}
        <circle cx="200" cy="330" r="3" fill="#e0e0e0" />
        <line x1="200" y1="330" x2="370" y2="330" stroke="#e0e0e0" strokeWidth="2" />

        {/* === Left Branch: 5kΩ + 10µF === */}
        <line x1="200" y1="50" x2="200" y2="90" stroke="#e0e0e0" strokeWidth="2" />

        {/* 5kΩ Resistor */}
        <polyline
          points="200,90 208,78 224,102 240,78 256,102 272,78 280,90"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2.5"
          strokeLinejoin="round"
          transform="rotate(90, 200, 140) translate(-40, 0)"
        />
        {/* Draw resistor vertically manually */}
        <line x1="200" y1="90" x2="200" y2="95" stroke="#e0e0e0" strokeWidth="2" />
        <polyline
          points="200,95 212,100 188,110 212,120 188,130 212,140 200,145"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="150" y="125" textAnchor="end" fill="#fff" fontSize="13" fontFamily="monospace">5k&Omega;</text>
        <text x="220" y="125" textAnchor="start" fill="#ff9f43" fontSize="11" fontFamily="monospace">R1</text>

        {/* Wire between R1 and C1 */}
        <line x1="200" y1="145" x2="200" y2="210" stroke="#e0e0e0" strokeWidth="2" />

        {/* 10µF Capacitor */}
        <line x1="180" y1="210" x2="220" y2="210" stroke="#54a0ff" strokeWidth="3" />
        <line x1="180" y1="227" x2="220" y2="227" stroke="#54a0ff" strokeWidth="3" />
        <text x="150" y="223" textAnchor="end" fill="#fff" fontSize="13" fontFamily="monospace">10&mu;F</text>
        <text x="230" y="223" textAnchor="start" fill="#54a0ff" fontSize="11" fontFamily="monospace">C1</text>

        {/* Wire from C1 to bottom */}
        <line x1="200" y1="227" x2="200" y2="330" stroke="#e0e0e0" strokeWidth="2" />

        {/* === Right Branch: 10kΩ + 5µF === */}
        <line x1="370" y1="50" x2="370" y2="90" stroke="#e0e0e0" strokeWidth="2" />

        {/* 10kΩ Resistor */}
        <line x1="370" y1="90" x2="370" y2="95" stroke="#e0e0e0" strokeWidth="2" />
        <polyline
          points="370,95 382,100 358,110 382,120 358,130 382,140 370,145"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="335" y="125" textAnchor="end" fill="#fff" fontSize="13" fontFamily="monospace">10k&Omega;</text>
        <text x="392" y="125" textAnchor="start" fill="#ff9f43" fontSize="11" fontFamily="monospace">R2</text>

        {/* Wire between R2 and C2 */}
        <line x1="370" y1="145" x2="370" y2="210" stroke="#e0e0e0" strokeWidth="2" />

        {/* 5µF Capacitor */}
        <line x1="350" y1="210" x2="390" y2="210" stroke="#54a0ff" strokeWidth="3" />
        <line x1="350" y1="227" x2="390" y2="227" stroke="#54a0ff" strokeWidth="3" />
        <text x="330" y="223" textAnchor="end" fill="#fff" fontSize="13" fontFamily="monospace">5&mu;F</text>
        <text x="400" y="223" textAnchor="start" fill="#54a0ff" fontSize="11" fontFamily="monospace">C2</text>

        {/* Wire from C2 to bottom */}
        <line x1="370" y1="227" x2="370" y2="330" stroke="#e0e0e0" strokeWidth="2" />

        {/* Title */}
        <text x="250" y="365" textAnchor="middle" fill="#a0a0b0" fontSize="13" fontFamily="monospace">
          Figure 10.5 &mdash; Two-Branch RC Voltage Divider
        </text>
      </svg>
    </div>
  )
}
