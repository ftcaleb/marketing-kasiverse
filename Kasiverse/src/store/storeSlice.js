import { createSlice } from '@reduxjs/toolkit';

const defaultStores = [
  {
    id: 1,
    title: 'Transport',
    description:
      "There isn't any reliable public transport to travel on a daily basis, and having to walk long distances just for transport is a bit tiring on a daily basis.",
    location: 'Midrand',
    category: 'Repairs',
    price: '50',
  },
  {
    id: 2,
    title: 'Need after-school tutoring',
    description:
      'Many parents work late and need affordable, safe after-school tutoring for their children in primary school.',
    location: 'Alexandra',
    category: 'Cleaning',
    price: '100',
  },
];

const loadStores = () => {
  try {
    const raw = localStorage.getItem('stores');
    return raw ? JSON.parse(raw) : defaultStores;
  } catch (e) {
    return defaultStores;
  }
};

const storesSlice = createSlice({
  name: 'stores',
  initialState: loadStores(),
  reducers: {
    addStore: (state, action) => {
      // Add new store to the top
      state.unshift(action.payload);

      // Persist updated stores array to localStorage
      try {
        localStorage.setItem('stores', JSON.stringify(state));
      } catch (e) {
        // ignore write errors
      }
    },
  },
});

export const { addStore } = storesSlice.actions;
export default storesSlice.reducer;
