import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthApi } from '../api/auth.api';
import { LoginInputProps } from '../types/login-input-props.type';
import { IAuthState } from '../interface/auth-state.interface';
import { LOCALSTORAGE_KEY_ORDER_COMPLETE_CONFIRM_BOX } from '@/shared/constants/common';

const authApi = new AuthApi();

const initialState: IAuthState = {
  authUser: null,
  company: null,
  authToken: null,
  authTokenType: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (props: LoginInputProps, { rejectWithValue }) => {
    try {
      const response = await authApi.login(props);
      let headers = {};
      if (
        response.headers &&
        typeof response.headers === 'object' &&
        typeof response.headers.toJSON === 'function'
      ) {
        headers = response.headers.toJSON();
      }

      return {
        data: response.data,
        headers: headers as { authorization?: string },
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.authUser = null;
      state.company = null;
      state.authToken = null;
      state.authTokenType = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Logic cases
    builder.addCase(loginAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginAsync.fulfilled, (state, { payload }) => {
      const {
        data: { user, token_type, access_token, company },
      } = payload;
      state.isLoading = false;
      state.authUser = user;
      state.company = company;
      state.isAuthenticated = true;
      state.authToken = access_token;
      state.authTokenType = token_type;

      localStorage.setItem(LOCALSTORAGE_KEY_ORDER_COMPLETE_CONFIRM_BOX, '0');
    });

    builder.addCase(loginAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearError, logout } = authSlice.actions;

export default authSlice.reducer;
