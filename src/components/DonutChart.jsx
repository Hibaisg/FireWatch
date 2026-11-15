import { useState } from 'react'
import { formatCompact, formatNumber, formatPercent } from '../data/format'

export default function DonutChart({ segments }) {
  const [active, setActive] = useState(null)
  const total = segments.reduce((sum, item) => sum + item.value, 0)

  if (!total) {
    return <p className="empty">No sample rows in this window.</p>
  }

  const radius = 72
  const circumference = 2 * Math.PI * radius
  let offset = 0
  const gap = segments.length > 1 ? 3 : 0

  return (
    <div className="donut-layout">
      <div className="donut-wrap">
        <svg viewBox="0 0 220 220" className="donut" role="img" aria-label="Sample share chart">
          <g transform="rotate(-90 110 110)">
            {segments.map((segment, index) => {
              const fraction = segment.value / total
              const span = fraction * circumference
              const length = Math.max(span - gap, 0)
              const dashOffset = -offset
              offset += span
              return (
                <circle
                  key={segment.label}
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={active === index ? 26 : 20}
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={dashOffset}
                  opacity={active == null || active === index ? 1 : 0.4}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                />
              )
            })}
          </g>
          <text x="110" y="106" textAnchor="middle" className="donut-total">
            {formatCompact(total)}
          </text>
          <text x="110" y="126" textAnchor="middle" className="donut-caption">
            sample
          </text>
        </svg>
      </div>
      <ul className="legend">
        {segments.map((segment, index) => (
          <li
            key={segment.label}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className={active === index ? 'is-active' : ''}
          >
            <i style={{ background: segment.color }} />
            <span>{segment.label}</span>
            <strong>
              {formatPercent(segment.value, total)}
              <small>{formatNumber(segment.value)}</small>
            </strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
