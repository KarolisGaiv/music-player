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
  togglePlayPause: () => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (volume: number) => void
  toggleFavorite: (volume: number) => void
}

export const useMusicPlayerStore = create<MusicPlayerState>((set, get) => ({
  trackList: [],
  currentTrackIndex: null,
  isPlaying: false,
  volume: 0.5,
  favorites: [],
  audio: null,

  setTrackList: tracks => set({ trackList: tracks }),

  playTrack: index => {
    const state = get()
    const track = state.trackList[index]
    let audio = state.audio

    // Create a new audio instance if none exists
    if (!audio) {
      audio = new Audio(track.src)
      audio.volume = state.volume
      set({ audio, currentTrackIndex: index, isPlaying: true })
      audio.play()
      setAudioTimeUpdate(audio, index)
      return
    }

    // If the track is different, handle the switch
    if (state.currentTrackIndex !== index) {
      if (state.isPlaying) {
        audio.pause()
      }
      audio.src = track.src
      audio.play()
      set({ currentTrackIndex: index, isPlaying: true })
      setAudioTimeUpdate(audio, index)
      return
    }

    // If the same track is loaded, toggle play/pause
    if (state.isPlaying) {
      audio.pause()
      set({ isPlaying: false })
    } else {
      audio.play()
      set({ isPlaying: true })
    }

    // set the time update listener for the audio
    function setAudioTimeUpdate(audioElement: HTMLAudioElement, currentIndex: number) {
      audioElement.ontimeupdate = () => {
        set({ currentTrackIndex: currentIndex })
      }
    }
  },

  togglePlayPause: () => {
    const { isPlaying, audio } = get()
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      set({ isPlaying: !isPlaying })
    }
  },

  // modulo operator here ensures that playlist will behave in circular way. without it there would be out-of-bounds indices (for example -1 or more than the whole playlist length)
  nextTrack: () => {
    const { currentTrackIndex, trackList, playTrack } = get()
    const nextIndex = (currentTrackIndex + 1) % trackList.length
    playTrack(nextIndex)
  },

  prevTrack: () => {
    const { currentTrackIndex, trackList, playTrack } = get()
    const prevIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length
    playTrack(prevIndex)
  },

  setVolume: volume => {
    const { audio } = get()
    if (audio) {
      audio.volume = volume
    }
    set({ volume })
  },

  // using the spread operator to manage the favorites array is ok because it is only a flat array of primitive values. Otherwise, Immer could be a solution to use
  toggleFavorite: id =>
    set(state => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter(favId => favId !== id)
        : [...state.favorites, id],
    })),
}))
