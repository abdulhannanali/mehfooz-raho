import { Link } from "react-router-dom";

import { Card, Col, Statistic, Skeleton, Tag, Tooltip } from "antd";

import { PlusCircleTwoTone } from "@ant-design/icons";

import {
  groupsSelectors,
} from "./vaccinationCitiesSlice";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";

import { EntityId } from "@reduxjs/toolkit";
import GutterRow from "../../GutterRow";
import { VaccinationCity } from "@abdulhannanali/vaccination-centres-parser";

type VaccinationCityProps = {
  isLoading: boolean;
  itemsInRow: number;
};

export default function VaccinationCityGroup(props: VaccinationCityProps) {
  const { itemsInRow = 5 } = props;

  let ids = useAppSelector((state) => groupsSelectors.selectIds(state));

  if (props.isLoading) {
    ids = new Array(100).fill("0");
  }

  const columns = ids.map((id, i) => {
    return (
      <VaccinationCityGroupItem
        id={id}
        key={id === "0" ? i + "" : id}
        isLoading={props.isLoading}
      />
    );
  });

  return <GutterRow>{columns}</GutterRow>;
}

function VaccinationCityGroupItem(props: { id: EntityId; isLoading: boolean }) {
  let entity: VaccinationCity | undefined = useAppSelector((state: RootState) => {
    if ("id" in props) {
      return groupsSelectors.selectById(state, props.id);
    }

    return undefined;
  });

  if (props.isLoading) {
    entity = getLoadingEntity();
  }

  const tehsil = entity?.tehsil;
  const province = entity?.province;
  const district = entity?.district;
  const count = entity?.vaccinationCentresCount;

  return (
    <Col xs={24} md={12} lg={6}>
      <Card hoverable>
        <Skeleton loading={props.isLoading} active={true}>
          <Card.Meta
            title={tehsil}
            description={
              <Link to={`/centres?district=${district}&tehsil=${tehsil}`}>
                <div className="additionalInformationTags">
                  <Link to={`/province/${province?.toLowerCase()}`}>
                    <Tag color="red">{province?.toLowerCase()}</Tag>
                  </Link>
                  <Link to={`/district/${district?.toLowerCase()}`}>
                      <Tag color="blue">{district?.toLowerCase()}</Tag>
                  </Link>
                </div>
                <Statistic
                  style={{ margin: "10px 0" }}
                  title="Vaccination Centres"
                  value={count}
                  prefix={<PlusCircleTwoTone twoToneColor="red" />}
                  suffix="*"
                />
              </Link>
            }
          />
        </Skeleton>
      </Card>
    </Col>
  );
}

/**
 * Gets the loading cards
 */
function getLoadingEntity(): VaccinationCity {
  return {
    tehsil: "Tehsil",
    district: "District",
    province: "Province",
    vaccinationCentresCount: 1000,
    id: "sampleId",
  };
}
