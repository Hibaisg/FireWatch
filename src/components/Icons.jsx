export function FlameMark() {
  return (
    <svg className="flame" viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="#F97316"
        d="M16 4c2.1 4.1 2.3 6.4 1.4 8.4 1.7-.7 2.8-2.1 3.2-3.6 2.5 2.3 4.4 5.2 4.4 8.7 0 5.2-3.8 9.5-9 9.5s-9-4.3-9-9.5c0-3.8 2.1-6.7 4.2-8.6.7 1.7 1.9 3 3.4 3.6C15.3 10.8 15 8.1 16 4z"
      />
      <path
        fill="#FDBA74"
        d="M16 14.2c1.6 2.2 1.7 3.6.8 5 1-.6 1.6-1.5 1.8-2.4 1.4 1.4 2.4 3 2.4 4.8 0 2.8-2 5.2-5 5.2s-5-2.4-5-5.2c0-2 1.1-3.6 2.2-4.7.4 1 1.1 1.8 1.9 2.2.3-1.4.1-2.8.9-4.9z"
      />
    </svg>
  )
}

function Svg({ children }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconOverview() {
  return (
    <Svg>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6" {...stroke} />
      <rect x="13" y="3.5" width="7.5" height="4.5" rx="1.6" {...stroke} />
      <rect x="13" y="10.5" width="7.5" height="10" rx="1.6" {...stroke} />
      <rect x="3.5" y="13.5" width="7.5" height="7" rx="1.6" {...stroke} />
    </Svg>
  )
}

export function IconCalendar() {
  return (
    <Svg>
      <rect x="3.5" y="5" width="17" height="15" rx="2" {...stroke} />
      <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" {...stroke} />
    </Svg>
  )
}

export function IconMap() {
  return (
    <Svg>
      <path d="M9 18.5 3.5 20.5V6.2L9 4.5l6 2 5.5-2v14.2L15 20.5l-6-2Z" {...stroke} />
      <path d="M9 4.5v14M15 6.5v14" {...stroke} />
    </Svg>
  )
}

export function IconAnalytics() {
  return (
    <Svg>
      <path d="M4 19.5h16" {...stroke} />
      <path d="M7 16.5v-4M12 16.5V7.5M17 16.5v-6" {...stroke} />
    </Svg>
  )
}

export function IconHarmonize() {
  return (
    <Svg>
      <path d="M8 7.5h11M8 12h11M8 16.5h11" {...stroke} />
      <path d="M4.5 7.5h.01M4.5 12h.01M4.5 16.5h.01" {...stroke} />
      <path d="M15 4.5 18.5 7.5 15 10.5" {...stroke} />
    </Svg>
  )
}

export function IconAbout() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="8.2" {...stroke} />
      <path d="M12 11v5" {...stroke} />
      <path d="M12 8h.01" {...stroke} />
    </Svg>
  )
}

export function IconBell() {
  return (
    <Svg>
      <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15L6 16.5Z" {...stroke} />
      <path d="M10 19a2 2 0 0 0 4 0" {...stroke} />
    </Svg>
  )
}

export function IconUser() {
  return (
    <Svg>
      <circle cx="12" cy="8.5" r="3" {...stroke} />
      <path d="M5.5 19.2a6.5 6.5 0 0 1 13 0" {...stroke} />
    </Svg>
  )
}

export function IconMenu() {
  return (
    <Svg>
      <path d="M4 7h16M4 12h16M4 17h16" {...stroke} />
    </Svg>
  )
}

export function IconExport() {
  return (
    <Svg>
      <path d="M12 4.5v10" {...stroke} />
      <path d="m8 8 4-4 4 4" {...stroke} />
      <path d="M5 14.5v4h14v-4" {...stroke} />
    </Svg>
  )
}

export function IconFlame() {
  return (
    <Svg>
      <path
        d="M12 3.5c1.4 2.8 1.5 4.3.8 5.8 1.2-.5 1.9-1.5 2.2-2.5 1.7 1.6 3 3.6 3 6 0 3.6-2.6 6.5-6 6.5s-6-2.9-6-6.5c0-2.6 1.4-4.6 2.8-5.9.5 1.2 1.3 2.1 2.3 2.5-.3-1.6-.6-3.4.9-6.9Z"
        {...stroke}
      />
    </Svg>
  )
}

export function IconAverage() {
  return (
    <Svg>
      <path d="M4 16.5c2.2-4 3.4-4.2 5.2-1.2C11 18 12.2 18 14 13.5c1.2-3 2.2-3.2 3.2-1.5 1 1.6 1.6 1.6 2.8.2" {...stroke} />
    </Svg>
  )
}

export function IconPeak() {
  return (
    <Svg>
      <path d="m4 16 5-6 3.2 3.2L20 6" {...stroke} />
      <path d="M14.5 6H20v5.5" {...stroke} />
    </Svg>
  )
}

export function IconGlobe() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="8.2" {...stroke} />
      <path d="M3.8 12h16.4M12 3.8c2.2 2.3 3.3 5 3.3 8.2s-1.1 5.9-3.3 8.2c-2.2-2.3-3.3-5-3.3-8.2s1.1-5.9 3.3-8.2Z" {...stroke} />
    </Svg>
  )
}
