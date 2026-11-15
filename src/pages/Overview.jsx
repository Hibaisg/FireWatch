
import { useEffect, useMemo, useState } from 'react'
import ChartCard from '../components/ChartCard'
import AreaChart from '../components/AreaChart'
import DonutChart from '../components/DonutChart'
import BarChart from '../components/BarChart'
import KpiCard from '../components/KpiCard'
import {
  IconAverage,
  IconFlame,
  IconGlobe,
  IconPeak,
} from '../components/Icons'
import { useDashboard } from '../context/DashboardContext'
import { formatNumber } from '../data/format'
import { getMonthlyFireSummary } from '../lib/fireData'

const COUNTRIES = [
  { name: 'Tunisia', color: '#F97316' },
  { name: 'Algeria', color: '#38BDF8' },
  { name: 'Morocco', color: '#A78BFA' },
  { name: 'Libya', color: '#FACC15' },
  { name: 'Mauritania', color: '#34D399' },
]

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export default function Overview() {
  const { range } = useDashboard()

  const [monthlyRows, setMonthlyRows] = useState([])
  const [countryRows, setCountryRows] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadOverview() {
      setLoading(true)
      setError(null)

      try {
        const [allData, ...countryData] = await Promise.all([
          getMonthlyFireSummary({
            startYear: range.start,
            endYear: range.end,
          }),
          ...COUNTRIES.map((country) =>
            getMonthlyFireSummary({
              country: country.name,
              startYear: range.start,
              endYear: range.end,
            })
          ),
        ])

        if (cancelled) return

        setMonthlyRows(allData)

        const byCountry = {}
        COUNTRIES.forEach((country, index) => {
          byCountry[country.name] = countryData[index]
        })

        setCountryRows(byCountry)
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Could not load overview data.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadOverview()

    return () => {
      cancelled = true
    }
  }, [range.start, range.end])

  const stats = useMemo(() => {
    const years = Array.from(
      { length: range.end - range.start + 1 },
      (_, index) => range.start + index
    )

    const annual = years.map((year) => {
      const total = monthlyRows
        .filter((row) => Number(row.year) === year)
        .reduce((sum, row) => sum + Number(row.total_activity || 0), 0)

      return { label: String(year), value: total }
    })

    const total = annual.reduce((sum, row) => sum + row.value, 0)
    const average = years.length ? total / years.length : 0

    const peak = annual.reduce(
      (best, row) => row.value > best.value ? row : best,
      { label: '—', value: 0 }
    )

    const activeCellMonths = monthlyRows.reduce(
      (sum, row) => sum + Number(row.active_cells || 0),
      0
    )

    const months = MONTHS.map((label, index) => {
      const monthRows = monthlyRows.filter(
        (row) => Number(row.month_num) === index + 1
      )

      const monthTotal = monthRows.reduce(
        (sum, row) => sum + Number(row.total_activity || 0),
        0
      )

      return {
        label,
        value: years.length ? monthTotal / years.length : 0,
      }
    })

    const countries = COUNTRIES.map((country) => {
      const rows = countryRows[country.name] || []

      return {
        label: country.name,
        color: country.color,
        value: rows.reduce(
          (sum, row) => sum + Number(row.total_activity || 0),
          0
        ),
      }
    })

    const activeCountries = countries.filter(
      (country) => country.value > 0
    ).length

    const peakMonth = months.reduce(
      (best, month) => month.value > best.value ? month : best,
      { label: '—', value: 0 }
    )

    const leader = countries.reduce(
      (best, country) => country.value > best.value ? country : best,
      { label: '—', value: 0 }
    )

    return {
      annual,
      total,
      average,
      peak,
      activeCellMonths,
      months,
      countries,
      activeCountries,
      peakMonth,
      leader,
    }
  }, [monthlyRows, countryRows, range.start, range.end])

  if (loading) {
    return (
      <div className="page">
        <p className="empty">Loading real fire activity data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <p className="empty">Could not load Overview: {error}</p>
      </div>
    )
  }

  const takeaways = [
    {
      title: 'Selected period',
      text: `${formatNumber(stats.total)} total harmonized activity units were recorded in the selected period (${range.label}).`,
    },
    {
      title: 'Peak year',
      text: `${stats.peak.label} has the highest annual harmonized activity in this period.`,
    },
    {
      title: 'Seasonal pattern',
      text: `${stats.peakMonth.label} has the highest average monthly activity across the selected years.`,
    },
    {
      title: 'Country comparison',
      text: `${stats.leader.label} has the highest country-associated activity in this comparison.`,
    },
  ]

  return (
    <div className="page">
      <p className="lede">
        Overview of harmonized MODIS and VIIRS fire activity for {range.label}.
        All indicators and charts are calculated from the monthly grid-cell dataset.
      </p>

      <section className="kpi-grid">
        <KpiCard
          label="Total harmonized activity"
          value={formatNumber(stats.total)}
          note="Sum of monthly harmonized values"
          icon={<IconFlame />}
        />

        <KpiCard
          label="Average annual activity"
          value={formatNumber(stats.average)}
          note="Average yearly total in the selected period"
          icon={<IconAverage />}
        />

        <KpiCard
          label="Peak year"
          value={stats.peak.label}
          note={`${formatNumber(stats.peak.value)} activity units`}
          icon={<IconPeak />}
        />

        <KpiCard
          label="Active cell-months"
          value={formatNumber(stats.activeCellMonths)}
          note="Sum of active grid cells across all months"
          icon={<IconGlobe />}
        />
      </section>

      <div className="dashboard-grid">
        <ChartCard
          title="Annual fire activity"
          description="Total harmonized activity by year."
        >
          <AreaChart
            data={stats.annual}
            unit="harmonized activity units"
          />
        </ChartCard>

        <ChartCard
          title="Activity by country"
          description="Country-associated activity. Cells linked to multiple countries can contribute to more than one country."
        >
          <DonutChart segments={stats.countries} />
        </ChartCard>

        <ChartCard
          title="Average monthly activity"
          description="Average activity for each calendar month across the selected years."
        >
          <BarChart data={stats.months} />
        </ChartCard>

        <ChartCard
          title="Key insights"
          description="Highlights calculated from the selected period."
        >
          <ol className="takeaways">
            {takeaways.map((item, index) => (
              <li key={item.title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </ChartCard>
      </div>
    </div>
  )
}
