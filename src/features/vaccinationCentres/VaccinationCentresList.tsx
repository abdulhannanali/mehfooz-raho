import { Col, Row, Skeleton } from "antd";
import React from "react";
import VaccinationCentreCard from "./VaccinationCentreCard";
import GutterRow from "../../GutterRow";

export function VaccinationCentresList(props: { centres: string[] }) {
  const cards = props.centres.map((centre, i) => {
    return (
      <Col xs={24} lg={12} key={centre}>
        <VaccinationCentreCard id={centre} />
      </Col>
    );
  });

  return (
    <React.Fragment>
      <GutterRow style={{ margin: "0 auto" }}>{cards}</GutterRow>
    </React.Fragment>
  );
}


export function VaccinationCentresListSkeleton () {
  const skeletons = []
  
  for (let i = 0; i < 10; i++) {
    const skeleton = <Col key={'skeleton' + i }xs={24}>
      <Skeleton active /> 
    </Col>

    skeletons.push(skeleton)
  }

  return <Row>{skeletons}</Row>
  
}