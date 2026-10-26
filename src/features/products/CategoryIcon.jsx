const ICON_PATHS = {
  boards:
    'M14 14h20v20H14z M19 8v6 M24 8v6 M29 8v6 M19 34v6 M24 34v6 M29 34v6 M8 19h6 M8 24h6 M8 29h6 M34 19h6 M34 24h6 M34 29h6',
  sensors: 'M24 33v8 M24 33a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M17 22a10 10 0 0 1 14 0 M11 16a18 18 0 0 1 26 0',
  components: 'M5 24h9 M14 18h20v12H14z M34 24h9 M20 18v12 M25 18v12 M29 18v12',
  tools: 'M14 6h20v36H14z M18 11h12v8H18z M24 35a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M24 30l3-3',
  kits: 'M8 16l16-8 16 8v18l-16 8-16-8z M8 16l16 8 16-8 M24 24v18',
}

function CategoryIcon({ category, className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path d={ICON_PATHS[category] ?? ICON_PATHS.components} />
    </svg>
  )
}

export default CategoryIcon
