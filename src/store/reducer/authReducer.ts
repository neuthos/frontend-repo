import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface IAuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
  },
});

export const {setAuthState, setAccessToken} = authSlice.actions;
export const authReducer = authSlice.reducer;
