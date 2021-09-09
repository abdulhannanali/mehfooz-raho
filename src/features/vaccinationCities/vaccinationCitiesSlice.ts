import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
  EntityAdapter,
  Dictionary,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { FetchState } from "../FetchState";
import { getVaccinationCities } from "../../lib/functionsClient";
import { VaccinationCity } from "@abdulhannanali/vaccination-centres-parser";

const groupsAdapter: EntityAdapter<VaccinationCity> = createEntityAdapter({});

export const fetchCitiesWithCountThunk = createAsyncThunk(
  "vaccinationGroups/fetchCitiesWithCount",
  () => getVaccinationCities()
);

const groupsSlice = createSlice({
  name: "vaccinationGroups",

  initialState: groupsAdapter.getInitialState({
    fetchState: FetchState.idle,
    error: <SerializedError | undefined>undefined,
  }),

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchCitiesWithCountThunk.fulfilled,
      (state, action: PayloadAction<VaccinationCity[]>) => {
        groupsAdapter.setAll(state, action);
        state.fetchState = FetchState.fulfilled;
      }
    );

    builder.addCase(fetchCitiesWithCountThunk.rejected, (state, action) => {
      state.fetchState = FetchState.rejected;
    });

    builder.addCase(fetchCitiesWithCountThunk.pending, (state) => {
      state.fetchState = FetchState.pending;
    });
  },
});

export const selectors = {
  selectVaccinationGroups: (state: RootState) => state.vaccinationGroups,
  selectFetchState: (state: RootState) =>
    selectors.selectVaccinationGroups(state).fetchState,
};

export const groupsSelectors = groupsAdapter.getSelectors(
  selectors.selectVaccinationGroups
);

export default groupsSlice.reducer;
