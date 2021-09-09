import axios from "axios";
import {
  FilterData,
  VaccinationCentre,
  VaccinationCity,
} from "@abdulhannanali/vaccination-centres-parser/dist/src";
import { VaccinationCentresFilter } from "../features/vaccinationCentres/slice/types";

export interface PaginationResponse<T> {
  currentPage: number;
  totalPages: number;
  currentStartIdx: number;
  currentEndIdx: number;
  totalElements: number;
  elements: T[];
}

const baseURL =
  window.location.href.indexOf("localhost") !== -1
    ? "http://localhost:38791"
    : "/.functions/";

const client = axios.create({
  baseURL,
});

export async function getVaccinationCentres(filter: VaccinationCentresFilter) {
  const response = await client.get("/centres", {
    params: {
      page: filter.page || "1",
      district: filter.district || "",
      tehsil: filter.tehsil || "",
      name: filter.filterText,
      province: filter.province,
    } as VaccinationCentresFilter,
  });

  return response.data as PaginationResponse<VaccinationCentre>;
}

export async function getVaccinationCities() {
  const response = await client.get("/cities");
  return response.data as VaccinationCity[];
}

export async function getFilterData() {
  const response = await client.get("/filter");
  return response.data as FilterData;
}
