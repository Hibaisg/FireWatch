import BarChart from '../components/BarChart'
import ChartCard from '../components/ChartCard'
import GroupedBars from '../components/GroupedBars'

const METHOD_STEPS = [
  { title: '100 km grid', text: 'The study area is split into 464 fixed cells, each with an ID, grid position, centre point and country.' },
  { title: 'Monthly time step', text: 'Every cell has one row per month from 2000 to 2026, a complete panel of 143,376 rows.' },
  { title: 'One harmonized value', text: 'viirs_harmonized is the single measurement column used by every chart.' },
  { title: 'Aggregate for display', text: 'Totals and means are computed from the CSV ahead of time, so the browser does not load every row.' },
]

const PIPELINE = [
  { name: 'Complete panel', state: 'Ready', detail: '464 cells × 309 months = 143,376 rows.' },
  { name: 'Missing values', state: 'Ready', detail: '0 empty fields across all 9 columns.' },
  { name: 'Duplicate cell-months', state: 'Ready', detail: '0 repeated cell_id + year + month rows.' },
  { name: 'Partial years', state: 'Note', detail: '2000 has only Nov–Dec and 2026 stops after July.' },
]

const HARMONIZATION_EXAMPLE = [
  { label: 'Algeria', before: 8.86, after: 7.17 },
  { label: 'Libya', before: 1.51, after: 4.15 },
  { label: 'Mauritania', before: 5.17, after: 2.53 },
  { label: 'Morocco', before: 2.47, after: 1.98 },
  { label: 'Tunisia', before: 2.84, after: 4.62 },
  { label: 'Shared borders', before: 11.77, after: 12.49 },
]

const QUALITY_EXAMPLE = [
  { label: 'Complete cell-months', value: 100 },
  { label: 'Non-missing values', value: 100 },
  { label: 'Cell-months above zero', value: 25.3 },
  { label: 'Cells on borders', value: 5.2 },
]

export default function DataHarmonization() {
  return (
    <div className="page">
      <p className="lede">
        The harmonized fire record behind FireWatch: monthly values on a 100 km grid across North Africa, 2000–2026. The charts on this page are computed from that dataset.
      </p>

      <div className="split">
        <article className="panel sensor-card">
          <p className="eyebrow">Space</p>
          <h2>100 km grid</h2>
          <p>
            The study area is divided into 464 fixed cells. Each cell keeps its grid position, centre coordinates and country.
          </p>
          <ul>
            <li>Columns: cell_id, cell_x, cell_y, cell_lon, cell_lat</li>
            <li>Border cells list every country they touch</li>
            <li>Countries: Algeria, Libya, Mauritania, Morocco, Tunisia</li>
          </ul>
        </article>
        <article className="panel sensor-card">
          <p className="eyebrow">Time</p>
          <h2>Monthly series</h2>
          <p>
            Each cell has one harmonized value per month in the column viirs_harmonized. About 75% of cell-months are exactly zero.
          </p>
          <ul>
            <li>309 months, from Nov 2000 to Jul 2026</li>
            <li>Peak season is July–August</li>
            <li>Maximum single cell-month value is 4,826</li>
          </ul>
        </article>
      </div>

      <div className="dashboard-grid single-span">
        <ChartCard
          title="Dataset structure"
          description="How the harmonized table is organised."
        >
          <ol className="steps">
            {METHOD_STEPS.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </ChartCard>
        <ChartCard
          title="Data quality checks"
          description="Results of the checks run on the full CSV."
        >
          <ul className="status-list">
            {PIPELINE.map((item) => (
              <li key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.detail}</p>
                </div>
                <span className={item.state === 'Ready' ? 'badge is-ready' : 'badge'}>{item.state}</span>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      <div className="dashboard-grid">
        <ChartCard
          title="Early vs recent period"
          description="Mean harmonized value per cell-month, 2000–2012 against 2013–2026. A big gap would point to a level shift."
        >
          <GroupedBars
            categories={HARMONIZATION_EXAMPLE.map((item) => item.label)}
            series={[
              {
                name: '2000–2012',
                color: '#64748B',
                values: HARMONIZATION_EXAMPLE.map((item) => item.before),
              },
              {
                name: '2013–2026',
                color: '#F97316',
                values: HARMONIZATION_EXAMPLE.map((item) => item.after),
              },
            ]}
          />
        </ChartCard>
        <ChartCard
          title="Quality indicators"
          description="Share of the dataset, in percent, computed from the CSV."
        >
          <BarChart
            horizontal
            data={QUALITY_EXAMPLE.map((item) => ({
              ...item,
              color: item.label.startsWith('Cells on') ? '#F97316' : '#38BDF8',
            }))}
          />
        </ChartCard>
      </div>
    </div>
  )
}