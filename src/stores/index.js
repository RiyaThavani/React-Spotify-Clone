import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './player'
import likesReducer, { LIKED_STORAGE_KEY } from './likes'
import authReducer, { AUTH_STORAGE_KEY } from './auth'
import playlistsReducer, { PLAYLISTS_STORAGE_KEY } from './playlists'

const store = configureStore({
  reducer: {
    player: playerReducer,
    likes: likesReducer,
    auth: authReducer,
    playlists: playlistsReducer,
  },
})

store.subscribe(() => {
  try {
    localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(store.getState().likes.likedSongIds));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(store.getState().auth.user));
    localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(store.getState().playlists.playlists));
  } catch {
    // storage unavailable — likes/auth/playlists simply won't persist
  }
});

export default store

