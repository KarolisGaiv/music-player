import { useMusicPlayerStore } from '@/store'
import '@/components/ControlsBar/style.css'
import { MdSkipNext } from 'react-icons/md'
import { MdSkipPrevious } from 'react-icons/md'
import { MdOutlinePause } from 'react-icons/md'
import { MdOutlinePlayArrow } from 'react-icons/md'

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
    isPlaying,
  } = useMusicPlayerStore()

  if (currentTrackIndex) {
    const currentTrackDetails = trackList[currentTrackIndex]
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="player-bar">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
      <div className="controls-wrapper">
        <div className="left-controls">
          <button onClick={() => prevTrack()}>
            <MdSkipPrevious className="control-icon" />
          </button>
          <button onClick={() => playTrack(currentTrackIndex)}>
            {isPlaying ? <MdOutlinePause /> : <MdOutlinePlayArrow />}
          </button>
          <button onClick={() => nextTrack()}>
            <MdSkipNext className="control-icon" />
          </button>
        </div>
        <div className="middle-controls"></div>
        <div className="right-controls"></div>
      </div>
    </div>
  )
}
