import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './player'
import likesReducer, { LIKED_STORAGE_KEY } from './likes'

const store = configureStore({
  reducer: {
    player: playerReducer,
    likes: likesReducer,
  },
})

store.subscribe(() => {
  try {
    localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(store.getState().likes.likedSongIds));
  } catch {
    // storage unavailable — likes simply won't persist
  }
});

export default store

