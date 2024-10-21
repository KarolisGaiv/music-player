import { useMusicPlayerStore } from '@/store'
import { usePlaylist } from './hooks/usePlaylist'

function App() {
  const {
    trackList,
    setTrackList,
    playTrack,
    togglePlayPause,
    nextTrack,
    prevTrack,
    isPlaying,
    currentTrackIndex,
    favorites,
    toggleFavorite,
  } = useMusicPlayerStore()

  const { loading, error } = usePlaylist()

  if (loading) {
    return <div>Loading playlist...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Music Player</h1>
      <div>
        {trackList.map((track, index) => (
          <div key={track.id}>
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
            <button onClick={() => playTrack(index)}>
              {isPlaying && currentTrackIndex === index ? 'Pause' : 'Play'}
            </button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={prevTrack}>Previous</button>
        <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={nextTrack}>Next</button>
      </div>
    </div>
  )
}

export default App
