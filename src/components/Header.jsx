import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { pageFromPath } from '../data/navigation'
import { downloadText, toCsv } from '../data/format'
import {
  countrySeries,
  hotspots,
  SAMPLE_NOTICES,
  satelliteSeries,
  seriesForRange,
  summarizeSeries,
} from '../data/sampleData'
import { useDashboard } from '../context/DashboardContext'
import { IconBell, IconExport, IconMenu, IconUser } from './Icons'
import { useDismiss } from './useDismiss'

export default function Header({ onMenu }) {
  const location = useLocation()
  const page = pageFromPath(location.pathname)
  const { presetId, setPresetId, range, presets } = useDashboard()
  const [menu, setMenu] = useState(null)
  const exportRef = useRef(null)
  const notesRef = useRef(null)
  const profileRef = useRef(null)
  const close = useCallback(() => setMenu(null), [])

  useDismiss(menu === 'export', exportRef, close)
  useDismiss(menu === 'notes', notesRef, close)
  useDismiss(menu === 'profile', profileRef, close)

  useEffect(() => {
    document.title = `${page.title} · FireWatch`
  }, [page.title])

  useEffect(() => {
    setMenu(null)
  }, [location.pathname])

  const exportRows = (filename, rows) => {
    downloadText(filename, toCsv(rows), 'text/csv;charset=utf-8')
    setMenu(null)
  }

  const exportAnnual = () => {
    const rows = seriesForRange(range.start, range.end).map((row) => ({
      year: row.year,
      sample_detections: row.detections,
      data_type: 'illustrative-sample',
    }))
    exportRows('firewatch-sample-annual.csv', rows)
  }

  const exportCountries = () => {
    const summary = summarizeSeries(seriesForRange(range.start, range.end))
    const rows = countrySeries(summary.total).map((row) => ({
      area: row.label,
      sample_detections: row.value,
      data_type: 'illustrative-sample',
    }))
    exportRows('firewatch-sample-areas.csv', rows)
  }

  const exportHotspots = () => {
    const rows = hotspots.map((point) => ({
      id: point.id,
      date: point.date,
      area: point.country,
      satellite: point.satellite,
      confidence: point.confidence,
      frp_mw: point.frp,
      lat: point.lat,
      lng: point.lng,
      data_type: 'illustrative-sample',
    }))
    exportRows('firewatch-sample-hotspots.csv', rows)
  }

  const exportJson = () => {
    const annual = seriesForRange(range.start, range.end)
    const summary = summarizeSeries(annual)
    const payload = {
      notice: 'Illustrative sample data. Not a NASA measurement.',
      range: range.label,
      annual,
      areas: countrySeries(summary.total),
      satellites: satelliteSeries(summary.total),
      hotspots,
    }
    downloadText(
      'firewatch-sample.json',
      JSON.stringify(payload, null, 2),
      'application/json',
    )
    setMenu(null)
  }

  return (
    <header className="topbar">
      <div className="topbar-title">
        <button type="button" className="icon-btn menu-btn" onClick={onMenu} aria-label="Open navigation">
          <IconMenu />
        </button>
        <div>
          <p className="eyebrow">FireWatch</p>
          <h1>{page.title}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <label className="range-select">
          <span>Date range</span>
          <select
            value={presetId}
            onChange={(event) => setPresetId(event.target.value)}
            aria-label="Sample date range"
          >
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
        </label>

        <div className="menu-wrap" ref={exportRef}>
          <button
            type="button"
            className="ghost-btn"
            aria-expanded={menu === 'export'}
            aria-haspopup="menu"
            onClick={() => setMenu((current) => (current === 'export' ? null : 'export'))}
          >
            <IconExport />
            Export
          </button>
          {menu === 'export' ? (
            <div className="menu" role="menu">
              <p className="menu-label">Sample files only</p>
              <button type="button" role="menuitem" onClick={exportAnnual}>
                Annual series (.csv)
              </button>
              <button type="button" role="menuitem" onClick={exportCountries}>
                Area split (.csv)
              </button>
              <button type="button" role="menuitem" onClick={exportHotspots}>
                Hotspot list (.csv)
              </button>
              <button type="button" role="menuitem" onClick={exportJson}>
                Bundle (.json)
              </button>
            </div>
          ) : null}
        </div>

        <div className="menu-wrap" ref={notesRef}>
          <button
            type="button"
            className="icon-btn"
            aria-label="Notifications"
            aria-expanded={menu === 'notes'}
            onClick={() => setMenu((current) => (current === 'notes' ? null : 'notes'))}
          >
            <IconBell />
            <span className="dot" />
          </button>
          {menu === 'notes' ? (
            <div className="menu notes-menu">
              <p className="menu-label">Sample notices</p>
              {SAMPLE_NOTICES.map((notice) => (
                <article key={notice.id}>
                  <strong>{notice.title}</strong>
                  <p>{notice.body}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>

        <div className="menu-wrap" ref={profileRef}>
          <button
            type="button"
            className="icon-btn profile-btn"
            aria-label="Profile"
            aria-expanded={menu === 'profile'}
            onClick={() => setMenu((current) => (current === 'profile' ? null : 'profile'))}
          >
            <IconUser />
          </button>
          {menu === 'profile' ? (
            <div className="menu profile-menu">
              <strong>Guest analyst</strong>
              <p>Sign-in is not required for this demo.</p>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
