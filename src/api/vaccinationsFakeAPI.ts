import faker from "faker";
import { nanoid } from "@reduxjs/toolkit";
import { groupBy, uniqBy } from "ramda";

export enum VaccinationDesignation {
  all,
  citizens,
  healthCareWorkers,
}

export interface VaccinationCentre {
  id: string;
  district: string;
  province: string;
  tehsil: string;
  address: string;
  contact: string;
  name: string;
  designation: VaccinationDesignation;
}

export interface VaccinationCity {
  province: string;
  district: string;
  tehsil: string;
}

function generateFakeVaccinationCentres() {
  const provinces = 5;
  const districtsPerProvinces = 5;
  const tehsilsPerProvinces = 10;
  const healthCareCentersPerTehsils = 10;

  const healthCareCenters: VaccinationCentre[] = [];

  Array(provinces)
    .fill(0)
    .map((_, i) => {
      const provinceName = faker.address.state();
      return Array(districtsPerProvinces)
        .fill(0)
        .map((_, j) => {
          const districtName = faker.address.county();
          return new Array(tehsilsPerProvinces).fill(0).map((_, k) => {
            const tehsilName = faker.address.city();
            return new Array(healthCareCentersPerTehsils)
              .fill(0)
              .map((_, k) => {
                const healthCareCentreName = faker.company.companyName();

                healthCareCenters.push({
                  id: nanoid(),
                  district: districtName,
                  province: provinceName,
                  tehsil: tehsilName,
                  address: `${healthCareCentreName}, ${faker.address.streetName()}, ${tehsilName}, ${districtName}, ${provinceName}`,
                  contact: faker.phone.phoneNumber(),
                  name: healthCareCentreName,
                  designation: [
                    VaccinationDesignation.all,
                    VaccinationDesignation.healthCareWorkers,
                    VaccinationDesignation.citizens,
                  ][Math.floor(Math.random() * 3)],
                });
              });
          });
        });
    });

  return healthCareCenters;
}

const vaccinationCentres: VaccinationCentre[] =
  generateFakeVaccinationCentres();

export function fetchVaccinationCentres(): Promise<VaccinationCentre[]> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(vaccinationCentres);
    }, 4000);
  });
}

export async function searchVaccinationCentres(searchString: string) {
  return vaccinationCentres.filter((centre) => {
    for (const value of Object.values(centre)) {
      if (searchString.match(value) !== null) {
        return true;
      }
    }

    return false;
  });
}

export async function getVaccinationCentreFullInformation(
  vaccinationCentreId: string
) {
  for (const centre of vaccinationCentres) {
    if (centre.id === vaccinationCentreId) {
      return centre;
    }
  }
}

function getCity(vaccinationCentre: VaccinationCentre): VaccinationCity {
  return {
    district: vaccinationCentre.district,
    tehsil: vaccinationCentre.tehsil,
    province: vaccinationCentre.province,
  };
}

function isCityEqual(cityA: VaccinationCity, cityB: VaccinationCity): boolean {
  return (
    cityA.province === cityB.province &&
    cityA.district === cityB.district &&
    cityA.tehsil === cityB.tehsil
  );
}

export interface CityWithCount {
  city: VaccinationCity;
  count: number;
  id: string;
}

export function fetchCitiesWithCount(): CityWithCount[] {
  return vaccinationCentres
    .reduce(
      (
        groupsByCities: VaccinationCentre[][],
        vaccinationCentre: VaccinationCentre
      ) => {
        const cityGroup = groupsByCities.find((cityGroup) =>
          isCityEqual(cityGroup[0], vaccinationCentre)
        );

        if (cityGroup) {
          cityGroup.push(vaccinationCentre);
        } else {
          groupsByCities.push([vaccinationCentre]);
        }

        return groupsByCities;
      },
      []
    )
    .map((cityGroup) => ({
      id: getCityId(cityGroup[0]),
      city: getCity(cityGroup[0]),
      count: cityGroup.length,
    }));
}

function getCityId(city: VaccinationCity) {
  return `${city.province}/${city.district}/${city.tehsil}`;
}
