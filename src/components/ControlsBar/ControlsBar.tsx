import { useMusicPlayerStore } from '@/store'
import '@/components/ControlsBar/style.css'

export function ControlsBar() {
  const { prevTrack, playTrack, nextTrack, trackList, currentTrackIndex } = useMusicPlayerStore()

  if (currentTrackIndex) {
    const currentTrackDetails = trackList[currentTrackIndex]
  }

  return (
    <div>
      <div className="progress-bar"></div>
      <div className="controls-wrapper">
        <div className="left-controls">
          <button onClick={() => prevTrack()}>Previous</button>
          <button onClick={() => playTrack(currentTrackIndex)}>Play/Pause</button>
          <button onClick={() => nextTrack()}>Next</button>
        </div>
        <div className="middle-controls"></div>
        <div className="right-controls"></div>
      </div>
    </div>
  )
}
