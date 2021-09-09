import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import vaccinationCentres from "../features/vaccinationCentres/slice";
import vaccinationGroups from "../features/vaccinationCities/vaccinationCitiesSlice";
import filter from '../features/filter/slice'

export const store = configureStore({
  reducer: {
    vaccinationCentres,
    vaccinationGroups,
    filter,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
