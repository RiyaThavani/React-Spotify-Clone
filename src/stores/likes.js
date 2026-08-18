import { createSlice } from '@reduxjs/toolkit'

export const LIKED_STORAGE_KEY = 'liked-song-ids';

const loadInitial = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(LIKED_STORAGE_KEY));
    if (Array.isArray(stored)) return stored;
  } catch {
    // corrupted/empty storage — start fresh
  }
  return [];
};

const initialState = {
  likedSongIds: loadInitial(),
};

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const id = action.payload;
      const index = state.likedSongIds.indexOf(id);
      if (index === -1) {
        state.likedSongIds.push(id);
      } else {
        state.likedSongIds.splice(index, 1);
      }
    },
  },
})

export const {
  toggleLike,
} = likesSlice.actions

export default likesSlice.reducer