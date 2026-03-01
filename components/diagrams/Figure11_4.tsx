'use client'

export default function Figure11_4() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <svg
        viewBox="0 0 560 400"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: '#1a1a2e', borderRadius: 8 }}
      >
        {/* Input wire with series 1kΩ resistor */}
        <line x1="30" y1="60" x2="60" y2="60" stroke="#e0e0e0" strokeWidth="2" />
        <polyline
          points="60,60 68,48 84,72 100,48 116,72 132,48 140,60"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="100" y="38" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">1k&Omega;</text>
        <text x="100" y="90" textAnchor="middle" fill="#ff9f43" fontSize="11" fontFamily="monospace">R</text>

        {/* Wire to LT junction */}
        <line x1="140" y1="60" x2="200" y2="60" stroke="#e0e0e0" strokeWidth="2" />

        {/* LT arrow */}
        <line x1="175" y1="60" x2="175" y2="100" stroke="#00d2d3" strokeWidth="1.5" />
        <polygon points="175,105 171,97 179,97" fill="#00d2d3" />
        <text x="185" y="105" textAnchor="start" fill="#00d2d3" fontSize="13" fontWeight="bold" fontFamily="monospace">LT</text>

        {/* Main junction */}
        <circle cx="200" cy="60" r="3" fill="#e0e0e0" />

        {/* === Branch 1: 60mH parallel with 30mH series, then series 100mH === */}
        {/* Upper path from junction */}
        <line x1="200" y1="60" x2="200" y2="30" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="200" y1="30" x2="240" y2="30" stroke="#e0e0e0" strokeWidth="2" />

        {/* Split: top sub-branch 60mH */}
        <circle cx="240" cy="30" r="3" fill="#e0e0e0" />
        <line x1="240" y1="30" x2="240" y2="10" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="240" y1="10" x2="270" y2="10" stroke="#e0e0e0" strokeWidth="2" />

        {/* 60mH inductor (horizontal) */}
        <path
          d="M270,10 C270,4 276,0 280,0 C284,0 284,10 288,10 C288,4 294,0 298,0 C302,0 302,10 306,10 C306,4 312,0 316,0 C320,0 320,10 324,10"
          fill="none"
          stroke="#5f27cd"
          strokeWidth="2.5"
        />
        <text x="297" y="-8" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">60mH</text>

        <line x1="324" y1="10" x2="370" y2="10" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="370" y1="10" x2="370" y2="30" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom sub-branch 30mH */}
        <line x1="240" y1="30" x2="240" y2="50" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="240" y1="50" x2="270" y2="50" stroke="#e0e0e0" strokeWidth="2" />

        {/* 30mH inductor (horizontal) */}
        <path
          d="M270,50 C270,44 276,40 280,40 C284,40 284,50 288,50 C288,44 294,40 298,40 C302,40 302,50 306,50 C306,44 312,40 316,40 C320,40 320,50 324,50"
          fill="none"
          stroke="#5f27cd"
          strokeWidth="2.5"
        />
        <text x="297" y="68" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">30mH</text>

        <line x1="324" y1="50" x2="370" y2="50" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="370" y1="50" x2="370" y2="30" stroke="#e0e0e0" strokeWidth="2" />

        {/* Junction after parallel group */}
        <circle cx="370" cy="30" r="3" fill="#e0e0e0" />
        <line x1="370" y1="30" x2="400" y2="30" stroke="#e0e0e0" strokeWidth="2" />

        {/* Series 100mH inductor */}
        <path
          d="M400,30 C400,24 406,20 410,20 C414,20 414,30 418,30 C418,24 424,20 428,20 C432,20 432,30 436,30 C436,24 442,20 446,20 C450,20 450,30 454,30"
          fill="none"
          stroke="#5f27cd"
          strokeWidth="2.5"
        />
        <text x="427" y="12" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">100mH</text>

        {/* Wire from 100mH to bottom */}
        <line x1="454" y1="30" x2="500" y2="30" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="500" y1="30" x2="500" y2="340" stroke="#e0e0e0" strokeWidth="2" />

        {/* === Branch 2: 500mH === */}
        <line x1="200" y1="60" x2="200" y2="200" stroke="#e0e0e0" strokeWidth="2" />

        {/* 500mH inductor (vertical) */}
        <path
          d="M200,200 C194,200 190,206 190,210 C190,214 194,220 200,220"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M200,220 C194,220 190,226 190,230 C190,234 194,240 200,240"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M200,240 C194,240 190,246 190,250 C190,254 194,260 200,260"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <path
          d="M200,260 C194,260 190,266 190,270 C190,274 194,280 200,280"
          fill="none" stroke="#5f27cd" strokeWidth="2.5"
        />
        <text x="165" y="245" textAnchor="end" fill="#fff" fontSize="12" fontFamily="monospace">500mH</text>

        <line x1="200" y1="280" x2="200" y2="340" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom wire connecting both branches */}
        <line x1="200" y1="340" x2="500" y2="340" stroke="#e0e0e0" strokeWidth="2" />
        <circle cx="200" cy="340" r="3" fill="#e0e0e0" />

        {/* Ground return wire */}
        <line x1="30" y1="60" x2="30" y2="340" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="30" y1="340" x2="200" y2="340" stroke="#e0e0e0" strokeWidth="2" />

        {/* Title */}
        <text x="280" y="385" textAnchor="middle" fill="#a0a0b0" fontSize="13" fontFamily="monospace">
          Figure 11.4 &mdash; Inductor Network
        </text>
      </svg>
    </div>
  )
}
