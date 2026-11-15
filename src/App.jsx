import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import About from './pages/About'
import Analytics from './pages/Analytics'
import DataHarmonization from './pages/DataHarmonization'
import FireCalendar from './pages/FireCalendar'
import MapExplorer from './pages/MapExplorer'
import Overview from './pages/Overview'
import './styles/dashboard.css'

export default function App() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="app-main">
        <Header onMenu={() => setNavOpen(true)} />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/calendar" element={<FireCalendar />} />
            <Route path="/map" element={<MapExplorer />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/harmonization" element={<DataHarmonization />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <footer className="app-foot">
            FireWatch demo for the NASA Space Apps Challenge. Sample data only.
          </footer>
        </main>
      </div>
    </div>
  )
}
