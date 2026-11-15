
import { useEffect, useMemo, useState } from 'react'
import AreaChart from '../components/AreaChart'
import BarChart from '../components/BarChart'
import ChartCard from '../components/ChartCard'
import { useDashboard } from '../context/DashboardContext'
import { getMonthlyFireSummary } from '../lib/fireData'
import { formatNumber } from '../data/format'

const COUNTRIES = [
  'Tunisia',
  'Algeria',
  'Morocco',
  'Libya',
  'Mauritania',
]

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const SEASONS = [
  { label: 'DJF', months: [12, 1, 2] },
  { label: 'MAM', months: [3, 4, 5] },
  { label: 'JJA', months: [6, 7, 8] },
  { label: 'SON', months: [9, 10, 11] },
]

export default function Analytics() {
  const { range } = useDashboard()

  const [allData, setAllData] = useState([])
  const [countryData, setCountryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadAnalytics() {
      setLoading(true)
      setError('')

      try {
        const [allRows, ...countryRows] = await Promise.all([
          getMonthlyFireSummary({
            startYear: range.start,
            endYear: range.end,
          }),
          ...COUNTRIES.map((country) =>
            getMonthlyFireSummary({
              country,
              startYear: range.start,
              endYear: range.end,
            })
          ),
        ])

        if (!cancelled) {
          setAllData(allRows)
          setCountryData(
            COUNTRIES.map((country, index) => ({
              country,
              rows: countryRows[index],
            }))
          )
        }
      } catch (err) {
        console.error('Error loading analytics:', err)

        if (!cancelled) {
          setError('Unable to load analytics data. Please try again.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadAnalytics()

    return () => {
      cancelled = true
    }
  }, [range.start, range.end])

  const charts = useMemo(() => {
    const annualMap = new Map()
    const monthlyMap = Array.from({ length: 12 }, () => ({
      total: 0,
      count: 0,
      activeCells: 0,
    }))

    const seasonActivity = [0, 0, 0, 0]
    const seasonActiveCells = [0, 0, 0, 0]
    const yearlyActiveCells = new Map()

    allData.forEach((row) => {
      const year = Number(row.year)
      const month = Number(row.month_num)
      const activity = Number(row.total_activity) || 0
      const activeCells = Number(row.active_cells) || 0

      annualMap.set(
        year,
        (annualMap.get(year) || 0) + activity
      )

      monthlyMap[month - 1].total += activity
      monthlyMap[month - 1].count += 1
      monthlyMap[month - 1].activeCells += activeCells

      yearlyActiveCells.set(
        year,
        (yearlyActiveCells.get(year) || 0) + activeCells
      )

      const seasonIndex = SEASONS.findIndex((season) =>
        season.months.includes(month)
      )

      if (seasonIndex !== -1) {
        seasonActivity[seasonIndex] += activity
        seasonActiveCells[seasonIndex] += activeCells
      }
    })

    const annual = [...annualMap.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([year, value]) => ({
        label: String(year),
        value,
      }))

    const monthly = monthlyMap.map((item, index) => ({
      label: MONTHS[index],
      value: item.count ? item.total / item.count : 0,
    }))

    const seasonal = SEASONS.map((season, index) => ({
      label: season.label,
      value: seasonActivity[index],
    }))

    const seasonalActiveCells = SEASONS.map((season, index) => ({
      label: season.label,
      value: seasonActiveCells[index],
    }))

    const annualActiveCells = [...yearlyActiveCells.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([year, value]) => ({
        label: String(year),
        value,
      }))

    const countries = countryData.map(({ country, rows }) => ({
      label: country,
      value: rows.reduce(
        (sum, row) => sum + (Number(row.total_activity) || 0),
        0
      ),
    }))

    return {
      annual,
      monthly,
      seasonal,
      seasonalActiveCells,
      annualActiveCells,
      countries,
    }
  }, [allData, countryData])

  if (loading) {
    return (
      <div className="page">
        <p className="lede">Loading analytics for {range.label}...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <p className="empty">{error}</p>
      </div>
    )
  }

  return (
    <div className="page">
      <p className="lede">
        Explore historical activity, seasonal patterns, monthly averages,
        geographic comparisons, and active grid cells for {range.label}.
        All charts are calculated from the harmonized monthly dataset.
      </p>

      <div className="dashboard-grid">
        <ChartCard
          title="Historical fire activity"
          description="Total harmonized activity by year."
        >
          <AreaChart data={charts.annual} />
        </ChartCard>

        <ChartCard
          title="Seasonal activity pattern"
          description="Total harmonized activity grouped into DJF, MAM, JJA, and SON."
        >
          <BarChart data={charts.seasonal} />
        </ChartCard>

        <ChartCard
          title="Monthly activity pattern"
          description="Average monthly harmonized activity across the selected years."
        >
          <BarChart data={charts.monthly} />
        </ChartCard>

        <ChartCard
          title="Country comparison"
          description="Total harmonized activity by country. Cross-border cells may contribute to multiple countries."
        >
          <BarChart data={charts.countries} horizontal />
        </ChartCard>

        <ChartCard
          title="Active cell-months by year"
          description="Sum of monthly active grid-cell counts for each year. A cell can be counted again in another month."
        >
          <BarChart data={charts.annualActiveCells} />
        </ChartCard>

        <ChartCard
          title="Active cell-months by season"
          description="Monthly active grid-cell counts grouped by season across the selected period."
        >
          <BarChart data={charts.seasonalActiveCells} />
        </ChartCard>
      </div>
    </div>
  )
}
