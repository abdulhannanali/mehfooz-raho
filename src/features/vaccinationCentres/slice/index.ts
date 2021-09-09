import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { VaccinationCentre } from "@abdulhannanali/vaccination-centres-parser";
import { FetchState } from "../../FetchState";
import { SLICE_NAME } from "./constants";
import { addFetchVaccinationCentresCases } from "./thunks";
import { Query } from "./types";

export const vaccinationCentresAdapter = createEntityAdapter<VaccinationCentre>({
  selectId: (centre) => centre.id
})

export const queriesAdapter = createEntityAdapter<Query>({
  selectId: (centre) => centre.id
}) 


// Create a vaccinations entity adapter
// So we can simply filter out the vaccination centres we need

const vaccinationCentresSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    centres: vaccinationCentresAdapter.getInitialState(),
    queries: queriesAdapter.getInitialState()
  },
  reducers: {},
  extraReducers: (builder) => {
    addFetchVaccinationCentresCases(builder);
  },
});


export const queriesSelectors = queriesAdapter.getSelectors()
export const vaccinationCentresSelectors = vaccinationCentresAdapter.getSelectors()

export * as thunks from "./thunks";

export default vaccinationCentresSlice.reducer;
