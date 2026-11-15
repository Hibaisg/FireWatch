export default function ChartCard({ title, description, action, children, className = '' }) {
  return (
    <section className={`panel ${className}`.trim()}>
      <header className="panel-head">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}
