import UsersApi from "@/apis/users.api";
import {IUserListState} from "@/interfaces/user.interface";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface IUserState {
  users: IUserListState[];
  user: IUserListState | null;
  userTrigger: number;
  snackbarMessage: string;
}

const initialState: IUserState = {
  users: [],
  user: null,
  userTrigger: 0,
  snackbarMessage: "",
};

export const userSlice = createSlice({
  name: "userState",
  initialState,

  reducers: {
    setUsers: (state, action: PayloadAction<IUserListState[]>) => {
      state.users = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserListState | null>) => {
      state.user = action.payload;
    },
    setUserTrigger: (state, action: PayloadAction<number>) => {
      state.userTrigger = action.payload;
    },
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.snackbarMessage = action.payload;
    },
  },
});

export const {setUsers, setUser, setUserTrigger, setSnackbarMessage} =
  userSlice.actions;
export const userReducer = userSlice.reducer;
