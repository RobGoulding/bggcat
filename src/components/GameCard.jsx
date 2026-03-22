import { useState } from 'react'
import { getComplexityLabel, getComplexityClasses, getComplexityStars } from '../utils/complexity'
import GameDetail from './GameDetail'

function hashColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = ((hash % 360) + 360) % 360
  return `hsl(${hue}, 55%, 45%)`
}

function formatRange(min, max, suffix) {
  if (min === max) return `${min} ${suffix}`
  return `${min}–${max} ${suffix}`
}

export default function GameCard({ game, isExpanded, onSelect }) {
  const complexityLabel = getComplexityLabel(game.complexity)
  const complexityClasses = getComplexityClasses(complexityLabel)
  const [imgError, setImgError] = useState(false)
  const imageUrl = game.image ? `${import.meta.env.BASE_URL}images/${game.image}` : game.bggImageUrl || null
  const showImage = imageUrl && !imgError

  return (
    <div
      className="rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:rotate-[-0.5deg] transition-all duration-200 ease-out"
      onClick={() => onSelect(game.id)}
    >
      {/* Cover art with placeholder fallback */}
      <div
        className="aspect-[3/2] flex items-center justify-center p-4 relative overflow-hidden"
        style={{ backgroundColor: hashColor(game.name) }}
      >
        {showImage ? (
          <img
            src={imageUrl}
            alt={game.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-lg font-semibold text-center leading-tight">
            {game.name}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>{'\u{1F465}'} {formatRange(game.players.min, game.players.max, game.players.max === 1 ? 'player' : 'players')}</span>
          <span className="text-gray-300">{'\u00B7'}</span>
          <span>{'\u{23F1}'} {formatRange(game.playtime.min, game.playtime.max, 'min')}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${complexityClasses}`}>
            {getComplexityStars(complexityLabel)} {complexityLabel}
          </span>
          {game.genres.map((genre) => (
            <span
              key={genre}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
            >
              {genre}
            </span>
          ))}
        </div>

        {isExpanded && <GameDetail game={game} />}
      </div>
    </div>
  )
}
