import { useMusicPlayerStore } from '@/store'
import { useEffect, useState } from 'react'

export function usePlaylist() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const setTrackList = useMusicPlayerStore(state => state.setTrackList)

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const res = await fetch('/tracks.json')
        if (!res.ok) {
          throw new Error('Failed to fetch track data')
        }
        const data = await res.json()
        setTrackList(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
      }
      setLoading(false)
    }

    fetchPlaylistData()
  }, [setTrackList])

  return { loading, error }
}
