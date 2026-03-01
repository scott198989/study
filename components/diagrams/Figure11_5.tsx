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

// Generate data points for the exponential curves
const data: { tau: number; rising: number; falling: number }[] = []
for (let i = 0; i <= 60; i++) {
  const t = i / 10 // 0 to 6 in 0.1 increments
  data.push({
    tau: parseFloat(t.toFixed(1)),
    rising: parseFloat((1 - Math.exp(-t)).toFixed(4)),
    falling: parseFloat(Math.exp(-t).toFixed(4)),
  })
}

export default function Figure11_5() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', backgroundColor: '#1a1a2e', borderRadius: 8, padding: '20px 10px 10px 0' }}>
      <p style={{ textAlign: 'center', color: '#a0a0b0', fontFamily: 'monospace', fontSize: 13, marginBottom: 4 }}>
        Figure 11.5 &mdash; Dual Exponential Curves
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 10 }}>
        <span style={{ color: '#00d2d3', fontFamily: 'monospace', fontSize: 12 }}>
          &#9632; Rising: 1 - e^(-t/&tau;)
        </span>
        <span style={{ color: '#ff6b6b', fontFamily: 'monospace', fontSize: 12 }}>
          &#9632; Falling: e^(-t/&tau;)
        </span>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid stroke="#2a2a4a" strokeDasharray="3 3" />
          <XAxis
            dataKey="tau"
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0', fontSize: 12 }}
            label={{ value: 'Time (\u03C4)', position: 'insideBottomRight', offset: -5, fill: '#a0a0b0', fontSize: 12 }}
            ticks={[0, 1, 2, 3, 4, 5, 6]}
            tickFormatter={(v: number) => `${v}\u03C4`}
          />
          <YAxis
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0', fontSize: 12 }}
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0]}
            label={{ value: 'Normalized', angle: -90, position: 'insideLeft', fill: '#a0a0b0', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#16213e', border: '1px solid #2a2a4a', borderRadius: 6, color: '#e0e0e0' }}
            labelStyle={{ color: '#a0a0b0' }}
            formatter={((value: number | string | undefined, name: string) => [
              Number(value ?? 0).toFixed(3),
              name === 'rising' ? '1 - e^(-t/\u03C4)' : 'e^(-t/\u03C4)',
            ]) as never}
            labelFormatter={((label: number | string) => `t = ${label}\u03C4`) as never}
          />
          <Line
            type="monotone"
            dataKey="rising"
            stroke="#00d2d3"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: '#00d2d3' }}
            name="rising"
          />
          <Line
            type="monotone"
            dataKey="falling"
            stroke="#ff6b6b"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: '#ff6b6b' }}
            name="falling"
          />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: '#a0a0b0', fontFamily: 'monospace', fontSize: 11, marginTop: 4 }}>
        Curves cross at ~0.693&tau; (at value 0.5)
      </p>
    </div>
  )
}
