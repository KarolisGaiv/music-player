import { useMusicPlayerStore } from '@/store'
import '@/components/FavoritedSongsList/style.css'

export function FavoritedSongsList() {
  const { trackList, favorites } = useMusicPlayerStore()

  const favoritedTracks = trackList.filter(track => favorites.includes(track.id))

  return (
    <div className="favorite-list-wrapper">
      <h3>Favorited Songs</h3>
      {favoritedTracks.length > 0 ? (
        favoritedTracks.map(track => (
          <div key={track.id} className="favorite-item-wrapper">
            <div className="favorite-song-info">
              <h4 className="song-title">{track.title}</h4>
              <h5 className="song-artist">{track.artist}</h5>
            </div>
          </div>
        ))
      ) : (
        <p>No favorited songs yet.</p>
      )}
    </div>
  )
}
