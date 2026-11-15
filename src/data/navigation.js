export const PAGES = [
  {
    id: 'overview',
    to: '/',
    label: 'Overview',
    title: 'Overview',
    end: true,
  },
  {
    id: 'calendar',
    to: '/calendar',
    label: 'Fire Calendar',
    title: 'Fire Calendar',
  },
  {
    id: 'map',
    to: '/map',
    label: 'Map Explorer',
    title: 'Map Explorer',
  },
  {
    id: 'analytics',
    to: '/analytics',
    label: 'Analytics & Trends',
    title: 'Analytics & Trends',
  },
  {
    id: 'harmonization',
    to: '/harmonization',
    label: 'Data Harmonization',
    title: 'Data Harmonization',
  },
  {
    id: 'about',
    to: '/about',
    label: 'About & Data Sources',
    title: 'About & Data Sources',
  },
]

export function pageFromPath(pathname) {
  return PAGES.find((page) => page.to === pathname) ?? PAGES[0]
}
