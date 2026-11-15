export default function KpiCard({ label, value, note, icon }) {
  return (
    <article className="kpi-card">
      <div className="kpi-top">
        <p className="kpi-label">{label}</p>
        <span className="kpi-icon">{icon}</span>
      </div>
      <p className="kpi-value">{value}</p>
      <p className="kpi-note">{note}</p>
    </article>
  )
}
