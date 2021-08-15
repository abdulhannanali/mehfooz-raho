import { Alert, Col, Result, Row, Skeleton, Typography } from "antd";
import { VaccinationCentre } from "../../api/vaccinationsFakeAPI";
import { useLocation, useParams } from "react-router-dom";

import * as skeletonData from "./skeletonData";

import {
  fetchVaccinationCentresThunk,
  selectors as vaccinationCentresSelectors,
} from "./vaccinationCentresSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import GutterRow from "../../GutterRow";
import { ResultEntityNotFound } from "../../ResultComponents";
import React from "react";
import HealthCentreMap from "../../HealthCentreMap";
import Share from "../../ShareCard";
import { Helmet } from "react-helmet";
import { VaccinationCentreProps } from "./types";
import { FetchState } from "../FetchState";
import VaccineDesignationTag from "./VaccineDesignationTag";
import NearestVaccinationCenters from "./NearestVaccinationCeneters";

function TitleTextMarkup(props: {
  title: string;
  text: string;
  titleLevel: 1 | 2 | 3 | 4 | 5;
}) {
  const { titleLevel, title, text } = props;

  return (
    <Col xs={24} md={12}>
      <Typography.Title level={titleLevel}>{title}</Typography.Title>
      <Typography.Text>{text}</Typography.Text>
    </Col>
  );
}

function VaccinationCentreInformationDiv(props: VaccinationCentreProps) {
  const { vaccinationCentre } = props;
  const { tehsil, district, address, contact, designation, province } =
    vaccinationCentre;

  return (
    <div className="vaccinationCentreInformation">
      <Row style={{ margin: "1em 0 2em 0" }}>
        <VaccineDesignationTag designation={designation} />
      </Row>
      <Row gutter={[10, 30]}>
        <TitleTextMarkup title="Province" text={province} titleLevel={4} />
        <TitleTextMarkup title="District" text={district} titleLevel={4} />
        <TitleTextMarkup title="Tehsil" text={tehsil} titleLevel={4} />
        <TitleTextMarkup title="Address" text={address} titleLevel={4} />
        <TitleTextMarkup title="Contact" text={contact} titleLevel={4} />
      </Row>
    </div>
  );
}

export default function VaccinationCentreOverview(props: {}) {
  const params = useParams<{ centreId: string }>();

  const fetchState = useAppSelector(
    vaccinationCentresSelectors.selectFetchState
  );

  const dispatch = useAppDispatch();
  const currentLocation = window.location.href;

  const isLoading =
    FetchState.idle == fetchState || FetchState.pending === fetchState;

  const vaccinationCentre = useAppSelector((state) =>
    vaccinationCentresSelectors.selectVaccinationCentreById(
      state,
      params.centreId
    )
  );

  if (fetchState === FetchState.idle) {
    dispatch(fetchVaccinationCentresThunk());
  }

  if (isLoading) {
    return <Skeleton paragraph={{ rows: 5 }} active={true} />;
  }

  if (vaccinationCentre === undefined) {
    return ResultEntityNotFound({ targetEntity: "Vaccination Centre" });
  }

  const linkTitle = `Vaccination Centre - ${vaccinationCentre.name}`;
  const linkDescription = `Get vaccinated from ${vaccinationCentre.name} in ${vaccinationCentre.tehsil}`;

  return (
    <React.Fragment>
      <Helmet>
        <title>{linkTitle}</title>
        <meta property="og:title" content={linkTitle} />
        <meta property="og:description" content={linkDescription} />
      </Helmet>
      <Row>
        <Col span={24}>
          <Typography.Title>{vaccinationCentre?.name}</Typography.Title>
          <Share
            url={currentLocation}
            text="Go get vaccinated from this center"
          />
        </Col>
      </Row>

      <GutterRow>
        <Col xs={24} md={12}>
          <VaccinationCentreInformationDiv
            vaccinationCentre={vaccinationCentre}
          />
        </Col>
        <Col xs={24} md={12}>
          <HealthCentreMap vaccinationCentre={vaccinationCentre} />
        </Col>
      </GutterRow>
      <Row>
        <Col xs={24} md={12}>
          <Typography.Title level={3}>
            Related Vaccination Centers
          </Typography.Title>
          <NearestVaccinationCenters vaccinationCentre={vaccinationCentre} />
        </Col>
        <Col xs={24} md={12}>
          <Alert
            type="info"
            showIcon
            message="Map here makes the best attempt at finiding the location, please confirm if this is outdated through your own sources before going"
          />
          <br />
          <Alert
            type="info"
            showIcon
            message="Although an attempt has been made of keeping this up to date, in case this is outdated, please also confirm from official sources and peole around you. Maybe there's a new centre nearer to you that we don't know about"
          />
          <br />
          <Alert
            type="info"
            message="If there's misleading information on this page. Please contact me immediately so this can be resolved"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
