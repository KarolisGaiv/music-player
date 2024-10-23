import { usePlaylist } from './hooks/usePlaylist'
import { SongList } from './components/SongList/SongList'
import '@/index.css'

function App() {
  const { loading, error } = usePlaylist()

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
        <section>
          <figure>PLACEHOLDER FOR SONG COVER</figure>
        </section>
        <aside>
          <SongList />
        </aside>
      </main>
    </div>
  )
}

export default App
