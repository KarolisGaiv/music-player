import { useMusicPlayerStore } from '@/store'

export function FavoritedSongsList() {
  const { trackList, favorites } = useMusicPlayerStore()

  const favoritedTracks = trackList.filter(track => favorites.includes(track.id))

  return (
    <div>
      <h2>Favorited Songs</h2>
      <ul>
        {favoritedTracks.map(track => (
          <div key={track.id}>
            <h6>{track.title}</h6>
            <h6>{track.artist}</h6>
          </div>
        ))}
      </ul>
    </div>
  )
}
