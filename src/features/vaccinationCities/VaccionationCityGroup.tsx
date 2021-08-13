import React from "react";
import { Link } from 'react-router-dom'


import { Card, Row, Col, Statistic, Skeleton, Typography, Tag } from "antd";
import { splitEvery } from "ramda";
import { HomeFilled, HomeTwoTone, PlusCircleOutlined, PlusCircleTwoTone } from "@ant-design/icons";


import { groupsSelectors, selectCitiesIdsByFilter } from './vaccinationCitiesSlice'
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';

import { Filter } from "./FilterType";
import { CityWithCount } from "../../api/vaccinationsFakeAPI";
import { EntityId } from "@reduxjs/toolkit";


type VaccinationCityProps = {
  filter?: Filter;
  isLoading: boolean;
  itemsInRow: number;
}


export default function VaccinationCityGroup(props: VaccinationCityProps) {
  const { itemsInRow = 5 } = props;
  
  let ids = useAppSelector((state) => {
    if (props.filter) {
      return selectCitiesIdsByFilter(state, props.filter)
    }

    return groupsSelectors.selectIds(state)
  })

  if (props.isLoading) {
    ids = new Array(100).fill('0')
  }

  const columns = ids.map(id => {
    return (
      <VaccinationCityGroupItem id={id} key={id} isLoading={props.isLoading}/>
    );
  });

  return <Row>{columns}</Row>;
}


function VaccinationCityGroupItem (props: { id: EntityId, isLoading: boolean; }) {
  let entity: CityWithCount | undefined = useAppSelector((state: RootState) => {
    if ('id' in props) {
      return groupsSelectors.selectById(state, props.id)
    }
    
    return undefined
  })
  
  if (props.isLoading) {
    entity = getLoadingEntity()
  }
  
  const tehsil = entity?.city.tehsil
  const province = entity?.city.province
  const district = entity?.city.district
  const count = entity?.count


  return (
    <Col xs={24} md={12} lg={6}>
      <Card hoverable>
        <Skeleton loading={props.isLoading} active={true}>
          <Card.Meta
            title={tehsil}
            description={
              <React.Fragment>
                <div className="additionalInformationTags">
                  <Tag color="red">
                    {province}
                  </Tag>
                  <Link to="/">
                    <Tag color="blue">
                      {district}
                    </Tag>
                  </Link>
                </div>
                <Statistic
                  style={{ margin: "10px 0" }}
                  title="Vaccination Centres"
                  value={count}
                  prefix={<PlusCircleTwoTone twoToneColor="red"/>}
                  suffix="*"
                  />
                </React.Fragment>
            }
          />
        </Skeleton>
      </Card>
    </Col>
  )
}

/**
 * Gets the loading cards
 */
function getLoadingEntity (): CityWithCount {
  return {
    city: {
      tehsil: 'Tehsil',
      district: 'District',
      province: 'Province',
    },

    count: 1000,
    id: 'sampleId'
  }
}