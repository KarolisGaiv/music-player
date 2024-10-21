import { useMusicPlayerStore } from '@/store'
import track1 from '@/assets/audio/stomp-rap-adrenaline-133120.mp3'
import track2 from '@/assets/audio/track2.mp3'
import track3 from '@/assets/audio/track3.mp3'
import { useEffect } from 'react'

const tracks = [
  {
    id: 1,
    title: 'Stomp Rap | Adrenaline',
    artist: 'Alex-Productions',
    src: track1,
    duration: '56',
  },
  {
    id: 2,
    title: 'Best Background Music no Copyright',
    artist: 'DesiFreeMusic',
    src: track2,
    duration: '24',
  },
  {
    id: 3,
    title: 'background music for Trailer & Shorts',
    artist: 'holdi2017',
    src: track3,
    duration: '12',
  },
]

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

  useEffect(() => {
    setTrackList(tracks)
  }, [setTrackList])

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
