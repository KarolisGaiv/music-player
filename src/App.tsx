import { usePlaylist } from '@/hooks/usePlaylist'
import { SongList } from '@/components/SongList/SongList'
import { SongCover } from '@/components/SongCover/SongCover'
import { ControlsBar } from '@/components/ControlsBar/ControlsBar'
import { FavoritedSongsList } from '@/components/FavoritedSongsList/FavoritedSongsList'
import { useMusicPlayerStore } from '@/store'
import '@/index.css'

function App() {
  const { loading, error } = usePlaylist()
  const { currentTrackIndex } = useMusicPlayerStore()

  if (loading) {
    return <div>Loading playlist...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="content-wrapper">
      <header>
        <h1>Music Player</h1>
      </header>
      <main>
        <aside className="favorites-list">
          <FavoritedSongsList />
        </aside>
        <section className="cover-image-wrapper">
          <SongCover />
        </section>
        <aside>
          <SongList />
        </aside>
      </main>
      <footer>{currentTrackIndex !== null && <ControlsBar />}</footer>
    </div>
  )
}

export default App
