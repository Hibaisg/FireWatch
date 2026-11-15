import { formatCompact, formatNumber } from '../data/format'

export default function BarChart({ data, horizontal = false, color = '#F97316' }) {
  const max = Math.max(...data.map((item) => item.value), 1)

  if (!data.length) {
    return <p className="empty">No sample rows to chart.</p>
  }

  if (horizontal) {
    return (
      <div className="bar-list">
        {data.map((item) => (
          <div className="bar-row" key={item.label}>
            <span className="bar-label">{item.label}</span>
            <div
              className="bar-track"
              title={`${item.label}: ${formatNumber(item.value)} sample`}
            >
              <span style={{ width: `${(item.value / max) * 100}%`, background: item.color || color }} />
            </div>
            <span className="bar-value">{formatCompact(item.value)}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="vbars" role="img" aria-label="Sample bar chart">
      {data.map((item) => (
        <div className="vbar" key={item.label} title={`${item.label}: ${formatNumber(item.value)} sample`}>
          <span className="vbar-value">{formatCompact(item.value)}</span>
          <div className="vbar-plot">
            <span style={{ height: `${Math.max((item.value / max) * 100, 2)}%`, background: item.color || color }} />
          </div>
          <span className="vbar-label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
