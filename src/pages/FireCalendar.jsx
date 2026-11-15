
import { useEffect, useMemo, useState } from 'react'
import { getMonthlyFireSummary } from '../lib/fireData'
import { formatNumber } from '../data/format'
import { MONTHS } from '../data/sampleData'

const COUNTRIES = [
  'All Regions',
  'Tunisia',
  'Algeria',
  'Morocco',
  'Libya',
  'Mauritania',
]

const YEARS = Array.from(
  { length: 27 },
  (_, index) => 2026 - index
)

export default function FireCalendar() {
  const [country, setCountry] = useState('All Regions')
  const [year, setYear] = useState(2024)
  const [monthlyData, setMonthlyData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        const result = await getMonthlyFireSummary({
          country,
          startYear: year,
          endYear: year,
        })

        if (!cancelled) {
          setMonthlyData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load fire activity.')
          setMonthlyData([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [country, year])

  const months = useMemo(() => {
    return MONTHS.map((name, index) => {
      const record = monthlyData.find(
        (item) => Number(item.month_num) === index + 1
      )

      return {
        number: index + 1,
        name,
        total: Number(record?.total_activity ?? 0),
        activeCells: Number(record?.active_cells ?? 0),
        average: Number(record?.avg_cell_activity ?? 0),
      }
    })
  }, [monthlyData])

  const maxActivity = Math.max(
    ...months.map((month) => month.total),
    0
  )

  const annualTotal = months.reduce(
    (sum, month) => sum + month.total,
    0
  )

  const annualActiveCells = months.reduce(
    (sum, month) => sum + month.activeCells,
    0
  )

  const selected = months[selectedMonth]

  function getHeat(total) {
    if (total <= 0 || maxActivity <= 0) return 0.04

    return 0.12 + (total / maxActivity) * 0.72
  }

  return (
    <div className="page">
      <p className="lede">
        Explore monthly harmonized fire activity across North Africa.
        Select a country and year to compare activity throughout the year.
      </p>

      <section className="panel">
        <div className="cal-toolbar">
          <div>
            <h2>Monthly Fire Activity</h2>
            <p className="fine">
              Harmonized MODIS and VIIRS grid-cell data
            </p>
          </div>

          <div className="calendar-filters">
            <label className="field">
              Region
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                {COUNTRIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              Year
              <select
                value={year}
                onChange={(event) => {
                  setYear(Number(event.target.value))
                }}
              >
                {YEARS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {loading ? (
          <p className="empty">Loading monthly fire activity...</p>
        ) : error ? (
          <p className="error-message">
            Unable to load data: {error}
          </p>
        ) : (
          <>
            <div className="calendar-summary">
              <div>
                <span>Total harmonized activity</span>
                <strong>{formatNumber(annualTotal)}</strong>
              </div>

              <div>
                <span>Active cell-month records</span>
                <strong>
                  {formatNumber(annualActiveCells)}
                </strong>
              </div>

              <div>
                <span>Peak activity month</span>
                <strong>
                  {maxActivity > 0
                    ? months.reduce((best, item) =>
                        item.total > best.total ? item : best
                      ).name
                    : 'N/A'}
                </strong>
              </div>
            </div>

            <div className="month-grid">
              {months.map((month, index) => {
                const heat = getHeat(month.total)

                return (
                  <button
                    key={month.number}
                    type="button"
                    className={
                      selectedMonth === index
                        ? 'month-card is-selected'
                        : 'month-card'
                    }
                    style={{ '--heat': heat }}
                    onClick={() => setSelectedMonth(index)}
                    aria-pressed={selectedMonth === index}
                  >
                    <span className="month-name">
                      {month.name}
                    </span>

                    <strong>
                      {formatNumber(month.total)}
                    </strong>

                    <small>
                      {formatNumber(month.activeCells)} active cells
                    </small>
                  </button>
                )
              })}
            </div>

            <div className="heat-legend">
              <span>Lower activity</span>
              <div className="heat-scale">
                {[0.12, 0.3, 0.48, 0.66, 0.84].map((heat) => (
                  <i
                    key={heat}
                    style={{ '--heat': heat }}
                  />
                ))}
              </div>
              <span>Higher activity</span>
            </div>
          </>
        )}
      </section>

      {!loading && !error && (
        <section className="panel month-details">
          <header className="panel-head">
            <div>
              <h2>
                {selected.name} {year}
              </h2>
              <p>
                Monthly activity details for {country}
              </p>
            </div>
          </header>

          <div className="calendar-summary">
            <div>
              <span>Harmonized activity</span>
              <strong>
                {formatNumber(selected.total)}
              </strong>
            </div>

            <div>
              <span>Active grid cells</span>
              <strong>
                {formatNumber(selected.activeCells)}
              </strong>
            </div>

            <div>
              <span>Average activity per cell record</span>
              <strong>
                {formatNumber(selected.average)}
              </strong>
            </div>
          </div>

          {selected.total === 0 && (
            <p className="empty">
              No recorded harmonized activity for this selection.
            </p>
          )}
        </section>
      )}
    </div>
  )
}

