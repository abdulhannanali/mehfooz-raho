import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchErrorNotification } from "../../notifications";
import VaccinationCentresList from "./VaccinationCentresList";
import {
  fetchVaccinationCentresThunk,
  selectVaccinationCentres,
} from "./vaccinationCentresSlice";
import { getVaccinationCentreFullInformation } from "./vaccinationsFakeAPI";

let isFetchedOnce = false;

export default function CentresDisplay() {
  const dispatch = useAppDispatch();
  const { vaccinationCentres, error } = useAppSelector(
    selectVaccinationCentres
  );
  const isLoading = vaccinationCentres && vaccinationCentres[0] == undefined;

  if (!isFetchedOnce) {
    isFetchedOnce = true;
    dispatch(fetchVaccinationCentresThunk());
  }

  useEffect(() => {
    if (error) {
      fetchErrorNotification("CentresDisplay");
    }
  }, [error]);

  return (
    <React.Fragment>
      <VaccinationCentresList
        isLoading={isLoading}
        centres={vaccinationCentres}
      />
    </React.Fragment>
  );
}
