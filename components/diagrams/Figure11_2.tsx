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

const data = [
  { time: 0, IL: 0 },
  { time: 0.5, IL: 1.667 },
  { time: 1.0, IL: 3.333 },
  { time: 1.5, IL: 5.0 },
  { time: 2.0, IL: 6.667 },
  { time: 2.5, IL: 8.333 },
  { time: 3.0, IL: 10.0 },
  { time: 3.5, IL: 8.75 },
  { time: 4.0, IL: 7.5 },
  { time: 4.5, IL: 6.25 },
  { time: 5.0, IL: 5.0 },
  { time: 5.5, IL: 5.0 },
  { time: 6.0, IL: 5.0 },
  { time: 6.5, IL: 5.0 },
  { time: 7.0, IL: 5.0 },
  { time: 7.5, IL: 5.0 },
  { time: 8.0, IL: 5.0 },
]

export default function Figure11_2() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', backgroundColor: '#1a1a2e', borderRadius: 8, padding: '20px 10px 10px 0' }}>
      <p style={{ textAlign: 'center', color: '#a0a0b0', fontFamily: 'monospace', fontSize: 13, marginBottom: 10 }}>
        Figure 11.2 &mdash; Inductor Current Waveform
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid stroke="#2a2a4a" strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0', fontSize: 12 }}
            label={{ value: 'Time (ms)', position: 'insideBottomRight', offset: -5, fill: '#a0a0b0', fontSize: 12 }}
          />
          <YAxis
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0', fontSize: 12 }}
            domain={[0, 15]}
            label={{ value: 'IL (mA)', angle: -90, position: 'insideLeft', fill: '#a0a0b0', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#16213e', border: '1px solid #2a2a4a', borderRadius: 6, color: '#e0e0e0' }}
            labelStyle={{ color: '#a0a0b0' }}
            formatter={((value: number | string | undefined) => [`${Number(value ?? 0).toFixed(2)} mA`, 'IL']) as never}
            labelFormatter={((label: number | string) => `t = ${label} ms`) as never}
          />
          <Line
            type="linear"
            dataKey="IL"
            stroke="#00d2d3"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: '#00d2d3' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
