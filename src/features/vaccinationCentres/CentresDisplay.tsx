import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CentresFilter, { FilterChangeObject } from "../filter/Filter";
import VaccinationCentresList from "./VaccinationCentresList";
import { VaccinationCentresFilter } from "./slice/types";
import { useHistory, useLocation } from "react-router";
import { fetchVaccinationCentresThunk } from "./slice/thunks";
import { queriesSelectors } from "./slice";
import { createQueryId } from "./slice/query";
import { isEmpty } from "ramda";
import { ResultEntityNotFound } from "../../ResultComponents";
import PaginationComponent from "./Pagination";
import GutterRow from "../../GutterRow";
import { Col, Row } from "antd";

type CentreRouteState =
  | {
      filter: VaccinationCentresFilter | undefined;
    }
  | undefined;

export default function CentresDisplay() {
  const dispatch = useAppDispatch();
  const initialFilter = useVaccintionCentresFilter();
  const setFilter = useUpdatedFilterLocation();

  const queryId = createQueryId(initialFilter);

  const query = useAppSelector((state) =>
    queriesSelectors.selectById(state.vaccinationCentres.queries, queryId)
  );

  const centresResponse = query?.response;

  if (query === undefined) {
    dispatch(fetchVaccinationCentresThunk(initialFilter));
  }

  function onChangeFilter(filter: FilterChangeObject) {
    const newFilter: VaccinationCentresFilter = {
      ...initialFilter,

      province: filter.province,
      district: filter.district,
      filterText: filter.text,
      page: "1",
    };

    setFilter(newFilter);
  }

  function onChangePage(page: number) {
    setFilter({
      ...initialFilter,
      page: page.toString(),
    });
  }

  const isResponseEmpty = isEmpty(centresResponse?.elements);
  let finalElement;

  if (isResponseEmpty) {
    finalElement = <ResultEntityNotFound targetEntity="Vaccination Centre" />;
  } else if (centresResponse && "elements" in centresResponse) {
    finalElement = (
      <React.Fragment>
        <GutterRow>
          <VaccinationCentresList centres={centresResponse.elements} />
        </GutterRow>
        <Row justify="space-around">
          <Col>
            <PaginationComponent
              response={centresResponse}
              onChange={onChangePage}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CentresFilter
        currentFilter={initialFilter}
        onChangeFilter={onChangeFilter}
      />
      {finalElement}
    </React.Fragment>
  );
}

function useVaccintionCentresFilter(): VaccinationCentresFilter {
  const location = useLocation<CentreRouteState>();
  const queryParams = new URLSearchParams(useLocation().search);

  function getQueryParamOrUndefined(param: string) {
    const value = queryParams.get(param);
    return value === null ? undefined : value;
  }

  if (location.state?.filter) {
    return location.state.filter;
  }

  return {
    id: getQueryParamOrUndefined("id"),
    district: getQueryParamOrUndefined("district"),
    tehsil: getQueryParamOrUndefined("tehsil"),
    province: getQueryParamOrUndefined("province"),
    filterText: getQueryParamOrUndefined("filterText"),
    page: getQueryParamOrUndefined("page"),
  };
}

function useUpdatedFilterLocation() {
  const history = useHistory();

  return (filter: VaccinationCentresFilter) => {
    const newPath = `${history.location.pathname}${serializeFilterToParams(
      filter
    )}`;
    history.replace(newPath, { filter });
  };
}

function serializeFilterToParams(filter: VaccinationCentresFilter) {
  let newString = "?";

  for (const [key, value] of Object.entries(filter)) {
    if (value !== undefined && value !== "") {
      newString += `${key}=${value}&`;
    }
  }

  return newString.slice(0, newString.length - 1);
}
