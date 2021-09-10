import { VaccinationCentre } from "@abdulhannanali/vaccination-centres-parser";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  EntityState,
  Update,
} from "@reduxjs/toolkit";
import {
  queriesAdapter,
  queriesSelectors,
  vaccinationCentresAdapter,
  vaccinationCentresSelectors,
} from ".";
import { RootState } from "../../../app/store";

import { getVaccinationCentres } from "../../../lib/functionsClient";
import { FetchState } from "../../FetchState";
import { SLICE_NAME } from "./constants";
import { createQueryId, initializeQuery } from "./query";
import { Query, VaccinationCentresFilter } from "./types";

type BuilderType = ActionReducerMapBuilder<{
  centres: EntityState<VaccinationCentre>;
  queries: EntityState<Query>;
}>;

export const fetchVaccinationCentresThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchVaccinationCentres`,
  (filter: VaccinationCentresFilter, thunkApi) => {
    return getVaccinationCentres(filter);
  }
);

export const fetchVaccinationCentreThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchVaccinationCentre`,
  (filter: VaccinationCentresFilter, thunkApi) => {
    const state = <RootState>thunkApi.getState();
    const query = queriesSelectors.selectById(
      state.vaccinationCentres.queries,
      createQueryId(filter)
    );

    if (query === undefined) {
      thunkApi.dispatch(fetchVaccinationCentresThunk(filter));
    }
  }
);

export function addFetchVaccinationCentresCases(builder: BuilderType) {
  builder.addCase(fetchVaccinationCentresThunk.pending, (state, action) => {
    const queryId = createQueryId(action.meta.arg);
    const query = queriesSelectors.selectById(state.queries, queryId);

    if (query && query.fetchState === FetchState.fulfilled) {
      console.log("Query is already fulfilled");
      return;
    } else {
      queriesAdapter.setOne(state.queries, initializeQuery(action.meta.arg));
    }
  });

  builder.addCase(fetchVaccinationCentresThunk.fulfilled, (state, action) => {
    const queryId = createQueryId(action.meta.arg);
    const query = queriesSelectors.selectById(state.queries, queryId);
    const response = action.payload;
    vaccinationCentresAdapter.setMany(state.centres, response.elements);

    queriesAdapter.updateOne(state.queries, {
      id: queryId,
      changes: {
        fetchState: FetchState.fulfilled,
        response: {
          ...response,
          elements: response.elements.map((element) => element.id),
        },
      },
    });
  });

  builder.addCase(fetchVaccinationCentresThunk.rejected, (state, action) => {
    const queryId = createQueryId(action.meta.arg);
    const query = queriesSelectors.selectById(state.queries, queryId);

    if (query === undefined) {
      return;
    }

    const queryUpdate: Update<Query> = {
      id: queryId,
      changes: {
        fetchState: FetchState.rejected,
        error: action.error,
      },
    };

    queriesAdapter.updateOne(state.queries, queryUpdate);
  });
}
