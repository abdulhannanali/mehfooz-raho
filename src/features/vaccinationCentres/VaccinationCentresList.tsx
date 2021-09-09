import { Col } from "antd";
import React from "react";
import VaccinationCentreCard from "./VaccinationCentreCard";
import GutterRow from "../../GutterRow";

export default function VaccinationCentresList(props: { centres: string[] }) {
  const cards = props.centres.map((centre, i) => {
    return (
      <Col xs={24} lg={12} key={centre}>
        <VaccinationCentreCard id={centre} />
      </Col>
    )
  });

  return (
    <React.Fragment>
      <GutterRow style={{margin: '0 auto'}}>{cards}</GutterRow>
    </React.Fragment>
  );
}