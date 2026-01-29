import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IDashboardState } from '../interface/dashboard-state.interface';
import { DashboardApi } from '../api/dashboard.api';
import { FetchBranchesProps } from '../types/fetch-branches-props.type';
import { IBranch } from '@/shared/interfaces/branch.interface';

const dashboardApi = new DashboardApi();

const initialState: IDashboardState = {
  branches: [],
  branchIds: [],
  isLoading: false,
  error: null,
};

export const fetchBranchesAsync = createAsyncThunk(
  'dashboard/branches',
  async (props: FetchBranchesProps, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.fetchBranches(props);
      return {
        data: response.data,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Logic cases
    builder.addCase(fetchBranchesAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchBranchesAsync.fulfilled, (state, { payload }) => {
      const {
        data: { results },
      } = payload;
      const ids = results.map((result: IBranch) => result.id);
      state.isLoading = false;
      state.branches = results;
      state.branchIds = ids;
    });

    builder.addCase(fetchBranchesAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
