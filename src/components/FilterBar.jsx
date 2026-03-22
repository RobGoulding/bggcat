import { COMPLEXITY_BANDS, getComplexityClasses } from '../utils/complexity'

function Chip({ label, isSelected, onClick, selectedClasses }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-3 py-1 rounded-full border transition-colors ${
        isSelected
          ? selectedClasses || 'bg-slate-100 text-slate-800 border-slate-200'
          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  )
}

function toggleItem(arr, item) {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]
}

export default function FilterBar({
  playerCount,
  onPlayerCountChange,
  selectedComplexity,
  onComplexityChange,
  selectedGenres,
  onGenreChange,
  allGenres,
}) {
  return (
    <div className="space-y-4">
      {/* Player count */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700 shrink-0">{'\u{1F465}'} Players</label>
        <div className="relative">
          <input
            type="number"
            min="1"
            max="20"
            value={playerCount ?? ''}
            onChange={(e) => {
              const val = e.target.value
              onPlayerCountChange(val === '' ? null : parseInt(val, 10))
            }}
            placeholder="Any"
            className="w-20 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          />
        </div>
        {playerCount != null && (
          <button
            onClick={() => onPlayerCountChange(null)}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            clear
          </button>
        )}
      </div>

      {/* Complexity */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-700 shrink-0">{'\u2B50'} Complexity</span>
        {COMPLEXITY_BANDS.map((band) => (
          <Chip
            key={band}
            label={band}
            isSelected={selectedComplexity.includes(band)}
            onClick={() => onComplexityChange(toggleItem(selectedComplexity, band))}
            selectedClasses={`${getComplexityClasses(band)} border-transparent`}
          />
        ))}
      </div>

      {/* Genres */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-700 shrink-0">{'\u{1F3F7}\uFE0F'} Genre</span>
        {allGenres.map((genre) => (
          <Chip
            key={genre}
            label={genre}
            isSelected={selectedGenres.includes(genre)}
            onClick={() => onGenreChange(toggleItem(selectedGenres, genre))}
          />
        ))}
      </div>
    </div>
  )
}
