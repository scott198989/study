'use client'

export default function Figure10_1() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <svg
        viewBox="0 0 500 320"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: '#1a1a2e', borderRadius: 8 }}
      >
        {/* Voltage Source */}
        <circle cx="80" cy="160" r="30" fill="none" stroke="#e0e0e0" strokeWidth="2" />
        <text x="80" y="148" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">+</text>
        <text x="80" y="178" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">&minus;</text>
        <text x="80" y="210" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">10V DC</text>

        {/* Top wire from source to switch */}
        <line x1="80" y1="130" x2="80" y2="60" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="80" y1="60" x2="150" y2="60" stroke="#e0e0e0" strokeWidth="2" />

        {/* Switch */}
        <circle cx="155" cy="60" r="4" fill="#e0e0e0" />
        <line x1="155" y1="60" x2="195" y2="45" stroke="#e0e0e0" strokeWidth="2" />
        <circle cx="200" cy="60" r="4" fill="#e0e0e0" />
        <text x="178" y="35" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">S</text>

        {/* Wire from switch to resistor */}
        <line x1="200" y1="60" x2="240" y2="60" stroke="#e0e0e0" strokeWidth="2" />

        {/* Resistor (zigzag) */}
        <polyline
          points="240,60 248,48 264,72 280,48 296,72 312,48 320,60"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="280" y="38" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">10k&Omega;</text>
        <text x="280" y="95" textAnchor="middle" fill="#ff9f43" fontSize="11" fontFamily="monospace">R</text>

        {/* Wire from resistor to capacitor */}
        <line x1="320" y1="60" x2="400" y2="60" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="400" y1="60" x2="400" y2="130" stroke="#e0e0e0" strokeWidth="2" />

        {/* Capacitor */}
        <line x1="385" y1="130" x2="415" y2="130" stroke="#54a0ff" strokeWidth="3" />
        <line x1="385" y1="145" x2="415" y2="145" stroke="#54a0ff" strokeWidth="3" />
        <text x="440" y="142" textAnchor="start" fill="#fff" fontSize="13" fontFamily="monospace">50&mu;F</text>
        <text x="370" y="142" textAnchor="end" fill="#54a0ff" fontSize="11" fontFamily="monospace">C</text>

        {/* Voltage polarity on capacitor */}
        <text x="425" y="125" textAnchor="start" fill="#00d2d3" fontSize="12" fontWeight="bold">+</text>
        <text x="425" y="158" textAnchor="start" fill="#00d2d3" fontSize="12" fontWeight="bold">&minus;</text>

        {/* Vc label */}
        <text x="455" y="142" textAnchor="start" fill="#00d2d3" fontSize="12" fontFamily="monospace">Vc</text>

        {/* Wire from capacitor to ground */}
        <line x1="400" y1="145" x2="400" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom wire back to source */}
        <line x1="80" y1="190" x2="80" y2="260" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="80" y1="260" x2="400" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Ground symbol */}
        <line x1="230" y1="260" x2="250" y2="260" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="233" y1="268" x2="247" y2="268" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="236" y1="276" x2="244" y2="276" stroke="#e0e0e0" strokeWidth="2" />

        {/* Title */}
        <text x="250" y="305" textAnchor="middle" fill="#a0a0b0" fontSize="13" fontFamily="monospace">
          Figure 10.1 &mdash; Series RC Circuit
        </text>
      </svg>
    </div>
  )
}
