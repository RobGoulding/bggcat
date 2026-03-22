import { useState, useMemo } from 'react'
import { useGames } from './hooks/useGames'
import { applyAllFilters, extractGenres } from './utils/filters'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import FilterPills from './components/FilterPills'
import GameGrid from './components/GameGrid'

function App() {
  const { games, loading } = useGames()
  const [search, setSearch] = useState('')
  const [playerCount, setPlayerCount] = useState(null)
  const [selectedComplexity, setSelectedComplexity] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])

  const allGenres = useMemo(() => extractGenres(games), [games])

  const filteredGames = useMemo(
    () =>
      applyAllFilters(games, {
        search,
        playerCount,
        complexity: selectedComplexity,
        genres: selectedGenres,
      }),
    [games, search, playerCount, selectedComplexity, selectedGenres]
  )

  const stats = useMemo(() => {
    if (filteredGames.length === 0) return null
    const playerMins = filteredGames.map((g) => g.players.min)
    const playerMaxes = filteredGames.map((g) => g.players.max)
    const playtimeMins = filteredGames.map((g) => g.playtime.min)
    const playtimeMaxes = filteredGames.map((g) => g.playtime.max)
    return {
      total: filteredGames.length,
      playerRange: [Math.min(...playerMins), Math.max(...playerMaxes)],
      playtimeRange: [Math.min(...playtimeMins), Math.max(...playtimeMaxes)],
    }
  }, [filteredGames])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <p className="text-slate-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 space-y-6">
      <header className="bg-slate-800 text-white py-6 px-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{'\u{1F3B2}'} Board Game Library {'\u{1F3AF}'}</h1>
          <span className="text-2xl">{'\u{1F9E9}'}</span>
        </div>
      </header>
      {stats && (
        <div className="flex items-center gap-6 text-sm text-slate-600 bg-white/70 backdrop-blur rounded-lg px-4 py-2.5 shadow-sm">
          <span>{'\u{1F3B2}'} <strong>{stats.total}</strong> games</span>
          <span className="text-slate-300">|</span>
          <span>{'\u{1F465}'} {stats.playerRange[0]}&ndash;{stats.playerRange[1]} players</span>
          <span className="text-slate-300">|</span>
          <span>{'\u{23F1}'} {stats.playtimeRange[0]}&ndash;{stats.playtimeRange[1]} min</span>
        </div>
      )}
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar
        playerCount={playerCount}
        onPlayerCountChange={setPlayerCount}
        selectedComplexity={selectedComplexity}
        onComplexityChange={setSelectedComplexity}
        selectedGenres={selectedGenres}
        onGenreChange={setSelectedGenres}
        allGenres={allGenres}
      />
      <FilterPills
        search={search}
        onSearchChange={setSearch}
        playerCount={playerCount}
        onPlayerCountChange={setPlayerCount}
        selectedComplexity={selectedComplexity}
        onComplexityChange={setSelectedComplexity}
        selectedGenres={selectedGenres}
        onGenreChange={setSelectedGenres}
      />
      <GameGrid games={filteredGames} />
    </div>
  )
}

export default App
