import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { FetchState } from "../FetchState";
import { queriesSelectors, vaccinationCentresSelectors, thunks } from "./slice";
import { createQueryId } from "./slice/query";
import { VaccinationCentresFilter } from "./slice/types";

export function useVaccinationCentre(id: string) {
  const dispatch = useAppDispatch();
  const filter: VaccinationCentresFilter = { id };
  dispatch(thunks.fetchVaccinationCentreThunk(filter));

  const queryId = createQueryId(filter);

  const vaccinationCentre = useAppSelector((state: RootState) =>
    vaccinationCentresSelectors.selectById(state.vaccinationCentres.centres, id)
  );

  const query = useAppSelector((state: RootState) =>
    queriesSelectors.selectById(state.vaccinationCentres.queries, queryId)
  );

  if (vaccinationCentre !== undefined) {
    return { vaccinationCentre, isLoading: false };
  }

  if (query?.fetchState === FetchState.rejected) {
    return { error: query?.error, isLoading: false };
  }

  if (
    query?.fetchState === FetchState.fulfilled &&
    vaccinationCentre === undefined
  ) {
    return { isLoading: false, vaccinationCentre: undefined };
  }

  return { isLoading: true };
}
