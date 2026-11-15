import { useEffect, useMemo, useState } from 'react'
import FireMap from '../components/FireMap'
import { getFireCellsForMonth } from '../lib/fireData'

const COUNTRIES = [
  'Tunisia',
  'Algeria',
  'Morocco',
  'Libya',
  'Mauritania',
]

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]

const YEARS = Array.from(
  { length: 27 },
  (_, index) => 2000 + index
)

const numberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
})

export default function MapExplorer() {
  const [country, setCountry] = useState('All Regions')
  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(1)

  const [cells, setCells] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadCells() {
      setLoading(true)
      setError(null)
      setSelectedId(null)

      try {
        const data = await getFireCellsForMonth({
          country,
          year,
          month,
        })

        if (!cancelled) {
          setCells(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Could not load map data.')
          setCells([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadCells()

    return () => {
      cancelled = true
    }
  }, [country, year, month])

  const selected = useMemo(
    () => cells.find((cell) => cell.cell_id === selectedId) ?? null,
    [cells, selectedId]
  )

  const maxActivity = useMemo(
    () => Math.max(...cells.map((cell) => cell.viirs_harmonized), 0),
    [cells]
  )

  const bounds = useMemo(() => {
    if (!cells.length) {
      return [[18, -18], [38, 12]]
    }

    const lats = cells.map((cell) => cell.cell_lat)
    const lons = cells.map((cell) => cell.cell_lon)

    return [
      [Math.min(...lats), Math.min(...lons)],
      [Math.max(...lats), Math.max(...lons)],
    ]
  }, [cells])

  function resetFilters() {
    setCountry('All Regions')
    setYear(2024)
    setMonth(1)
    setSelectedId(null)
  }

  return (
    <div className="page">
      <p className="lede">
        Explore monthly harmonized fire activity across North Africa.
        Each marker represents a grid cell with a positive harmonized
        activity value, not an individual fire detection.
      </p>

      <div className="map-layout">
        <aside className="panel filters">
          <div className="filter-head">
            <h2>Filters</h2>
            <button
              type="button"
              className="text-btn"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          <fieldset className="filter-block">
            <legend>Country</legend>
            <label className="field">
              Select country
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <option value="All Regions">All Regions</option>
                {COUNTRIES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset className="filter-block">
            <legend>Year</legend>
            <label className="field">
              Select year
              <select
                value={year}
                onChange={(event) => setYear(Number(event.target.value))}
              >
                {YEARS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset className="filter-block">
            <legend>Month</legend>
            <label className="field">
              Select month
              <select
                value={month}
                onChange={(event) => setMonth(Number(event.target.value))}
              >
                {MONTHS.map((name, index) => (
                  <option key={name} value={index + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <p className="fine">
            {loading
              ? 'Loading grid cells...'
              : `${cells.length.toLocaleString()} active grid cells found.`}
          </p>

          <div className="map-legend">
            <p><strong>Harmonized activity</strong></p>
            <div className="activity-gradient" />
            <div className="legend-labels">
              <span>Lower</span>
              <span>Higher</span>
            </div>
          </div>
        </aside>

        <div className="map-stage">
          <div className="map-frame">
            {loading ? (
              <p className="empty map-empty">
                Loading map data...
              </p>
            ) : error ? (
              <p className="empty map-empty">
                {error}
              </p>
            ) : cells.length ? (
              <FireMap
                points={cells}
                selectedId={selectedId}
                bounds={bounds}
                maxActivity={maxActivity}
                onSelect={(cell) =>
                  setSelectedId((current) =>
                    current === cell.cell_id ? null : cell.cell_id
                  )
                }
              />
            ) : (
              <p className="empty map-empty">
                No active grid cells match these filters.
              </p>
            )}
          </div>

          <article className="panel detail-card">
            {selected ? (
              <>
                <header className="panel-head">
                  <div>
                    <h2>{selected.cell_id}</h2>
                    <p>Monthly grid-cell record</p>
                  </div>
                </header>

                <dl className="detail-list">
                  <div>
                    <dt>Countries</dt>
                    <dd>{selected.countries}</dd>
                  </div>
                  <div>
                    <dt>Year</dt>
                    <dd>{selected.year}</dd>
                  </div>
                  <div>
                    <dt>Month</dt>
                    <dd>{MONTHS[selected.month_num - 1]}</dd>
                  </div>
                  <div>
                    <dt>Harmonized activity</dt>
                    <dd>
                      {numberFormat.format(selected.viirs_harmonized)}
                    </dd>
                  </div>
                  <div>
                    <dt>Position</dt>
                    <dd>
                      {selected.cell_lat.toFixed(4)}, {selected.cell_lon.toFixed(4)}
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <>
                <h2>Grid-cell details</h2>
                <p className="empty">
                  Select a marker on the map to inspect its monthly record.
                </p>
              </>
            )}
          </article>
        </div>
      </div>
    </div>
  )
}