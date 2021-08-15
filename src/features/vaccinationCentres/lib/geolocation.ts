import { getDistance } from "geolib/es/index";
import { GeolibInputCoordinates } from "geolib/es/types";
import { VaccinationCentre } from "../../../api/vaccinationsFakeAPI";

interface VaccinationCentreWithProximity {
  origin: VaccinationCentre;
  target: VaccinationCentre;
  distance: number;
}

/**
 * Related Vaccination Centres are found out
 * @param vaccinationCentres
 * @returns
 */
export function sortVaccinationCentresByDistance(
  currentVaccinationCentre: VaccinationCentre,
  vaccinationCentres: VaccinationCentre[]
): VaccinationCentreWithProximity[] {
  const currentLocation = currentVaccinationCentre.location;

  return vaccinationCentres
    .map((vaccinationCentre) => {
      const distance = getDistance(currentLocation, vaccinationCentre.location);

      return {
        origin: currentVaccinationCentre,
        target: vaccinationCentre,
        distance,
      };
    })
    .sort((centreA, centreB) => centreA.distance - centreB.distance);
}
