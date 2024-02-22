import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../types/user';
import { fetchUserByChatIdAction, updateUserInfoAction } from '../asyncActions';

const initialUser: UserInfo = {
  isSuccess: false,
  isLoading: false,
  isUpdateSuccess: false,
  isUpdateLoading: false,
  user: {
    name: '',
    chatId: 0,
    categories: [],
    envelopes: [],
    _id: ''
  },
  errorUpdate: '',
  error: ''
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialUser,
  reducers: {
    clearUserInfoAction(state) {
      state.user = {
        name: '',
        chatId: 0,
        categories: [],
        envelopes: [],
        _id: ''
      };
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserByChatIdAction.pending, state => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchUserByChatIdAction.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      if (action.payload) {
        state.user = action.payload;
        state.error = '';
      } else {
        state.error = 'user not found';
      }
    });
    builder.addCase(fetchUserByChatIdAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || '';
    });
    builder.addCase(updateUserInfoAction.pending, state => {
      state.isUpdateLoading = true;
      state.isUpdateSuccess = false;
    });
    builder.addCase(updateUserInfoAction.fulfilled, (state, action) => {
      state.isUpdateSuccess = true;
      state.isUpdateLoading = false;
      state.user = {
        ...state.user,
        categories: action.payload.categories,
        envelopes: action.payload.envelopes
      };
    });
    builder.addCase(updateUserInfoAction.rejected, (state, action) => {
      state.isUpdateLoading = false;
      state.isUpdateSuccess = false;
      state.errorUpdate = action.payload || '';
    });
  }
});

export const { clearUserInfoAction } = userInfoSlice.actions;
