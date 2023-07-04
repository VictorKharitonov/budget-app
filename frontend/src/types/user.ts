import {EnvelopeItem} from "./envelopes";

export interface UserInfo {
  isSuccess: boolean,
  isLoading: boolean,
  user: User,
  error: string,
}

export interface User {
  name: string;
  chatId: number;
  categories: string[];
  envelopes: EnvelopeItem[];
  _id: string;
}