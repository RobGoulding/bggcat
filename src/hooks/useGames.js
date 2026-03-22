import { useState, useEffect } from 'react'

export function useGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}games.json`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load games:', err)
        setLoading(false)
      })
  }, [])

  return { games, loading }
}
