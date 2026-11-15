/**
 * Synthetic demonstration data for the FireWatch interface.
 * Nothing in this file is a NASA, FIRMS, MODIS, or VIIRS measurement.
 */


export const RANGE_PRESETS = [
  { id: '2000-2026', label: '2000 – 2026', start: 2000, end: 2026 },
  { id: '2000-2011', label: '2000 – 2011', start: 2000, end: 2011 },
  { id: '2012-2025', label: '2012 – 2025', start: 2012, end: 2025 },
]

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]


export const MONTH_WEIGHTS = [0.05, 0.055, 0.07, 0.08, 0.09, 0.11, 0.13, 0.125, 0.09, 0.07, 0.065, 0.065]

export const MONTH_FACTOR = [0.42, 0.48, 0.6, 0.74, 0.88, 1.05, 1.22, 1.16, 0.86, 0.64, 0.5, 0.4]

export const SATELLITES = ['MODIS', 'VIIRS NOAA-20', 'VIIRS SNPP']

export const SATELLITE_META = [
  { label: 'MODIS', weight: 0.46, color: '#F97316' },
  { label: 'VIIRS NOAA-20', weight: 0.31, color: '#38BDF8' },
  { label: 'VIIRS SNPP', weight: 0.23, color: '#FACC15' },
]

export const AREA_COLORS = ['#F97316', '#FB923C', '#FDBA74', '#38BDF8', '#22D3EE', '#818CF8', '#A78BFA', '#F472B6']

export const NORTH_AFRICA_BOUNDS = [
  [12, -18],
  [38, 40],
]

export const AREAS = [
  {
    name: 'Algeria',
    weight: 0.28,
    bounds: [[18.9, -8.7], [37.1, 12]],
    places: [[36.4, 3.4], [35.1, 6.4], [31.2, 2.6], [27.6, 3.1], [24.2, 5.8], [33.2, 0.4]],
  },
  {
    name: 'Morocco',
    weight: 0.18,
    bounds: [[27.6, -13.2], [35.9, -1]],
    places: [[31.2, -8.2], [33.6, -4.6], [30.1, -9.2], [34.8, -4.1]],
  },
  {
    name: 'Libya',
    weight: 0.14,
    bounds: [[19.5, 9.3], [33.2, 25.2]],
    places: [[32.4, 13.4], [31.6, 20.4], [26.7, 14.8], [29.2, 17.6]],
  },
  {
    name: 'Sudan',
    weight: 0.12,
    bounds: [[8.7, 21.8], [22.2, 38.6]],
    places: [[15.1, 32.2], [13.4, 30.6], [19.1, 36.4], [12.2, 33.5]],
  },
  {
    name: 'Tunisia',
    weight: 0.09,
    bounds: [[30.2, 7.5], [37.5, 11.6]],
    places: [[36.4, 9.6], [34.3, 10.2], [33.8, 8.6]],
  },
  {
    name: 'Egypt',
    weight: 0.08,
    bounds: [[22, 24.7], [31.7, 36.9]],
    places: [[29.4, 30.6], [24.4, 32.4], [27.8, 29.1]],
  },
  {
    name: 'Mauritania',
    weight: 0.07,
    bounds: [[14.7, -17.1], [27.3, -4.8]],
    places: [[18.4, -14.2], [20.6, -12.4], [16.4, -10.1]],
  },
  {
    name: 'Western Sahara',
    weight: 0.04,
    bounds: [[20.8, -17.1], [27.7, -8.7]],
    places: [[26.6, -12.6], [23.9, -14.8], [25.2, -11.4]],
  },
]

export const annualActivity = [
  { year: 2015, detections: 41200 },
  { year: 2016, detections: 43850 },
  { year: 2017, detections: 40110 },
  { year: 2018, detections: 46780 },
  { year: 2019, detections: 45220 },
  { year: 2020, detections: 48940 },
  { year: 2021, detections: 53680 },
  { year: 2022, detections: 49870 },
  { year: 2023, detections: 47330 },
  { year: 2024, detections: 45110 },
]

export const monthlyFrp = [
  { label: 'Jan', value: 18.2 },
  { label: 'Feb', value: 19.4 },
  { label: 'Mar', value: 22.1 },
  { label: 'Apr', value: 26.8 },
  { label: 'May', value: 31.5 },
  { label: 'Jun', value: 38.4 },
  { label: 'Jul', value: 44.2 },
  { label: 'Aug', value: 41.6 },
  { label: 'Sep', value: 33.1 },
  { label: 'Oct', value: 25.4 },
  { label: 'Nov', value: 20.8 },
  { label: 'Dec', value: 18.9 },
]

export const HARMONIZATION_EXAMPLE = [
  { label: 'Algeria', before: 280, after: 226 },
  { label: 'Morocco', before: 180, after: 149 },
  { label: 'Libya', before: 140, after: 121 },
  { label: 'Sudan', before: 120, after: 103 },
  { label: 'Tunisia', before: 90, after: 78 },
  { label: 'Egypt', before: 80, after: 71 },
  { label: 'Mauritania', before: 70, after: 62 },
  { label: 'W. Sahara', before: 40, after: 35 },
]

export const QUALITY_EXAMPLE = [
  { label: 'Inside study area', value: 100 },
  { label: 'Confidence mapped', value: 92 },
  { label: 'Same-day match', value: 84 },
  { label: 'Flagged as duplicate', value: 16 },
]

export const PIPELINE = [
  { name: 'Study area', state: 'Ready', detail: 'The sample map uses a fixed North Africa extent.' },
  { name: 'Sample catalog', state: 'Ready', detail: 'Local illustrative records are loaded in the browser.' },
  { name: 'FIRMS ingest', state: 'Not connected', detail: 'No live NASA feed is attached.' },
  { name: 'Harmonization job', state: 'Not run', detail: 'Cross-sensor matching has not been executed.' },
  { name: 'Supabase sync', state: 'Not connected', detail: 'The existing Supabase client is not used yet.' },
]

export const SAMPLE_NOTICES = [
  {
    id: 'catalog',
    title: 'Sample catalog only',
    body: 'This demo is not receiving live fire detections.',
  },
  {
    id: 'season',
    title: 'Designed summer peak',
    body: 'The sample year rises in July and August by design.',
  },
  {
    id: 'database',
    title: 'Supabase later',
    body: 'Database connection is left for a later step.',
  },
]

export const METHOD_STEPS = [
  {
    title: 'Ingest active-fire rows',
    text: 'The planned pipeline reads NASA FIRMS active-fire locations for MODIS and VIIRS. This demo does not download them.',
  },
  {
    title: 'Clip to the study area',
    text: 'Keep points that fall inside the North Africa extent used by the map.',
  },
  {
    title: 'Crosswalk confidence',
    text: 'Map each sensor’s confidence score onto a shared low, nominal, and high label.',
  },
  {
    title: 'Align the clock',
    text: 'Place acquisitions into a common daily window so day totals can be compared.',
  },
  {
    title: 'Collapse near-duplicates',
    text: 'Group detections that are close in space and time and likely describe the same event.',
  },
  {
    title: 'Keep fire radiative power',
    text: 'Retain FRP on the harmonized record so intensity can be charted after the match.',
  },
]

function hashString(value) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function allocate(total, items, weightKey = 'weight') {
  const raw = items.map((item) => total * item[weightKey])
  const counts = raw.map((value) => Math.floor(value))
  let remainder = total - counts.reduce((sum, value) => sum + value, 0)
  const order = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction)
  for (let index = 0; index < order.length && remainder > 0; index += 1) {
    counts[order[index].index] += 1
    remainder -= 1
  }
  return counts
}

export function seriesForRange(start, end) {
  return annualActivity.filter((row) => row.year >= start && row.year <= end)
}

export function summarizeSeries(rows) {
  const total = rows.reduce((sum, row) => sum + row.detections, 0)
  const average = rows.length ? Math.round(total / rows.length) : 0
  const peak = rows.reduce((best, row) => (row.detections > best.detections ? row : best), rows[0])
  return { total, average, peak }
}

export function countrySeries(total) {
  const counts = allocate(total, AREAS)
  return AREAS.map((area, index) => ({
    label: area.name,
    value: counts[index],
    color: AREA_COLORS[index],
  }))
}

export function monthlySeries(annualAverage) {
  return MONTH_WEIGHTS.map((weight, index) => ({
    label: MONTHS[index],
    value: Math.round(annualAverage * weight),
  }))
}

export function seasonalSeries(monthly) {
  const groups = [
    { label: 'DJF', indexes: [11, 0, 1] },
    { label: 'MAM', indexes: [2, 3, 4] },
    { label: 'JJA', indexes: [5, 6, 7] },
    { label: 'SON', indexes: [8, 9, 10] },
  ]
  return groups.map((group) => ({
    label: group.label,
    value: group.indexes.reduce((sum, index) => sum + monthly[index].value, 0),
  }))
}

export function satelliteSeries(total) {
  const counts = allocate(total, SATELLITE_META)
  return SATELLITE_META.map((item, index) => ({
    label: item.label,
    value: counts[index],
    color: item.color,
  }))
}

let hotspotIndex = 0

export const hotspots = AREAS.flatMap((area) =>
  area.places.map((place) => {
    const index = hotspotIndex
    hotspotIndex += 1
    const year = 2018 + (index % 7)
    const month = ((index * 5) % 12) + 1
    const day = (index % 27) + 1
    return {
      id: `FW-${24001 + index}`,
      country: area.name,
      lat: place[0],
      lng: place[1],
      satellite: SATELLITES[index % SATELLITES.length],
      confidence: ['high', 'nominal', 'low'][index % 3],
      frp: Math.round((10 + ((index * 9) % 75)) * 10) / 10,
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    }
  }),
)

export function daySample(iso) {
  const month = Number(iso.slice(5, 7))
  const hash = hashString(`firewatch-${iso}`)
  const factor = MONTH_FACTOR[month - 1] ?? 0.5
  const detections = Math.round(factor * (hash % 12))
  const visible = Math.min(detections, 4)
  const rows = Array.from({ length: visible }, (_, index) => {
    const area = AREAS[(hash + index) % AREAS.length]
    const place = area.places[(hash + index * 2) % area.places.length]
    return {
      id: `SAMPLE-${iso.replaceAll('-', '')}-${index + 1}`,
      country: area.name,
      lat: place[0],
      lng: place[1],
      satellite: SATELLITES[(hash + index) % SATELLITES.length],
      confidence: ['low', 'nominal', 'high'][(hash + index) % 3],
      frp: Math.round((8 + ((hash >> (index + 1)) % 70)) * 10) / 10,
    }
  })
  return { iso, detections, rows }
}

export function monthSample(year, monthIndex) {
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()
  return Array.from({ length: days }, (_, index) => {
    const iso = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`
    return daySample(iso)
  })
}
