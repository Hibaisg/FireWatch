
import { supabase } from './supabase'

export async function getMonthlyFireSummary({
  country = null,
  startYear = 2000,
  endYear = 2026,
} = {}) {
  const { data, error } = await supabase.rpc(
    'get_fire_monthly_summary',
    {
      p_country: country === 'All Regions' ? null : country,
      p_start_year: startYear,
      p_end_year: endYear,
    }
  )

  if (error) {
    console.error('Error fetching monthly fire summary:', error)
    throw error
  }

  return data ?? []
}
export async function getFireCellsForMonth({
  country = null,
  year = 2024,
  month = 1,
} = {}) {
  const pageSize = 1000
  let from = 0
  let allRows = []

  while (true) {
    const { data, error } = await supabase
      .rpc('get_fire_cells_for_month', {
        p_year: year,
        p_month: month,
        p_country: country === 'All Regions' ? null : country,
      })
      .range(from, from + pageSize - 1)

    if (error) {
      console.error('Error fetching map cells:', error)
      throw error
    }

    const rows = data ?? []
    allRows = allRows.concat(rows)

    if (rows.length < pageSize) break

    from += pageSize
  }

  return allRows
}