import { SerializedError } from "@reduxjs/toolkit";
import { PaginationResponse } from "../../../lib/functionsClient";
import { FetchState } from "../../FetchState";
import { VaccineDesignation } from "../../../vaccineDesignations/vaccineDesignations";

export interface VaccinationCentresFilter {
  id?: string;
  district?: string;
  tehsil?: string;
  province?: string;
  designation?: VaccineDesignation;
  filterText?: string;
  page?: string;
}

export interface Query {
  id: string;
  fetchState: FetchState;
  filter: VaccinationCentresFilter;
  error?: SerializedError;
  response?: PaginationResponse<string>;
}
