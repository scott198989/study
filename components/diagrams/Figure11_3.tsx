'use client'

export default function Figure11_3() {
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
        <text x="70" y="210" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">10V</text>

        {/* Top wire from source */}
        <line x1="70" y1="130" x2="70" y2="55" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="70" y1="55" x2="140" y2="55" stroke="#e0e0e0" strokeWidth="2" />

        {/* Series 1kΩ Resistor */}
        <polyline
          points="140,55 148,43 164,67 180,43 196,67 212,43 220,55"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="180" y="35" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">1k&Omega;</text>
        <text x="180" y="82" textAnchor="middle" fill="#ff9f43" fontSize="11" fontFamily="monospace">R1</text>

        {/* Wire from series resistor to junction */}
        <line x1="220" y1="55" x2="310" y2="55" stroke="#e0e0e0" strokeWidth="2" />

        {/* Top junction */}
        <circle cx="310" cy="55" r="3" fill="#e0e0e0" />
        <line x1="310" y1="55" x2="430" y2="55" stroke="#e0e0e0" strokeWidth="2" />

        {/* === Left parallel path: 10kΩ resistor === */}
        <line x1="310" y1="55" x2="310" y2="100" stroke="#e0e0e0" strokeWidth="2" />
        <polyline
          points="310,100 322,105 298,115 322,125 298,135 322,145 310,150"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="270" y="130" textAnchor="end" fill="#fff" fontSize="13" fontFamily="monospace">10k&Omega;</text>
        <text x="330" y="130" textAnchor="start" fill="#ff9f43" fontSize="11" fontFamily="monospace">R2</text>
        <line x1="310" y1="150" x2="310" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* === Right parallel path: 10mH inductor === */}
        <line x1="430" y1="55" x2="430" y2="110" stroke="#e0e0e0" strokeWidth="2" />
        <path
          d="M430,110 C430,110 435,98 440,98 C445,98 445,110 450,110 C455,110 455,98 460,98 C465,98 465,110 470,110 C475,110 475,98 480,98 C485,98 485,110 485,110"
          fill="none"
          stroke="#5f27cd"
          strokeWidth="2.5"
          transform="rotate(90, 430, 140) translate(-30, 0)"
        />
        {/* Simplified vertical inductor */}
        <path
          d="M430,115 C436,115 440,108 440,105 C440,102 436,95 430,95"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M430,132 C436,132 440,125 440,122 C440,119 436,112 430,112"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M430,149 C436,149 440,142 440,139 C440,136 436,129 430,129"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M430,166 C436,166 440,159 440,156 C440,153 436,146 430,146"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <text x="455" y="140" textAnchor="start" fill="#fff" fontSize="13" fontFamily="monospace">10mH</text>
        <text x="455" y="155" textAnchor="start" fill="#5f27cd" fontSize="11" fontFamily="monospace">L</text>
        <line x1="430" y1="166" x2="430" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom junction */}
        <circle cx="310" cy="260" r="3" fill="#e0e0e0" />
        <line x1="310" y1="260" x2="430" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom wire back to source */}
        <line x1="70" y1="190" x2="70" y2="260" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="70" y1="260" x2="310" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Title */}
        <text x="260" y="300" textAnchor="middle" fill="#a0a0b0" fontSize="13" fontFamily="monospace">
          Figure 11.3 &mdash; RL Circuit with Parallel Branch
        </text>
      </svg>
    </div>
  )
}
