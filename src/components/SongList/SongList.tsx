import { useMusicPlayerStore } from '@/store'
import '@/components/SongList/style.css'
import { formatDuration } from '@/utility/timeFormat'

export function SongList() {
  const { trackList } = useMusicPlayerStore()

  return (
    <nav className="song-list-wrapper">
      {trackList.map(track => (
        <div key={track.title} className="song-item-wrapper">
          <button
            className="play-button"
            style={{ backgroundImage: `url(${track.cover})` }}
          ></button>
          <div className="song-info">
            <h2 className="song-title">{track.title}</h2>
            <h3 className="song-artist">{track.artist}</h3>
          </div>
          <h3>{formatDuration(track.duration)}</h3>
        </div>
      ))}
    </nav>
  )
}
