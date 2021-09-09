import { Card, Row, Skeleton, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import healthCareWorkerImage from "./avatars/healthcareworker.png";
import React from "react";
import VaccineDesignationTag from "../../vaccineDesignations/VaccineDesignationTag";
import { VaccinationCentre } from "@abdulhannanali/vaccination-centres-parser";
import { vaccineDesignations } from "../../vaccineDesignations";
import { useAppSelector } from "../../app/hooks";
import { vaccinationCentresSelectors } from "./slice";


export default function VaccinationCentreCard(props: {
  id: string;
}) {
  const { id } = props;
  const parsedDeisgnation = vaccineDesignations.all 
  let vaccinationCentre = useAppSelector(state => vaccinationCentresSelectors.selectById(state.vaccinationCentres.centres, id))

  if (!vaccinationCentre) {
    return null
  }

  return (
    <Card hoverable>
        <Link to={getVaccinationCentreLink(vaccinationCentre)}>
          <Card.Meta
            title={
              <Typography.Title level={5}>
                <span style={{'wordBreak': 'break-all', wordWrap: 'break-word', width: '100vw'}}>
                  {vaccinationCentre.baseVaccinationCentre.name}
                </span>
              </Typography.Title>
            }
            description={
              <React.Fragment>
                  <VaccineDesignationTag designation={parsedDeisgnation} />
                  <Tag color="cyan">{vaccinationCentre.baseVaccinationCentre.district}</Tag>
                  <Tag color="pink">{vaccinationCentre.baseVaccinationCentre.tehsil}</Tag>
              </React.Fragment>
            }
          ></Card.Meta>
        </Link>
    </Card>
  );
}


function getVaccinationCentreLink (vaccinationCentre: VaccinationCentre) {
  return `/centre/${vaccinationCentre.id}`
}
