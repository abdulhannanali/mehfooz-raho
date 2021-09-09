import { Alert, Col, Row, Skeleton, Typography } from "antd";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
import GutterRow from "../../GutterRow";
import { ResultEntityNotFound } from "../../ResultComponents";
import React from "react";
import Share from "../../ShareCard";
import { Helmet } from "react-helmet";
import VaccineDesignationTag from "../../vaccineDesignations/VaccineDesignationTag";
// import NearestVaccinationCenters from "./NearestVaccinationCeneters";
import { useVaccinationCentre } from "./hooks";
import { VaccinationCentre } from "@abdulhannanali/vaccination-centres-parser";
import { vaccineDesignations } from "../../vaccineDesignations";
import HealthCentreMap from "../../HealthCentreMap";

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

function VaccinationCentreInformationDiv(props: VaccinationCentre) {
  const { designation, province, district, tehsil, address, contact } = props.baseVaccinationCentre;

  const titleTextTuples: [string, string|undefined][] = [
    ["Province", province],
    ["District", district],
    ["Tehsil", tehsil],
    ["Address", address],
    ["Contact", contact]
  ]

  return (
    <div className="vaccinationCentreInformation">
      <Row style={{ margin: "1em 0 2em 0" }}>
        <VaccineDesignationTag designation={vaccineDesignations.all} />
      </Row>
      <Row gutter={[10, 30]}>
        {titleTextTuples.map(([title, value]) => {
          if (title !== undefined && value !== undefined) {
            return <TitleTextMarkup title={title} text={value} titleLevel={4} />
          }

          return null
        })}
      </Row>
    </div>
  );
}

export default function VaccinationCentreOverview(props: {}) {
  const params = useParams<{ centreId: string }>();

  const currentLocation = window.location.href;
  const result = useVaccinationCentre(params.centreId)

  if (result.isLoading === true) {
    return <Skeleton paragraph={{ rows: 5 }} active={true} />;
  }

  if (result.error || (result.isLoading === false && result.vaccinationCentre === undefined)) {
    return ResultEntityNotFound({ targetEntity: "Vaccination Centre" });
  }

  const vaccinationCentre = result.vaccinationCentre as VaccinationCentre
  const baseVaccinationCentre = vaccinationCentre.baseVaccinationCentre



  const linkTitle = `Vaccination Centre - ${baseVaccinationCentre.name}`;
  const linkDescription = `Get vaccinated from ${baseVaccinationCentre.name} in ${baseVaccinationCentre.tehsil}`;

  return (
    <React.Fragment>
      <Helmet>
        <title>{linkTitle}</title>
        <meta property="og:title" content={linkTitle} />
        <meta property="og:description" content={linkDescription} />
      </Helmet>
      <Row>
        <Col span={24}>
          <Typography.Title>{baseVaccinationCentre.name}</Typography.Title>
          <Share
            url={currentLocation}
            text="I found a vaccination centre near me!"
          />
        </Col>
      </Row>

      <GutterRow>
        <Col xs={24} md={12}>
          <VaccinationCentreInformationDiv {...vaccinationCentre}/>
          <Alert type="info" message="Confirm validity through your sources!" />
        </Col>
        <Col xs={24} md={12}>
          <HealthCentreMap vaccinationCentre={vaccinationCentre} />
        </Col>
      </GutterRow>
    </React.Fragment>
  );
}
