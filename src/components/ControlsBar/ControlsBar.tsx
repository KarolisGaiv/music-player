import { useMusicPlayerStore } from '@/store'
import '@/components/ControlsBar/style.css'
import {
  MdSkipNext,
  MdSkipPrevious,
  MdOutlinePause,
  MdOutlinePlayArrow,
  MdOutlineVolumeUp,
  MdOutlineVolumeOff,
  MdFavorite,
  MdFavoriteBorder,
} from 'react-icons/md'
import { formatDuration } from '@/utility/timeFormat'

export function ControlsBar() {
  const {
    prevTrack,
    playTrack,
    nextTrack,
    trackList,
    currentTrackIndex,
    currentTime,
    duration,
    isPlaying,
    volume,
    setVolume,
    favorites,
    toggleFavorite,
  } = useMusicPlayerStore()

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  const trackDetails = currentTrackIndex !== null ? trackList[currentTrackIndex] : null

  const isFavorited = trackDetails && favorites.includes(trackDetails.id)

  return (
    <div className="player-bar">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
      <div className="controls-wrapper">
        <div className="left-controls">
          <button onClick={() => prevTrack()}>
            <MdSkipPrevious className="control-icon" />
          </button>
          <button onClick={() => currentTrackIndex !== null && playTrack(currentTrackIndex)}>
            {isPlaying ? (
              <MdOutlinePause className="play-pause-icon" />
            ) : (
              <MdOutlinePlayArrow className="play-pause-icon" />
            )}
          </button>
          <button onClick={() => nextTrack()}>
            <MdSkipNext className="control-icon" />
          </button>
          <div className="time-details">
            <span>
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </span>
          </div>
        </div>
        <div className="middle-controls">
          <div className="cover-container">
            <img src={trackDetails?.cover} alt="{trackDetails.title}" />
          </div>
          <div className="song-details">
            <span>{trackDetails?.title}</span>
            <span>{trackDetails?.artist}</span>
          </div>
        </div>
        <div className="right-controls">
          <div className="volume-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
            <button
              className="volume-button"
              onClick={() => (volume === 0 ? setVolume(0.5) : setVolume(0))}
            >
              {volume > 0 ? (
                <MdOutlineVolumeUp className="sound-icon" />
              ) : (
                <MdOutlineVolumeOff className="sound-icon" />
              )}
            </button>
          </div>
          <button onClick={() => trackDetails && toggleFavorite(trackDetails.id)}>
            {isFavorited ? (
              <MdFavorite className="favorite-icon" />
            ) : (
              <MdFavoriteBorder className="favorite-icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
