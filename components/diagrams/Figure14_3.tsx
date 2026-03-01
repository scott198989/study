'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Generate sinusoidal data
// V1 peaks at π/2 (standard sine), V2 peaks at 3π/4 (shifted by π/4)
const data: { angle: number; angleLabel: string; V1: number; V2: number }[] = []
const steps = 200
for (let i = 0; i <= steps; i++) {
  const angle = (i / steps) * 2 * Math.PI
  const V1 = Math.sin(angle)
  const V2 = Math.sin(angle - Math.PI / 4) // V2 lags V1 by π/4
  data.push({
    angle: parseFloat(angle.toFixed(4)),
    angleLabel: '',
    V1: parseFloat(V1.toFixed(4)),
    V2: parseFloat(V2.toFixed(4)),
  })
}

const piTicks = [
  0,
  Math.PI / 2,
  Math.PI,
  (3 * Math.PI) / 2,
  2 * Math.PI,
]

const piLabels: Record<string, string> = {
  '0': '0',
  [String(Math.PI / 2)]: '\u03C0/2',
  [String(Math.PI)]: '\u03C0',
  [String((3 * Math.PI) / 2)]: '3\u03C0/2',
  [String(2 * Math.PI)]: '2\u03C0',
}

function formatPiTick(value: number): string {
  // Find closest pi tick
  for (const tick of piTicks) {
    if (Math.abs(value - tick) < 0.05) {
      return piLabels[String(tick)] || ''
    }
  }
  return ''
}

export default function Figure14_3() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', backgroundColor: '#1a1a2e', borderRadius: 8, padding: '20px 10px 10px 0' }}>
      <p style={{ textAlign: 'center', color: '#a0a0b0', fontFamily: 'monospace', fontSize: 13, marginBottom: 4 }}>
        Figure 14.3 &mdash; Two Sinusoidal Voltage Waveforms
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 10 }}>
        <span style={{ color: '#00d2d3', fontFamily: 'monospace', fontSize: 12 }}>
          &#9632; V1 (leads)
        </span>
        <span style={{ color: '#ff6b6b', fontFamily: 'monospace', fontSize: 12 }}>
          &#9632; V2 (lags by 45&deg;)
        </span>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid stroke="#2a2a4a" strokeDasharray="3 3" />
          <XAxis
            dataKey="angle"
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0', fontSize: 12 }}
            type="number"
            domain={[0, 2 * Math.PI]}
            ticks={piTicks}
            tickFormatter={formatPiTick}
            label={{ value: 'Angle (rad)', position: 'insideBottomRight', offset: -5, fill: '#a0a0b0', fontSize: 12 }}
          />
          <YAxis
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0', fontSize: 12 }}
            domain={[-1.2, 1.2]}
            ticks={[-1, -0.5, 0, 0.5, 1]}
            label={{ value: 'Voltage (V)', angle: -90, position: 'insideLeft', fill: '#a0a0b0', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#16213e', border: '1px solid #2a2a4a', borderRadius: 6, color: '#e0e0e0' }}
            labelStyle={{ color: '#a0a0b0' }}
            formatter={((value: number | string | undefined, name: string) => [
              Number(value ?? 0).toFixed(3),
              name,
            ]) as never}
            labelFormatter={((label: number | string) => `\u03B8 = ${(Number(label) / Math.PI).toFixed(2)}\u03C0 rad`) as never}
          />
          <Line
            type="monotone"
            dataKey="V1"
            stroke="#00d2d3"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: '#00d2d3' }}
            name="V1"
          />
          <Line
            type="monotone"
            dataKey="V2"
            stroke="#ff6b6b"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: '#ff6b6b' }}
            name="V2"
          />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: '#a0a0b0', fontFamily: 'monospace', fontSize: 11, marginTop: 4 }}>
        V1 leads V2 by &pi;/4 (45&deg;)
      </p>
    </div>
  )
}
