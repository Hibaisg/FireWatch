import { formatNumber } from '../data/format'

export default function GroupedBars({ categories, series }) {
  const max = Math.max(...series.flatMap((item) => item.values), 1)

  return (
    <div className="grouped">
      <div className="legend legend-inline">
        {series.map((item) => (
          <span key={item.name}>
            <i style={{ background: item.color }} />
            {item.name}
          </span>
        ))}
      </div>
      {categories.map((category, index) => (
        <div className="grouped-row" key={category}>
          <span className="bar-label">{category}</span>
          <div className="grouped-tracks">
            {series.map((item) => (
              <div
                className="bar-track"
                key={item.name}
                title={`${category} ${item.name}: ${formatNumber(item.values[index])} sample`}
              >
                <span
                  style={{
                    width: `${(item.values[index] / max) * 100}%`,
                    background: item.color,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
