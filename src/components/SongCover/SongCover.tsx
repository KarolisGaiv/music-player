import { useMusicPlayerStore } from '@/store'
import '@/components/SongCover/style.css'

export function SongCover() {
  const { trackList, currentTrackIndex } = useMusicPlayerStore()

  if (currentTrackIndex === null) {
    return <figure>Start listening music</figure>
  }

  const currentTrack = trackList[currentTrackIndex]

  return (
    <figure>
      <img src={currentTrack.cover} alt="{currentTrack.title}" />
    </figure>
  )
}
