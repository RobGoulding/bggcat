function Pill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-slate-900 ml-0.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  )
}

export default function FilterPills({
  search,
  onSearchChange,
  playerCount,
  onPlayerCountChange,
  selectedComplexity,
  onComplexityChange,
  selectedGenres,
  onGenreChange,
}) {
  const hasFilters =
    search || playerCount != null || selectedComplexity.length > 0 || selectedGenres.length > 0

  if (!hasFilters) return null

  function clearAll() {
    onSearchChange('')
    onPlayerCountChange(null)
    onComplexityChange([])
    onGenreChange([])
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {search && (
        <Pill label={`Search: "${search}"`} onRemove={() => onSearchChange('')} />
      )}
      {playerCount != null && (
        <Pill label={`${playerCount} players`} onRemove={() => onPlayerCountChange(null)} />
      )}
      {selectedComplexity.map((band) => (
        <Pill
          key={band}
          label={band}
          onRemove={() => onComplexityChange(selectedComplexity.filter((b) => b !== band))}
        />
      ))}
      {selectedGenres.map((genre) => (
        <Pill
          key={genre}
          label={genre}
          onRemove={() => onGenreChange(selectedGenres.filter((g) => g !== genre))}
        />
      ))}
      <button
        onClick={clearAll}
        className="text-sm text-gray-500 hover:text-gray-700 ml-1"
      >
        Clear all
      </button>
    </div>
  )
}
