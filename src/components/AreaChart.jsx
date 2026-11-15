
import { useEffect, useId, useRef, useState } from 'react'
import { formatCompact, formatNumber } from '../data/format'

export default function AreaChart({
  data,
  color = '#F97316',
  unit = 'harmonized activity units',
}) {
  const wrapRef = useRef(null)
  const [width, setWidth] = useState(640)
  const [hover, setHover] = useState(null)
  const gradId = useId().replace(/:/g, '')
  const height = 280
  const pad = { top: 18, right: 12, bottom: 32, left: 48 }

  useEffect(() => {
    const element = wrapRef.current
    if (!element) return undefined

    const observer = new ResizeObserver(() => {
      setWidth(element.clientWidth)
    })

    observer.observe(element)
    setWidth(element.clientWidth)

    return () => observer.disconnect()
  }, [])

  if (!data?.length) {
    return <p className="empty">No activity data available for this period.</p>
  }

  const max = Math.max(...data.map((item) => item.value), 1)
  const innerW = Math.max(width - pad.left - pad.right, 10)
  const innerH = height - pad.top - pad.bottom

  const xAt = (index) =>
    pad.left +
    (data.length === 1
      ? innerW / 2
      : (index / (data.length - 1)) * innerW)

  const yAt = (value) => pad.top + (1 - value / max) * innerH

  const line = data
    .map(
      (item, index) =>
        `${index === 0 ? 'M' : 'L'} ${xAt(index)} ${yAt(item.value)}`
    )
    .join(' ')

  const area = `${line} L ${xAt(data.length - 1)} ${
    pad.top + innerH
  } L ${xAt(0)} ${pad.top + innerH} Z`

  const ticks = [0, 0.33, 0.66, 1]
  const labelStep = width < 520 && data.length > 6 ? 2 : 1
  const active = hover == null ? null : data[hover]

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const pointer = ((event.clientX - rect.left) / rect.width) * width

    let nearest = 0
    let best = Infinity

    data.forEach((_, index) => {
      const distance = Math.abs(xAt(index) - pointer)

      if (distance < best) {
        best = distance
        nearest = index
      }
    })

    setHover(nearest)
  }

  return (
    <div className="chart-wrap" ref={wrapRef}>
      <svg
        className="area-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Annual harmonized fire activity chart"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.38" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {ticks.map((tick) => {
          const y = yAt(max * tick)

          return (
            <g key={tick}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={y}
                y2={y}
                className="grid-line"
              />
              <text
                x={pad.left - 8}
                y={y + 4}
                className="axis-label"
                textAnchor="end"
              >
                {formatCompact(max * tick)}
              </text>
            </g>
          )
        })}

        <path d={area} fill={`url(#${gradId})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" />

        {data.map((item, index) => (
          <text
            key={item.label}
            x={xAt(index)}
            y={height - 8}
            className="axis-label"
            textAnchor="middle"
            opacity={index % labelStep === 0 ? 1 : 0}
          >
            {item.label}
          </text>
        ))}

        {active ? (
          <g>
            <line
              x1={xAt(hover)}
              x2={xAt(hover)}
              y1={pad.top}
              y2={pad.top + innerH}
              stroke={color}
              strokeDasharray="3 4"
              opacity="0.7"
            />
            <circle
              cx={xAt(hover)}
              cy={yAt(active.value)}
              r="4.5"
              fill={color}
              stroke="#fff"
              strokeWidth="1.5"
            />
          </g>
        ) : null}
      </svg>

      {active ? (
        <div
          className="chart-tip"
          style={{
            left: `${(xAt(hover) / width) * 100}%`,
            transform:
              hover > data.length / 2
                ? 'translateX(-110%)'
                : 'translateX(8px)',
          }}
        >
          <strong>{active.label}</strong>
          <span>
            {formatNumber(active.value)} {unit}
          </span>
        </div>
      ) : null}
    </div>
  )
}
