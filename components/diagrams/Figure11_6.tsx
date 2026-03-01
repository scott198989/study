'use client'

export default function Figure11_6() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <svg
        viewBox="0 0 700 360"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: '#1a1a2e', borderRadius: 8 }}
      >
        {/* Voltage Source */}
        <circle cx="50" cy="180" r="28" fill="none" stroke="#e0e0e0" strokeWidth="2" />
        <text x="50" y="168" textAnchor="middle" fill="#e0e0e0" fontSize="14" fontWeight="bold">+</text>
        <text x="50" y="198" textAnchor="middle" fill="#e0e0e0" fontSize="14" fontWeight="bold">&minus;</text>
        <text x="50" y="225" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">10V</text>

        {/* Top wire from source */}
        <line x1="50" y1="152" x2="50" y2="40" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="50" y1="40" x2="100" y2="40" stroke="#e0e0e0" strokeWidth="2" />

        {/* Current label */}
        <polygon points="75,34 85,40 75,46" fill="#00d2d3" />
        <text x="80" y="28" textAnchor="middle" fill="#00d2d3" fontSize="12" fontFamily="monospace">I</text>

        {/* === Series 1kΩ Resistor === */}
        <polyline
          points="100,40 106,28 118,52 130,28 142,52 154,28 160,40"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text x="130" y="22" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace">1k&Omega;</text>

        {/* Wire to first parallel group */}
        <line x1="160" y1="40" x2="200" y2="40" stroke="#e0e0e0" strokeWidth="2" />
        <circle cx="200" cy="40" r="3" fill="#e0e0e0" />

        {/* === First Parallel Group: (4kΩ + 10mH) || 10µF === */}
        {/* Left path: 4kΩ in series with 10mH */}
        <line x1="200" y1="40" x2="200" y2="75" stroke="#e0e0e0" strokeWidth="2" />
        <polyline
          points="200,75 212,80 188,90 212,100 188,110 212,120 200,125"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text x="170" y="105" textAnchor="end" fill="#fff" fontSize="11" fontFamily="monospace">4k&Omega;</text>

        {/* 10mH inductor vertical */}
        <line x1="200" y1="125" x2="200" y2="140" stroke="#e0e0e0" strokeWidth="2" />
        <path d="M200,140 C206,140 210,133 210,130 C210,127 206,120 200,120" fill="none" stroke="#5f27cd" strokeWidth="0" />
        <path
          d="M200,140 C207,140 212,135 212,131 C212,127 207,140 200,140"
          fill="none" stroke="#5f27cd" strokeWidth="2"
        />
        {/* Simplified inductor bumps */}
        <path
          d="M200,142 C194,142 189,148 189,152 C189,156 194,162 200,162"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M200,162 C194,162 189,168 189,172 C189,176 194,182 200,182"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M200,182 C194,182 189,188 189,192 C189,196 194,202 200,202"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <text x="170" y="178" textAnchor="end" fill="#fff" fontSize="11" fontFamily="monospace">10mH</text>
        <line x1="200" y1="202" x2="200" y2="300" stroke="#e0e0e0" strokeWidth="2" />

        {/* Right path: 10µF capacitor */}
        <line x1="200" y1="40" x2="280" y2="40" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="280" y1="40" x2="280" y2="150" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="266" y1="150" x2="294" y2="150" stroke="#54a0ff" strokeWidth="3" />
        <line x1="266" y1="165" x2="294" y2="165" stroke="#54a0ff" strokeWidth="3" />
        <text x="300" y="162" textAnchor="start" fill="#fff" fontSize="11" fontFamily="monospace">10&mu;F</text>
        <line x1="280" y1="165" x2="280" y2="300" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom junction of first parallel group */}
        <circle cx="200" cy="300" r="3" fill="#e0e0e0" />
        <line x1="200" y1="300" x2="280" y2="300" stroke="#e0e0e0" strokeWidth="2" />

        {/* Wire from first parallel group to series 10kΩ */}
        <line x1="280" y1="40" x2="340" y2="40" stroke="#e0e0e0" strokeWidth="2" />

        {/* === Series 10kΩ Resistor === */}
        <polyline
          points="340,40 346,28 358,52 370,28 382,52 394,28 400,40"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text x="370" y="22" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace">10k&Omega;</text>

        {/* Wire to second parallel group */}
        <line x1="400" y1="40" x2="440" y2="40" stroke="#e0e0e0" strokeWidth="2" />
        <circle cx="440" cy="40" r="3" fill="#e0e0e0" />

        {/* === Second Parallel Group: 10kΩ || 1µF === */}
        {/* Left path: 10kΩ */}
        <line x1="440" y1="40" x2="440" y2="80" stroke="#e0e0e0" strokeWidth="2" />
        <polyline
          points="440,80 452,85 428,95 452,105 428,115 452,125 440,130"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text x="415" y="110" textAnchor="end" fill="#fff" fontSize="11" fontFamily="monospace">10k&Omega;</text>
        <line x1="440" y1="130" x2="440" y2="230" stroke="#e0e0e0" strokeWidth="2" />

        {/* Right path: 1µF */}
        <line x1="440" y1="40" x2="530" y2="40" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="530" y1="40" x2="530" y2="125" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="516" y1="125" x2="544" y2="125" stroke="#54a0ff" strokeWidth="3" />
        <line x1="516" y1="140" x2="544" y2="140" stroke="#54a0ff" strokeWidth="3" />
        <text x="550" y="137" textAnchor="start" fill="#fff" fontSize="11" fontFamily="monospace">1&mu;F</text>
        <line x1="530" y1="140" x2="530" y2="230" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom junction of second parallel group */}
        <circle cx="440" cy="230" r="3" fill="#e0e0e0" />
        <line x1="440" y1="230" x2="530" y2="230" stroke="#e0e0e0" strokeWidth="2" />

        {/* Wire from second parallel to 50mH inductor */}
        <line x1="440" y1="230" x2="440" y2="245" stroke="#e0e0e0" strokeWidth="2" />

        {/* 50mH inductor vertical */}
        <path
          d="M440,245 C434,245 429,251 429,255 C429,259 434,265 440,265"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M440,265 C434,265 429,271 429,275 C429,279 434,285 440,285"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M440,285 C434,285 429,291 429,295 C429,299 434,305 440,305"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <text x="415" y="280" textAnchor="end" fill="#fff" fontSize="11" fontFamily="monospace">50mH</text>

        {/* Wire to bottom */}
        <line x1="440" y1="305" x2="440" y2="330" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom wire back to source */}
        <line x1="50" y1="208" x2="50" y2="330" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="50" y1="330" x2="440" y2="330" stroke="#e0e0e0" strokeWidth="2" />

        {/* Ground */}
        <line x1="240" y1="330" x2="260" y2="330" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="243" y1="338" x2="257" y2="338" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="246" y1="346" x2="254" y2="346" stroke="#e0e0e0" strokeWidth="2" />

        {/* Title */}
        <text x="350" y="356" textAnchor="middle" fill="#a0a0b0" fontSize="12" fontFamily="monospace">
          Figure 11.6 &mdash; Complex RLC Network
        </text>
      </svg>
    </div>
  )
}
