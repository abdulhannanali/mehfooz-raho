import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import {
  VaccinationCentre,
  fetchVaccinationCentres
} from "../../api/vaccinationsFakeAPI";

const SLICE_NAME = "vaccinationCentres";

// How many thunks should be there?
// There must be two thunks that can help in this regard

export interface VaccinationsState {
  vaccinationCentres: VaccinationCentre[];
  error: SerializedError | null;
}

const initialState: VaccinationsState = {
  vaccinationCentres: [],
  error: null,
};

const selectVaccinationCentres = (state: RootState) => state.vaccinationCentres;

export const fetchVaccinationCentresThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchVaccinationCentres`,
  (_, thunkAPI) => fetchVaccinationCentres()
);

function addFetchVaccinationCentresCases(
  builder: ActionReducerMapBuilder<VaccinationsState>
) {
  builder.addCase(fetchVaccinationCentresThunk.pending, (state) => {
    state.vaccinationCentres = [];
  });

  builder.addCase(
    fetchVaccinationCentresThunk.fulfilled,
    (state, action: PayloadAction<VaccinationCentre[]>) => {
      state.vaccinationCentres = action.payload;
    }
  );

  builder.addCase(fetchVaccinationCentresThunk.rejected, (state, action) => {
    state.error = action.error;
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

export { selectVaccinationCentres };
export default vaccinationCentresSlice.reducer;
