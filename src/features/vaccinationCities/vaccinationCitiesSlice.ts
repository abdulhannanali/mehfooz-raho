import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
  EntityAdapter,
  Dictionary,
} from "@reduxjs/toolkit";
import {
  CityWithCount,
  fetchCitiesWithCount,
} from "../../api/vaccinationsFakeAPI";
import { RootState } from "../../app/store";

import { isDistrictFilter, isProvinceFilter, Filter } from "./FilterType";
import { FetchState } from "../FetchState";

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
);

export const selectCitiesIdsByFilter = createSelector(
  [groupsSelectors.selectEntities, (_: any, filter: Filter) => filter],
  (entities, filter) => {
    return Object.entries(entities)
      .filter(([key, cityWithCount]) => {
        if (cityWithCount && typeof key === "string") {
          if (isDistrictFilter(filter)) {
            return (
              cityWithCount.city.district === filter.district &&
              cityWithCount.city.province === filter.province
            );
          }

          if (isProvinceFilter(filter)) {
            return cityWithCount.city.province === filter.province;
          }
        }

        return false;
      })
      .map(([key]) => key);
  }
);

export default groupsSlice.reducer;
