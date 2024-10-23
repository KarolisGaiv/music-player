import { useMusicPlayerStore } from '@/store'
import '@/components/SongList/style.css'
import { formatDuration } from '@/utility/timeFormat'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { BsPause } from 'react-icons/bs'
import classNames from 'classnames'

export function SongList() {
  const { trackList, playTrack, currentTrackIndex, togglePlayPause, isPlaying } =
    useMusicPlayerStore()

  return (
    <nav className="song-list-wrapper">
      {trackList.map((track, index) => (
        <div
          key={track.title}
          className={classNames('song-item-wrapper', {
            playing: currentTrackIndex === index,
          })}
        >
          <button
            className="play-button"
            style={{ backgroundImage: `url(${track.cover})` }}
            onClick={() => (currentTrackIndex === index ? togglePlayPause() : playTrack(index))}
          >
            {isPlaying && currentTrackIndex === index ? <BsPause /> : <AiOutlinePlayCircle />}
          </button>
          <div className="song-info">
            <h2 className="song-title">{track.title}</h2>
            <h3 className="song-artist">{track.artist}</h3>
          </div>
          <h3 className="song-duration">{formatDuration(track.duration)}</h3>
        </div>
      ))}
    </nav>
  )
}
