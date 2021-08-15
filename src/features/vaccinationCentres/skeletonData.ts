/**
 * Efficient Data Structures for loading of the Skeleton Data
 *
 */
import { VaccinationCentre } from "../../api/vaccinationsFakeAPI";

import { vaccineDesignations } from "./vaccineDesignations";

const vaccinationCentre: VaccinationCentre = {
  name: "Vaccination Centre ABC",
  contact: "123456789",
  address: "A Road To Nowhere",
  tehsil: "Tehsil",
  district: "District",
  designation: vaccineDesignations.all,
  id: Math.random().toString(),
  province: "Province",
  location: {
    latitude: "31.4818684",
    longitude: "74.239943",
  },
};

export function getVaccinationCentre() {
  return vaccinationCentre;
}

export function getVaccinationCentres(length: number) {
  const array: VaccinationCentre[] = [];

  for (let i = 0; i < length; i++) {
    array.push(vaccinationCentre);
  }

  return array;
}
