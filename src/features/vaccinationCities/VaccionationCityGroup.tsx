import { Link } from "react-router-dom";

import {
  Card,
  Col,
  Statistic,
  Skeleton,
  Tag,
  Tooltip,
} from "antd";

import {
  PlusCircleTwoTone,
} from "@ant-design/icons";

import {
  groupsSelectors,
  selectCitiesIdsByFilter,
} from "./vaccinationCitiesSlice";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";

import { Filter } from "./FilterType";
import { CityWithCount } from "../../api/vaccinationsFakeAPI";
import { EntityId } from "@reduxjs/toolkit";
import GutterRow from "../../GutterRow";

type VaccinationCityProps = {
  filter?: Filter;
  isLoading: boolean;
  itemsInRow: number;
};

export default function VaccinationCityGroup(props: VaccinationCityProps) {
  const { itemsInRow = 5 } = props;

  let ids = useAppSelector((state) => {
    if (props.filter) {
      return selectCitiesIdsByFilter(state, props.filter);
    }

    return groupsSelectors.selectIds(state);
  });

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
  let entity: CityWithCount | undefined = useAppSelector((state: RootState) => {
    if ("id" in props) {
      return groupsSelectors.selectById(state, props.id);
    }

    return undefined;
  });

  if (props.isLoading) {
    entity = getLoadingEntity();
  }

  const tehsil = entity?.city.tehsil;
  const province = entity?.city.province;
  const district = entity?.city.district;
  const count = entity?.count;

  return (
    <Col xs={24} md={12} lg={6}>
      <Card hoverable>
        <Skeleton loading={props.isLoading} active={true}>
          <Card.Meta
            title={tehsil}
            description={
              <Link to={`/centres/${province}/${district}/${tehsil}/`}>
                <div className="additionalInformationTags">
                  <Link to={`/province/${province?.toLowerCase()}`}>
                    <Tooltip title={"See other districts in " + province}>
                      <Tag color="red">{province?.toLowerCase()}</Tag>
                    </Tooltip>
                  </Link>
                  <Link to={`/district/${district?.toLowerCase()}`}>
                    <Tooltip title={"See other tehsils in " + district}>
                      <Tag color="blue">{district?.toLowerCase()}</Tag>
                    </Tooltip>
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
function getLoadingEntity(): CityWithCount {
  return {
    city: {
      tehsil: "Tehsil",
      district: "District",
      province: "Province",
    },

    count: 1000,
    id: "sampleId",
  };
}
