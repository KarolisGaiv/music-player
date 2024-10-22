import { useMusicPlayerStore } from '@/store'

export function SongList() {
  const { trackList } = useMusicPlayerStore()

  return (
    <nav>
      {trackList.map(track => (
        <div key={track.title}>
          <button>Play/pause</button>
          <div>
            <h2>{track.title}</h2>
            <h3>{track.artist}</h3>
          </div>
          <h3>{track.duration}</h3>
        </div>
      ))}
    </nav>
  )
}
