import { createContext, useContext, useMemo, useState } from 'react'
import { RANGE_PRESETS } from '../data/sampleData'

const DashboardContext = createContext(null)

export function DashboardProvider({ children }) {
  const [presetId, setPresetId] = useState('2015-2024')

  const value = useMemo(() => {
    const range = RANGE_PRESETS.find((item) => item.id === presetId) ?? RANGE_PRESETS[0]
    return { presetId, setPresetId, range, presets: RANGE_PRESETS }
  }, [presetId])

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const value = useContext(DashboardContext)
  if (!value) {
    throw new Error('useDashboard must be used within DashboardProvider')
  }
  return value
}
