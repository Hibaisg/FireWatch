const SOURCES = [
  {
    name: 'NASA FIRMS',
    href: 'https://firms.modaps.eosdis.nasa.gov/',
    text: 'The Fire Information for Resource Management System publishes near real-time and archive active-fire locations from MODIS and VIIRS. It is the public NASA record this project is based on.',
  },
  {
    name: 'MODIS',
    href: 'https://modis.gsfc.nasa.gov/',
    text: 'MODIS flies on Terra and Aqua. Its active-fire product reports thermal anomalies at about 1 km, and its record reaches back to the start of the 2000s.',
  },
  {
    name: 'VIIRS',
    href: 'https://www.earthdata.nasa.gov/sensors/viirs',
    text: 'VIIRS flies on Suomi NPP, NOAA-20, and later NOAA satellites. The 375 m active-fire product sees smaller fires than MODIS, which is why the two records need harmonization before a trend is read across both.',
  },
]

export default function About() {
  return (
    <div className="page">
      <p className="lede">
        FireWatch is a NASA Space Apps Challenge interface for monitoring and comparing wildfire activity across North Africa, from 2000 to 2026.
      </p>

      <section className="panel about-lead">
        <h2>Project</h2>
        <p>
          The goal is a single view of fire activity from MODIS and VIIRS, so a regional pattern is not split by sensor. The map, calendar, and charts on this site are the front of that tool. They read one harmonized dataset: 464 grid cells of 100 km, with one value per cell per month, 143,376 rows in total.
        </p>
        <p>
          Supabase is already configured in the project and is not used yet. Sign-in is not required.
        </p>
      </section>

      <div className="source-grid">
        {SOURCES.map((source) => (
          <article className="panel source-card" key={source.name}>
            <h2>{source.name}</h2>
            <p>{source.text}</p>
            <a href={source.href} target="_blank" rel="noreferrer">
              Open source
            </a>
          </article>
        ))}
      </div>

      <section className="panel">
        <h2>Data processing methodology</h2>
        <p>
          The dashboard reads a single column, viirs_harmonized, on a fixed 100 km grid covering Algeria, Libya, Mauritania, Morocco and Tunisia. Cells on borders list every country they touch. Values are monthly, from November 2000 to July 2026, and the table has no missing values and no duplicate cell-months. Charts use totals and means computed from the CSV ahead of time. Note that 2000 and 2026 are partial years, so their annual totals are not comparable with the others.
        </p>
      </section>

      <section className="panel team-card">
        <h2>Team</h2>
        <p>
          NASA Space Apps Challenge project. Add team names, roles, and affiliations here before submission. No members are listed yet.
        </p>
      </section>
    </div>
  )
}