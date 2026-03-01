'use client'

export default function Figure11_1() {
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
        <line x1="200" y1="60" x2="230" y2="60" stroke="#e0e0e0" strokeWidth="2" />

        {/* Resistor (zigzag) */}
        <polyline
          points="230,60 238,48 254,72 270,48 286,72 302,48 310,60"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="270" y="38" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">10k&Omega;</text>
        <text x="270" y="90" textAnchor="middle" fill="#ff9f43" fontSize="11" fontFamily="monospace">R</text>

        {/* Wire from resistor to inductor */}
        <line x1="310" y1="60" x2="340" y2="60" stroke="#e0e0e0" strokeWidth="2" />

        {/* Inductor (bumps/loops) */}
        <path
          d="M340,60 C345,60 348,45 355,45 C362,45 362,60 368,60 C374,60 374,45 381,45 C388,45 388,60 394,60 C400,60 400,45 407,45 C414,45 414,60 420,60"
          fill="none"
          stroke="#5f27cd"
          strokeWidth="2.5"
        />
        <text x="380" y="38" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">50mH</text>
        <text x="380" y="85" textAnchor="middle" fill="#5f27cd" fontSize="11" fontFamily="monospace">L</text>

        {/* Wire from inductor down */}
        <line x1="420" y1="60" x2="420" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom wire back to source */}
        <line x1="80" y1="190" x2="80" y2="260" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="80" y1="260" x2="420" y2="260" stroke="#e0e0e0" strokeWidth="2" />

        {/* Current direction arrow on top wire */}
        <polygon points="215,54 225,60 215,66" fill="#00d2d3" />
        <text x="218" y="48" textAnchor="middle" fill="#00d2d3" fontSize="11" fontFamily="monospace">I</text>

        {/* Ground symbol */}
        <line x1="240" y1="260" x2="260" y2="260" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="243" y1="268" x2="257" y2="268" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="246" y1="276" x2="254" y2="276" stroke="#e0e0e0" strokeWidth="2" />

        {/* Title */}
        <text x="250" y="305" textAnchor="middle" fill="#a0a0b0" fontSize="13" fontFamily="monospace">
          Figure 11.1 &mdash; Series RL Circuit
        </text>
      </svg>
    </div>
  )
}
