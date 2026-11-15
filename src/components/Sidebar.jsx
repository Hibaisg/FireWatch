import { NavLink } from 'react-router-dom'
import { PAGES } from '../data/navigation'
import {
  FlameMark,
  IconAbout,
  IconAnalytics,
  IconCalendar,
  IconHarmonize,
  IconMap,
  IconOverview,
} from './Icons'

const ICONS = {
  overview: IconOverview,
  calendar: IconCalendar,
  map: IconMap,
  analytics: IconAnalytics,
  harmonization: IconHarmonize,
  about: IconAbout,
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open ? (
        <button type="button" className="nav-backdrop" aria-label="Close navigation" onClick={onClose} />
      ) : null}
      <aside className={open ? 'sidebar is-open' : 'sidebar'}>
        <div className="brand">
          <span className="brand-mark">
            <FlameMark />
          </span>
          <span>
            <strong>FireWatch</strong>
            <em>North Africa Wildfire Monitor</em>
          </span>
        </div>

        <nav className="side-nav" aria-label="Primary">
          {PAGES.map((page) => {
            const Icon = ICONS[page.id]
            return (
              <NavLink
                key={page.id}
                to={page.to}
                end={page.end}
                className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
                onClick={onClose}
              >
                <Icon />
                <span>{page.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="side-note">
          <FlameMark />
          <p>Harmonized MODIS & VIIRS fire activity for North Africa</p>
        </div>
      </aside>
    </>
  )
}
