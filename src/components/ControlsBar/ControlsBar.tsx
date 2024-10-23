import { useMusicPlayerStore } from '@/store'
import '@/components/ControlsBar/style.css'

export function ControlsBar() {
  const {
    prevTrack,
    playTrack,
    nextTrack,
    trackList,
    currentTrackIndex,
    currentTime,
    duration,
    updateCurrentTime,
  } = useMusicPlayerStore()

  if (currentTrackIndex) {
    const currentTrackDetails = trackList[currentTrackIndex]
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  return (
    <div>
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
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
