/**
 * Fetches the state
 * for different select elements
 *
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getFilterData } from "../../lib/functionsClient";
import { FetchState } from "../FetchState";

export const SLICE_NAME = "filterState";

type InitialState = {
  fetchState: FetchState;
  districts?: string[];
  tehsils?: string[];
  provinces?: string[];
};

const initialState: InitialState = {
  fetchState: FetchState.idle,
  districts: undefined,
  tehsils: undefined,
  provinces: undefined,
};

/**
 * Fetches Select Data
 */
export const getFilterDataThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchFilterData`,

  (_, thunkApi) => {
    return getFilterData();
  }
);

const filterSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilterDataThunk.pending, (state, action) => {
      state.fetchState = FetchState.pending;
    });

    builder.addCase(getFilterDataThunk.rejected, (state) => {
      state.fetchState = FetchState.rejected;
    });

    builder.addCase(getFilterDataThunk.fulfilled, (state, action) => {
      state.fetchState = FetchState.fulfilled;
      state.districts = action.payload.districts;
      state.tehsils = action.payload.tehsils;
      state.provinces = action.payload.provinces;
    });
  },
});

const selectFilterState = (state: RootState) => {
  return state.filter;
};

export const selectFetchState = (state: RootState) =>
  selectFilterState(state).fetchState;
export const selectDistricts = (state: RootState) =>
  selectFilterState(state).districts;
export const selectProvinces = (state: RootState) =>
  selectFilterState(state).provinces;
export const selectTehsils = (state: RootState) =>
  selectFilterState(state).tehsils;

export default filterSlice.reducer;
