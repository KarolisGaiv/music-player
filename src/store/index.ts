import { create } from 'zustand'

type Track = {
  id: number
  title: string
  artist: string
  src: string
  duration: string
}

interface MusicPlayerState {
  trackList: Track[]
  currentTrackIndex: number
  isPlaying: boolean
  volume: number
  favorites: number[]
  setTrackList: (tracks: Track[]) => void
  playTrack: (index: number) => void
  togglePlayPause: () => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (volume: number) => void
  toggleFavorite: (volume: number) => void
}

export const useMusicPlayerStore = create<MusicPlayerState>(set => ({
  trackList: [],
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 0.5,
  favorites: [],

  setTrackList: tracks => set({ trackList: tracks }),

  playTrack: index => set({ currentTrackIndex: index, isPlaying: true }),

  togglePlayPause: () => set(state => ({ isPlaying: !state.isPlaying })),

  // modulo operator here ensures that playlist will behave in circular way. without it there would be out-of-bounds indices (for example -1 or more than the whole playlist length)
  nextTrack: () =>
    set(state => ({
      currentTrackIndex: (state.currentTrackIndex + 1) % state.trackList.length,
    })),

  prevTrack: () =>
    set(state => ({
      currentTrackIndex:
        (state.currentTrackIndex - 1 + state.trackList.length) % state.trackList.length,
    })),

  setVolume: volume => set({ volume }),

  // using the spread operator to manage the favorites array is ok because it is only a flat array of primitive values. Otherwise, Immer could be a solution to use
  toggleFavorite: id =>
    set(state => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter(favId => favId !== id)
        : [...state.favorites, id],
    })),
}))
