import {createSlice} from "@reduxjs/toolkit";
import {UserInfo} from "../../types/user";
import {fetchUserByChatId} from "../asyncActions/fetchUserByChatIdAction";

const initialUser: UserInfo = {
  isSuccess: false,
  isLoading: false,
  user: {
    name: '',
    chatId: 0,
    categories: [],
    envelopes: [],
    _id: '',
  },
  error: '',
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialUser,
  reducers: {
    clearUserInfo(state) {
      state.user = {
        name: '',
        chatId: 0,
        categories: [],
        envelopes: [],
        _id: '',
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByChatId.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    })
    builder.addCase(fetchUserByChatId.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      if (action.payload) {
        state.user = action.payload;
        state.error = '';
      } else {
        state.error = 'user not found';
      }
    })
    builder.addCase(fetchUserByChatId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || '';
    })
  },
})

export default userInfoSlice.reducer;
export const { clearUserInfo } = userInfoSlice.actions;





