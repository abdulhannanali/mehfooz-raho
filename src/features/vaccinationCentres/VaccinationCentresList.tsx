import { Row, Card, Col } from "antd";
import React from "react";
import VaccinationCentreCard from "./VaccinationCentreCard";
import { VaccinationCentre } from "../../api/vaccinationsFakeAPI";
import { splitEvery } from "ramda";

function VaccinationCentresList(props: {
  centres: VaccinationCentre[];
  isLoading: boolean;
}) {
  const itemsPerRow = 3;

  const shapedArrays =
    props.isLoading || !props.centres
      ? splitEvery(3, Array(9).fill(null))
      : splitEvery(2, props.centres);

  return <CardRows isLoading={props.isLoading} shapedArrays={shapedArrays} />;
}

function CardRows(props: {
  isLoading: boolean;
  shapedArrays: (VaccinationCentre | null)[][];
}) {
  const rows = props.shapedArrays.map((subArray, i) => {
    let rowId = "";

    const columns = subArray.map((content, j) => {
      let card;
      let columnId;

      if (props.isLoading || !content) {
        columnId = "null-" + i + "" + j;
        rowId += columnId;
        card = <VaccinationCentreCard key={0} isLoading={true} />;
      } else {
        columnId = content.id;
        rowId += content.id + "_";
        card = (
          <VaccinationCentreCard
            vaccinationCentre={content}
            isLoading={false}
          />
        );
      }

      return (
        <Col key={columnId} span={24 / subArray.length}>
          {card}
        </Col>
      );
    });

    return <Row key={rowId}>{columns}</Row>;
  });

  return <React.Fragment>{rows}</React.Fragment>;
}

export default VaccinationCentresList;
