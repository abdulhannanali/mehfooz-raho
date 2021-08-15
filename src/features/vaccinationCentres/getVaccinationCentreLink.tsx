import { VaccinationCentre } from "../../api/vaccinationsFakeAPI";

export default function getVaccinationCentreLink(
  vaccinationCentre: VaccinationCentre
) {
  return `/centre/${vaccinationCentre.id}`;
}
