import { Card, Row, Col, Statistic } from "antd";
import { splitEvery } from "ramda";
import { HomeFilled } from "@ant-design/icons";

import { groupsSelectors } from './vaccinationGroupsSlice'
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import { FetchState } from '../types';


type VaccinationCityProps = {
  fetchState: FetchState,
  ids: string[];
  itemsInRow: number;
}


export default function VaccinationCityGroup(props: VaccinationCityProps) {
  const { itemsInRow = 5, ids } = props;
  const splittedRows = splitEvery(itemsInRow, ids)

  const rows = splittedRows.map((ids) => {
    let rowId = "";

    const columns = ids.map(id => {
      rowId += id;

      return (
        <VaccinationCityGroupItem id={id} key={id} fetchState={props.fetchState}/>
      );
    });

    return (
      <Row key={rowId} className="vaccinationGroupRow">
        {columns}
      </Row>
    );
  });

  return <div className="vaccinationGroupRows">{rows}</div>;
}


function VaccinationCityGroupItem (prop: { id: string, fetchState: FetchState }) {
  const entity = useAppSelector((state: RootState) => groupsSelectors.selectById(state, prop.id))
  const tehsil = entity?.city.tehsil
  const count = entity?.count


  return (
    <Col xs={24} md={12} lg={6}>
      <Card hoverable title={tehsil}>
        <Card.Meta
          title={tehsil}
          description={
            <Statistic
              title="# of Vaccination Centers"
              value={count}
              prefix={<HomeFilled />}
              suffix="*"
            />
          }
        />
      </Card>
    </Col>
  )
}
