import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
  createSelector,
  EntityAdapter,
} from "@reduxjs/toolkit";
import {
  CityWithCount,
  fetchCitiesWithCount,
} from "../../api/vaccinationsFakeAPI";
import { RootState } from "../../app/store";

import { isDistrictFilter, isProvinceFilter, Filter } from "./FilterType";
import { FetchState } from "../types";

const groupsAdapter: EntityAdapter<CityWithCount> = createEntityAdapter({});

export const fetchCitiesWithCountThunk = createAsyncThunk(
  "vaccinationGroups/fetchCitiesWithCount",
  () => fetchCitiesWithCount()
);


const groupsSlice = createSlice({
  name: "vaccinationGroups",
  initialState: groupsAdapter.getInitialState({
    fetchState: FetchState.idle,
  }),

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchCitiesWithCountThunk.fulfilled,
      (state, action: PayloadAction<CityWithCount[]>) => {
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
)

export const selectCitiesByFilter = createSelector(
  [groupsSelectors.selectAll, (_: any, filter: { district?: string; province: string; } | null) => filter],
  (citiesWithCount, filter) => {
    if (!filter) {
      return citiesWithCount
    }

    citiesWithCount.filter(cityWithCount => {
      return (
        (filter.province && filter.province === cityWithCount.city.province) &&
        (
          (filter.district && filter.district === cityWithCount.city.district) ||
          !(filter.district)
        )
      )
    })
  }
);

export default groupsSlice.reducer;
