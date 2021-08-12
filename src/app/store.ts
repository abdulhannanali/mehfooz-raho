import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import vaccinationCentres from "../features/vaccinationCentres/vaccinationCentresSlice";
import vaccinationGroups from "../features/vaccinationGroups/vaccinationGroupsSlice";

export const store = configureStore({
  reducer: {
    vaccinationCentres,
    vaccinationGroups,
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
