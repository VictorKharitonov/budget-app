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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserByChatId.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUserByChatId.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.user = action.payload;
    })
    builder.addCase(fetchUserByChatId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || '';
    })
  },
})

export default userInfoSlice.reducer;





