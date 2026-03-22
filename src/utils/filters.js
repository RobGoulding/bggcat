import { getComplexityLabel } from './complexity'

export function filterBySearch(games, query) {
  if (!query) return games
  const lower = query.toLowerCase()
  return games.filter((g) => g.name.toLowerCase().includes(lower))
}

export function filterByPlayerCount(games, count) {
  if (count == null) return games
  return games.filter((g) => g.players.min <= count && g.players.max >= count)
}

export function filterByComplexity(games, selectedBands) {
  if (!selectedBands.length) return games
  return games.filter((g) => selectedBands.includes(getComplexityLabel(g.complexity)))
}

export function filterByGenre(games, selectedGenres) {
  if (!selectedGenres.length) return games
  return games.filter((g) =>
    g.genres.some((genre) => selectedGenres.includes(genre))
  )
}

export function applyAllFilters(games, { search, playerCount, complexity, genres }) {
  let result = games
  result = filterBySearch(result, search)
  result = filterByPlayerCount(result, playerCount)
  result = filterByComplexity(result, complexity)
  result = filterByGenre(result, genres)
  return result
}

export function extractGenres(games) {
  const genreSet = new Set()
  games.forEach((g) => g.genres.forEach((genre) => genreSet.add(genre)))
  return [...genreSet].sort()
}
