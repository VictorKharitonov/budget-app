import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { getUserInfoByChatId } from '../../Api/budgetApi';

export const fetchUserByChatIdAction = createAsyncThunk<User, number, { rejectValue: string }>(
  'user/fetchUser',
  async (chatId, { rejectWithValue }) => {
    try {
      return await getUserInfoByChatId(chatId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
