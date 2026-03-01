'use client'

export default function Figure10_4() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <svg
        viewBox="0 0 460 300"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: '#1a1a2e', borderRadius: 8 }}
      >
        {/* Voltage Source */}
        <circle cx="80" cy="150" r="30" fill="none" stroke="#e0e0e0" strokeWidth="2" />
        <text x="80" y="138" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">+</text>
        <text x="80" y="168" textAnchor="middle" fill="#e0e0e0" fontSize="16" fontWeight="bold">&minus;</text>
        <text x="80" y="200" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">25V</text>

        {/* Top wire */}
        <line x1="80" y1="120" x2="80" y2="50" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="80" y1="50" x2="200" y2="50" stroke="#e0e0e0" strokeWidth="2" />

        {/* Junction top */}
        <circle cx="200" cy="50" r="3" fill="#e0e0e0" />
        <line x1="200" y1="50" x2="340" y2="50" stroke="#e0e0e0" strokeWidth="2" />

        {/* Bottom wire */}
        <line x1="80" y1="180" x2="80" y2="250" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="80" y1="250" x2="200" y2="250" stroke="#e0e0e0" strokeWidth="2" />

        {/* Junction bottom */}
        <circle cx="200" cy="250" r="3" fill="#e0e0e0" />
        <line x1="200" y1="250" x2="340" y2="250" stroke="#e0e0e0" strokeWidth="2" />

        {/* Left capacitor 10µF */}
        <line x1="200" y1="50" x2="200" y2="125" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="180" y1="125" x2="220" y2="125" stroke="#54a0ff" strokeWidth="3" />
        <line x1="180" y1="142" x2="220" y2="142" stroke="#54a0ff" strokeWidth="3" />
        <text x="230" y="138" textAnchor="start" fill="#fff" fontSize="13" fontFamily="monospace">10&mu;F</text>
        <text x="170" y="138" textAnchor="end" fill="#54a0ff" fontSize="11" fontFamily="monospace">C1</text>
        <line x1="200" y1="142" x2="200" y2="250" stroke="#e0e0e0" strokeWidth="2" />

        {/* Right capacitor 5µF */}
        <line x1="340" y1="50" x2="340" y2="125" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="320" y1="125" x2="360" y2="125" stroke="#54a0ff" strokeWidth="3" />
        <line x1="320" y1="142" x2="360" y2="142" stroke="#54a0ff" strokeWidth="3" />
        <text x="370" y="138" textAnchor="start" fill="#fff" fontSize="13" fontFamily="monospace">5&mu;F</text>
        <text x="310" y="138" textAnchor="end" fill="#54a0ff" fontSize="11" fontFamily="monospace">C2</text>
        <line x1="340" y1="142" x2="340" y2="250" stroke="#e0e0e0" strokeWidth="2" />

        {/* Title */}
        <text x="230" y="285" textAnchor="middle" fill="#a0a0b0" fontSize="13" fontFamily="monospace">
          Figure 10.4 &mdash; Parallel Capacitor Circuit
        </text>
      </svg>
    </div>
  )
}
