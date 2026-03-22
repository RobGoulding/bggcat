import { useState } from 'react'
import GameCard from './GameCard'

export default function GameGrid({ games }) {
  const [expandedId, setExpandedId] = useState(null)

  function handleSelect(id) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">{'\u{1F3B2}'}</p>
        <p className="text-lg text-slate-600 font-medium">No games found!</p>
        <p className="text-sm text-slate-400 mt-1">Roll again with different filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isExpanded={expandedId === game.id}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
