// src/redux/pasteSlice.js
import { createSlice } from '@reduxjs/toolkit';

/* ---------------------- 1. INITIAL STATE ---------------------- */
function loadPastes() {
  try {
    const raw = localStorage.getItem('pastes');
    return raw ? JSON.parse(raw) : [];
  } catch {
    localStorage.removeItem('pastes');   // corrupted cache => reset
    return [];
  }
}

const initialState = {
  pastes: loadPastes(),   // ✅ object with `pastes` array inside
};

/* ---------------------- 2.  SLICE ----------------------------- */
export const pasteSlice = createSlice({
  name: 'paste',          // ← name doesn’t affect selector path
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
    },

    updateToPastes: (state, action) => {
      const updated = action.payload;                 // whole paste object
      const idx = state.pastes.findIndex(p => p._id === updated._id);
      if (idx !== -1) {
        state.pastes[idx] = updated;
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
      }
    },

    removeFromPastes: (state, action) => {
      const id = action.payload;                      // id to delete
      state.pastes = state.pastes.filter(p => p._id !== id);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
    },

    resetToPastes: state => {
      state.pastes = [];
      localStorage.removeItem('pastes');
    },
  },
});

/* ---------------------- 3. EXPORTS ---------------------------- */
export const {
  addToPastes,
  updateToPastes,
  removeFromPastes,
  resetToPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
