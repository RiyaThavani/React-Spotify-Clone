import { createSlice } from '@reduxjs/toolkit'

export const PLAYLISTS_STORAGE_KEY = 'spotify-playlists'

const loadInitial = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(PLAYLISTS_STORAGE_KEY))
    if (Array.isArray(stored)) return stored
  } catch {
    // corrupted / empty storage — start fresh
  }
  return []
}

const initialState = {
  playlists: loadInitial(),
}

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    createPlaylist: (state, action) => {
      const { id, name } = action.payload
      state.playlists.push({ id, name, songIds: [], createdAt: Date.now() })
    },
    renamePlaylist: (state, action) => {
      const playlist = state.playlists.find(p => p.id === action.payload.id)
      if (playlist) playlist.name = action.payload.name
    },
    deletePlaylist: (state, action) => {
      state.playlists = state.playlists.filter(p => p.id !== action.payload)
    },
    addSongToPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload
      const playlist = state.playlists.find(p => p.id === playlistId)
      if (playlist && !playlist.songIds.includes(songId)) {
        playlist.songIds.push(songId)
      }
    },
    removeSongFromPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload
      const playlist = state.playlists.find(p => p.id === playlistId)
      if (playlist) {
        playlist.songIds = playlist.songIds.filter(id => id !== songId)
      }
    },
  },
})

export const {
  createPlaylist,
  renamePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = playlistsSlice.actions

export default playlistsSlice.reducer