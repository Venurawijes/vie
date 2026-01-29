import { createSlice } from '@reduxjs/toolkit';

interface ISharedState {
  isMute: boolean;
}

const initialState: ISharedState = {
  isMute: true,
};

export const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState,
  reducers: {
    setIsMute: (state, { payload }) => {
      state.isMute = payload;
    },
  },
});

export const { setIsMute } = sharedSlice.actions;

export default sharedSlice.reducer;
