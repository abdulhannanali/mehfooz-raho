import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
  ActionReducerMapBuilder,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import {
  VaccinationCentre,
  fetchVaccinationCentres,
} from "../../api/vaccinationsFakeAPI";
import { FetchState } from "../FetchState";
import { GeolibInputCoordinates } from "geolib/es/types";
import { sortVaccinationCentresByDistance } from "./lib/geolocation";

const SLICE_NAME = "vaccinationCentres";

// How many thunks should be there?
// There must be two thunks that can help in this regard

export interface VaccinationsState {
  fetchState: FetchState;
  vaccinationCentres: VaccinationCentre[];
  error: SerializedError | null;
}

const initialState: VaccinationsState = {
  fetchState: FetchState.idle,
  vaccinationCentres: [],
  error: null,
};

const selectFetchState = (state: RootState) =>
  state.vaccinationCentres.fetchState;
const selectVaccinationCentres = (state: RootState) => state.vaccinationCentres;

const selectVaccinationCentreById = createSelector(
  [selectVaccinationCentres, (_: RootState, id: string) => id],
  function (vaccinationCentres, id) {
    return vaccinationCentres.vaccinationCentres.find(
      (vaccinationCentre) => vaccinationCentre.id === id
    );
  }
);

const selectVaccinationCentresByLocation = createSelector(
  [
    selectVaccinationCentres,
    (_: RootState, sourceCentre: VaccinationCentre) => sourceCentre,
  ],
  (state, sourceCentre) => {
    return sortVaccinationCentresByDistance(
      sourceCentre,
      state.vaccinationCentres
    );
  }
);

export const selectors = {
  selectFetchState,
  selectVaccinationCentres,
  selectVaccinationCentreById,
  selectVaccinationCentresByLocation,
};

export const fetchVaccinationCentresThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchVaccinationCentres`,
  (_, thunkAPI) => fetchVaccinationCentres()
);

function addFetchVaccinationCentresCases(
  builder: ActionReducerMapBuilder<VaccinationsState>
) {
  builder.addCase(fetchVaccinationCentresThunk.pending, (state) => {
    state.fetchState = FetchState.pending;
    state.vaccinationCentres = [];
  });

  builder.addCase(
    fetchVaccinationCentresThunk.fulfilled,
    (state, action: PayloadAction<VaccinationCentre[]>) => {
      state.vaccinationCentres = action.payload;
      state.fetchState = FetchState.fulfilled;
    }
  );

  builder.addCase(fetchVaccinationCentresThunk.rejected, (state, action) => {
    state.error = action.error;
    state.fetchState = FetchState.rejected;
  });
}

const vaccinationCentresSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addFetchVaccinationCentresCases(builder);
  },
});

export { selectVaccinationCentres, selectVaccinationCentreById };
export default vaccinationCentresSlice.reducer;
