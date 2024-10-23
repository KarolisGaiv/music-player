import { useMusicPlayerStore } from '@/store'
import { formatDuration } from '@/utility/timeFormat'
import { BsPlay, BsPause, BsVolumeUp } from 'react-icons/bs'
import classNames from 'classnames'
import '@/components/SongList/style.css'
import { useState } from 'react'

export function SongList() {
  const { trackList, playTrack, currentTrackIndex, isPlaying } = useMusicPlayerStore()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav className="song-list-wrapper">
      {trackList.map((track, index) => (
        <div
          key={track.title}
          className={classNames('song-item-wrapper', {
            playing: currentTrackIndex === index,
          })}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button
            className={classNames('play-button', { playing: currentTrackIndex === index })}
            style={{ backgroundImage: `url(${track.cover})` }}
            onClick={() => playTrack(index)}
          >
            {currentTrackIndex === index ? (
              isPlaying ? (
                hoveredIndex === index ? (
                  <BsPause className="play-icon" />
                ) : (
                  <BsVolumeUp className="volume-icon" />
                )
              ) : (
                <BsPlay className="play-icon" />
              )
            ) : hoveredIndex === index ? (
              <BsPlay className="play-icon" />
            ) : null}
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
