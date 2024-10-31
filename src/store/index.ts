import { create } from 'zustand'

type Track = {
  id: number
  title: string
  artist: string
  src: string
  duration: string
  cover: string
}

interface MusicPlayerState {
  trackList: Track[]
  currentTrackIndex: number | null
  isPlaying: boolean
  volume: number
  favorites: number[]
  audio: HTMLAudioElement | null
  setTrackList: (tracks: Track[]) => void
  playTrack: (index: number) => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (volume: number) => void
  toggleFavorite: (songId: number) => void
  currentTime: number
  duration: number
}

export const useMusicPlayerStore = create<MusicPlayerState>((set, get) => {
  const localFavorites = localStorage.getItem('favorites')
  const savedFavorites = localFavorites ? JSON.parse(localFavorites) : []

  return {
    trackList: [],
    currentTrackIndex: null,
    isPlaying: false,
    volume: 0.5,
    favorites: savedFavorites,
    audio: null,
    currentTime: 0,
    duration: 0,

    setTrackList: tracks => set({ trackList: tracks }),

    playTrack: index => {
      const state = get()
      const track = state.trackList[index]
      let audio = state.audio

      // define utlity function to start updating song progress
      const startUpdatingProgress = () => {
        const updateProgress = () => {
          set({ currentTime: audio?.currentTime })
          if (!audio?.paused) {
            requestAnimationFrame(updateProgress)
          }
        }
        requestAnimationFrame(updateProgress)
      }

      // Create a new audio instance if none exists
      if (!audio) {
        audio = new Audio(track.src)
        audio.volume = state.volume

        // Set states, start song and track song progress when metadata is loaded
        audio.onloadedmetadata = () => {
          set({ duration: audio?.duration, audio, currentTrackIndex: index, isPlaying: true })
          audio?.play()
          startUpdatingProgress()
        }
        return
      }

      // Handle track switch
      if (state.currentTrackIndex !== index) {
        if (state.isPlaying) {
          audio.pause()
        }
        audio.src = track.src

        audio.onloadedmetadata = () => {
          set({ duration: audio?.duration, audio, currentTrackIndex: index, isPlaying: true })
          audio.play()
          startUpdatingProgress()
        }
        return
      }

      // Toggle play/pause
      if (state.isPlaying) {
        audio.pause()
        set({ isPlaying: false })
      } else {
        audio.play()
        set({ isPlaying: true })
        startUpdatingProgress()
      }
    },

    // modulo operator here ensures that playlist will behave in circular way. without it there would be out-of-bounds indices (for example -1 or more than the whole playlist length)
    nextTrack: () => {
      const { currentTrackIndex, trackList, playTrack } = get()

      if (currentTrackIndex !== null) {
        const nextIndex = (currentTrackIndex + 1) % trackList.length
        playTrack(nextIndex)
      }
    },

    prevTrack: () => {
      const { currentTrackIndex, trackList, playTrack } = get()

      if (currentTrackIndex !== null) {
        const prevIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length
        playTrack(prevIndex)
      }
    },

    setVolume: volume => {
      const { audio } = get()
      if (audio) {
        audio.volume = volume
      }
      set({ volume })
    },

    // using the spread operator to manage the favorites array is ok because it is only a flat array of primitive values. Otherwise, Immer could be a solution to use
    toggleFavorite: id => {
      set(state => {
        const updatedFavorites = state.favorites.includes(id)
          ? state.favorites.filter(favId => favId !== id)
          : [...state.favorites, id]

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

        return { favorites: updatedFavorites }
      })
    },
  }
})
