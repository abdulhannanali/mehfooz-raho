import { VaccinationCentre } from "@abdulhannanali/vaccination-centres-parser";
import { PaginationResponse } from "../../../lib/functionsClient";
import { FetchState } from "../../FetchState";
import { VaccinationCentresFilter } from "./types";
import { Query } from "./types";

export function initializeQuery(filter: VaccinationCentresFilter): Query {
  return {
    id: createQueryId(filter),
    fetchState: FetchState.idle,
    filter,
  };
}

export function createQueryId(filter: VaccinationCentresFilter): string {
  let stringValue = "";

  for (const [key, value] of Object.entries(filter)) {
    stringValue += `__${value}__`.slice(0, 256);
  }

  return stringValue;
}
