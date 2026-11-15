import { useEffect } from 'react'
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function FitBounds({ bounds }) {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(bounds, {
      padding: [28, 28],
      maxZoom: 6,
    })
  }, [map, bounds])

  return null
}

function getActivityColor(value, maxActivity) {
  const ratio = maxActivity > 0 ? value / maxActivity : 0

  if (ratio >= 0.7) return '#FACC15'
  if (ratio >= 0.3) return '#F97316'
  return '#38BDF8'
}

export default function FireMap({
  points,
  selectedId,
  onSelect,
  bounds,
  maxActivity,
}) {
  return (
    <MapContainer
      center={[26.5, 10]}
      zoom={4}
      minZoom={3}
      maxZoom={10}
      scrollWheelZoom
      className="fire-map"
    >
      <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

      <FitBounds bounds={bounds} />

      {points.map((cell) => {
        const selected = cell.cell_id === selectedId
        const color = getActivityColor(
          cell.viirs_harmonized,
          maxActivity
        )

        return (
          <CircleMarker
            key={cell.cell_id}
            center={[cell.cell_lat, cell.cell_lon]}
            radius={selected ? 9 : 5}
            pathOptions={{
              color,
              weight: selected ? 3 : 1,
              fillColor: color,
              fillOpacity: selected ? 1 : 0.75,
            }}
            eventHandlers={{
              click: () => onSelect(cell),
            }}
          >
            <Popup>
              <div className="map-popup">
                <strong>{cell.cell_id}</strong>
                <p>{cell.countries}</p>
                <p>
                  {cell.year} · Month {cell.month_num}
                </p>
                <p>
                  Harmonized activity: {cell.viirs_harmonized.toFixed(2)}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}